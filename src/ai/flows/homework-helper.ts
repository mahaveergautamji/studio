// src/ai/flows/homework-helper.ts
'use server';
/**
 * @fileOverview Provides AI-powered assistance for homework problems or topics.
 *
 * - generateHomeworkHelp - A function that handles the homework assistance generation process.
 * - HomeworkHelperInput - The input type for the generateHomeworkHelp function.
 * - HomeworkHelperOutput - The return type for the generateHomeworkHelp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HomeworkHelperInputSchema = z.object({
  problemDescription: z.string().describe('The homework problem, question, or topic the user needs help with. This could be a math problem, a science concept, a historical event query, etc.'),
  gradeLevel: z.string().optional().describe('The grade level of the student (e.g., "Grade 5", "High School", "Chemistry 101"). This helps tailor the explanation.'),
});
export type HomeworkHelperInput = z.infer<typeof HomeworkHelperInputSchema>;

const HomeworkHelperOutputSchema = z.object({
  explanation: z.string().describe('A clear, step-by-step explanation of the concept or solution to the problem, tailored to the user-provided context (e.g., grade level).'),
  steps: z.array(z.string()).optional().describe('A list of distinct steps to solve the problem, if applicable (e.g., for math problems). Each step should be a concise action or calculation.'),
  keyConcepts: z.array(z.string()).optional().describe('A list of key concepts or definitions relevant to understanding the problem or topic.'),
  hints: z.array(z.string()).optional().describe('A few hints or guiding questions to help the user think through the problem themselves.'),
  furtherReading: z.array(z.string()).optional().describe('Suggested related topics or concepts for further reading and understanding to deepen knowledge.'),
});
export type HomeworkHelperOutput = z.infer<typeof HomeworkHelperOutputSchema>;

export async function generateHomeworkHelp(input: HomeworkHelperInput): Promise<HomeworkHelperOutput> {
  return homeworkHelperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'homeworkHelperPrompt',
  input: {schema: HomeworkHelperInputSchema},
  output: {schema: HomeworkHelperOutputSchema},
  prompt: `You are an AI Homework Helper for the "Maths Bridge" learning platform.
Your goal is to provide clear, understandable, and constructive assistance to students.
The user will provide a problem description or topic, and optionally, their grade level.

Problem/Topic: {{{problemDescription}}}
{{#if gradeLevel}}Grade Level: {{{gradeLevel}}}{{/if}}

Based on this, please generate a helpful response that includes:
1.  \`explanation\`: A detailed, step-by-step explanation of the concept or the solution to the problem. If it's a problem, break down how to arrive at the solution. If it's a topic, explain it clearly. Tailor the language and complexity to the provided grade level if available; otherwise, assume a middle school to early high school level.
2.  \`steps\` (optional): If the problem involves a multi-step solution (like a math problem or a scientific process), list these steps clearly and concisely.
3.  \`keyConcepts\` (optional): Identify and briefly define 2-3 key concepts or vocabulary terms that are crucial for understanding the problem or topic.
4.  \`hints\` (optional): Provide 1-2 guiding questions or small hints that could help the student think about the problem or topic in the right direction without giving away the direct answer immediately (if applicable).
5.  \`furtherReading\` (optional): Suggest 1-2 related topics or specific areas the student could explore to deepen their understanding of the subject matter.

Focus on being educational and encouraging. Avoid just giving the answer directly for solvable problems; instead, guide the student through the process.

Output the result as a JSON object matching the provided output schema.
Example of a single output:
{
  "explanation": "To find the area of a rectangle, you multiply its length by its width. In this case, the length is 10cm and the width is 5cm. So, Area = 10cm * 5cm = 50 square cm.",
  "steps": ["Identify the formula for the area of a rectangle: Area = length × width.", "Substitute the given values: Area = 10cm × 5cm.", "Calculate the result: Area = 50 cm²."],
  "keyConcepts": ["Area: The amount of space inside a two-dimensional shape.", "Rectangle: A four-sided shape with four right angles."],
  "hints": ["What are the two measurements you need to calculate the area?", "Think about what 'square cm' means."],
  "furtherReading": ["Perimeter of a rectangle", "Area of other shapes like triangles and circles"]
}
`,
});

const homeworkHelperFlow = ai.defineFlow(
  {
    name: 'homeworkHelperFlow',
    inputSchema: HomeworkHelperInputSchema,
    outputSchema: HomeworkHelperOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      // Fallback or error handling
      return { explanation: "I'm sorry, I couldn't generate help for this topic right now. Please try rephrasing or try a different topic." };
    }
    return output;
  }
);
