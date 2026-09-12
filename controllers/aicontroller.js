const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =========================
// GENERATE TASKS WITH AI
// =========================

const generateTasks = async (req, res, next) => {
  try {
    const { projectName, description } = req.body;

    // Validate project name
    if (!projectName || !projectName.trim()) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    // AI Prompt
    const prompt = `
You are a software project planning assistant.

Generate exactly 6 useful development tasks for the following project.

Project Name:
${projectName}

Project Description:
${description || "No description provided"}

Rules:
- Generate exactly 6 tasks.
- Return only task titles.
- One task per line.
- Do not add explanations.
- Do not add numbering.
- Keep each task short and clear.
- Focus on realistic software development tasks.
`;

    // Call Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const aiText = response.text;

    if (!aiText) {
      return res.status(500).json({
        message: "AI did not generate any tasks",
      });
    }

    // Convert AI text into array
    const tasks = aiText
      .split("\n")
      .map((task) =>
        task
          .replace(/^[-•*]\s*/, "")
          .replace(/^\d+[.)]\s*/, "")
          .trim()
      )
      .filter(Boolean)
      .slice(0, 6);

    res.status(200).json({
      message: "AI tasks generated successfully",
      tasks,
    });
  } catch (error) {
    console.log(
      "Gemini AI Error:",
      error.message
    );

    next(error);
  }
};

module.exports = {
  generateTasks,
};