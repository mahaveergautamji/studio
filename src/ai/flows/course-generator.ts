
'use server';
/**
 * @fileOverview Generates a list of diverse K-12 courses using AI.
 *
 * - generateCourses - A function that triggers the course generation flow.
 * - CourseGeneratorInput - The input type for the course generation flow (currently accepts a count).
 * - CourseGeneratorOutput - The return type, containing an array of generated courses.
 * - Course - The type definition for a single course.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const CourseSchema = z.object({
  id: z.string().describe("A unique, URL-friendly identifier for the course (e.g., 'intro-to-algebra', 'world-history-101'). Use lowercase and hyphens."),
  title: z.string().describe("The full title of the course (e.g., 'Introduction to Algebra', 'World History: Ancient Civilizations')."),
  description: z.string().describe("A brief (1-2 sentences) description of the course, highlighting key learning outcomes."),
  category: z.enum(['Mathematics', 'Social Studies', 'Science', 'Language Arts', 'Technology', 'Arts & Music', 'Health & PE']).describe("The primary subject category for the course."),
});
export type Course = z.infer<typeof CourseSchema>;

const CourseGeneratorInputSchema = z.object({
  count: z.number().optional().default(5).describe('The number of courses to generate.'),
});
export type CourseGeneratorInput = z.infer<typeof CourseGeneratorInputSchema>;

const CourseGeneratorOutputSchema = z.object({
  courses: z.array(CourseSchema).describe('An array of generated course objects.'),
});
export type CourseGeneratorOutput = z.infer<typeof CourseGeneratorOutputSchema>;

export async function generateAICourses(input?: CourseGeneratorInput): Promise<CourseGeneratorOutput> {
  return courseGeneratorFlow(input || { count: 5 });
}

const prompt = ai.definePrompt({
  name: 'courseGeneratorPrompt',
  input: {schema: CourseGeneratorInputSchema},
  output: {schema: CourseGeneratorOutputSchema},
  prompt: `You are an expert curriculum designer for a K-12 online learning platform called "Maths Bridge".
Your task is to generate {{count}} diverse and engaging course ideas suitable for students from grades 1-12.

For each course, you must provide:
1.  A unique, URL-friendly \`id\` (e.g., "creative-writing-for-middle-school", "physics-1-kinematics"). This should be all lowercase with words separated by hyphens.
2.  A compelling \`title\` (e.g., "Creative Writing for Middle School", "Physics I: Kinematics & Motion").
3.  A concise \`description\` (1-2 sentences) that clearly outlines what students will learn or achieve.
4.  A \`category\` from the following exact list: 'Mathematics', 'Social Studies', 'Science', 'Language Arts', 'Technology', 'Arts & Music', 'Health & PE'. Choose the single most relevant category.

Ensure the course content is varied, covering different subjects and appealing to a range of grade levels.
The tone should be exciting and inviting for young learners and educators alike.

Output the result as a JSON object with a single key "courses", which is an array of course objects, matching the provided output schema.
Example of a single course object:
{
  "id": "example-algebra-basics",
  "title": "Example: Algebra Basics Fun",
  "description": "Learn foundational algebra concepts through fun examples.",
  "category": "Mathematics"
}
`,
});

const courseGeneratorFlow = ai.defineFlow(
  {
    name: 'courseGeneratorFlow',
    inputSchema: CourseGeneratorInputSchema,
    outputSchema: CourseGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output?.courses) {
      // Fallback or error handling if AI fails to generate courses as expected
      return { courses: [] };
    }
    return output;
  }
);
