// src/app/dashboard/homework-helper/actions.ts
"use server";

import { generateHomeworkHelp, type HomeworkHelperInput, type HomeworkHelperOutput } from '@/ai/flows/homework-helper';

interface ActionResult {
  data?: HomeworkHelperOutput;
  error?: string;
}

export async function generateHomeworkHelpAction(problemDescription: string, gradeLevel?: string): Promise<ActionResult> {
  if (!problemDescription || problemDescription.trim() === "") {
    return { error: "Problem description or topic cannot be empty." };
  }

  try {
    const input: HomeworkHelperInput = { problemDescription, gradeLevel };
    const result = await generateHomeworkHelp(input);
    if (!result || !result.explanation) {
      return { error: "The AI could not generate assistance for this. Please try a different problem or topic." };
    }
    return { data: result };
  } catch (e) {
    console.error("Error generating homework help:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate homework help: ${errorMessage}. Please try again.` };
  }
}
