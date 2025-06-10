"use server";

import { generateQuiz, type GenerateQuizInput, type GenerateQuizOutput } from '@/ai/flows/quiz-generator';

interface ActionResult {
  data?: GenerateQuizOutput;
  error?: string;
}

export async function generateQuizAction(topic: string): Promise<ActionResult> {
  if (!topic || topic.trim() === "") {
    return { error: "Topic cannot be empty." };
  }

  try {
    const input: GenerateQuizInput = { topic };
    const result = await generateQuiz(input);
    if (!result || !result.quizQuestions || result.quizQuestions.length === 0) {
      return { error: "The AI could not generate a quiz for this topic. Please try a different topic." };
    }
    return { data: result };
  } catch (e) {
    console.error("Error generating quiz:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate quiz: ${errorMessage}. Please try again.` };
  }
}
