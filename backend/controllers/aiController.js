import Task, { TASK_CATEGORIES } from "../models/Task.js";

const getAiConfig = () => {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_API_BASE_URL;
  const model = process.env.AI_MODEL;

  if (!apiKey || !baseUrl || !model) {
    throw Object.assign(
      new Error("AI_API_KEY, AI_API_BASE_URL, and AI_MODEL are required"),
      { statusCode: 500 }
    );
  }

  return {
    apiKey,
    endpoint: `${baseUrl.replace(/\/$/, "")}/chat/completions`,
    model,
  };
};

const callAi = async (prompt, maxTokens = 400) => {
  const { apiKey, endpoint, model } = getAiConfig();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      stream: false,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw Object.assign(
      new Error(data.error?.message || data.message || "AI request failed"),
      { statusCode: response.status >= 500 ? 502 : response.status }
    );
  }

  return data.choices?.[0]?.message?.content?.trim() || "";
};

const callAiJson = async (prompt, maxTokens = 400) => {
  const { apiKey, endpoint, model } = getAiConfig();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      temperature: 0.2,
      stream: false,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw Object.assign(
      new Error(data.error?.message || data.message || "AI request failed"),
      { statusCode: response.status >= 500 ? 502 : response.status }
    );
  }

  return data.choices?.[0]?.message?.content?.trim() || "";
};

const parseJsonObject = (text) => {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw Object.assign(new Error("AI response was not valid JSON"), { statusCode: 502 });
  }

  return JSON.parse(cleaned.slice(start, end + 1));
};

export const suggestTask = async (req, res, next) => {
  try {
    const { title, description = "" } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const prompt = `Given this task: title: '${title}', description: '${description}'.
Respond ONLY in valid JSON format:
{ "priority": <1-5>, "category": "<Work|Personal|Study|Health|Other>", "reason": "<one sentence>" }`;

    const raw = await callAiJson(prompt, 250);
    const suggestion = parseJsonObject(raw);
    const priority = Number(suggestion.priority);

    if (!Number.isInteger(priority) || priority < 1 || priority > 5) {
      return res.status(502).json({ message: "AI returned an invalid priority" });
    }

    if (!TASK_CATEGORIES.includes(suggestion.category)) {
      return res.status(502).json({ message: "AI returned an invalid category" });
    }

    res.status(200).json({
      priority,
      category: suggestion.category,
      reason: String(suggestion.reason || "No reason provided."),
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.status(502).json({ message: "AI response was not valid JSON" });
    }
    next(error);
  }
};

export const summarizeTasks = async (req, res, next) => {
  try {
    let { tasks } = req.body;

    if (!Array.isArray(tasks)) {
      tasks = await Task.find({ userId: req.user._id }).sort({ deadline: 1, priority: -1 });
    }

    const bulletList = tasks.length
      ? tasks
          .map((task) => {
            const deadline = task.deadline ? new Date(task.deadline).toDateString() : "No deadline";
            return `- ${task.title} (${task.status || "pending"}, priority ${task.priority || 3}, category ${task.category || "Other"}, deadline ${deadline})`;
          })
          .join("\n")
      : "- No tasks yet";

    const prompt = `You are a productivity coach. Here are the user's tasks for today:
${bulletList}
Write a short, motivating 2-3 sentence daily summary.
Mention the most urgent task and give one actionable tip.`;

    const summary = await callAi(prompt, 500);
    res.status(200).json({ summary });
  } catch (error) {
    next(error);
  }
};
