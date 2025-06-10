// src/ai/flows/quiz-generator.ts
'use server';

/**
 * @fileOverview Generates a quiz based on a given topic.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the quiz.'),
});

export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quizQuestions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answers for the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The generated quiz questions.'),
});

export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are a quiz generator that creates multiple-choice questions based on a given topic.

  Topic: {{{topic}}}

  Generate 5 multiple-choice questions related to the topic. Each question should have 4 answer options, with one correct answer.  The correct answer should be clearly indicated.

  Format the output as a JSON object with a 'quizQuestions' array. Each object in the quizQuestions array should have the following keys:
  - question: The quiz question.
  - options: An array of strings representing the answer options.
  - correctAnswer: The correct answer to the question.

  Example:
  {
    "quizQuestions": [
      {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Paris", "Rome", "Madrid"],
        "correctAnswer": "Paris"
      },
      {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "correctAnswer": "Mars"
      }
    ]
  }
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
