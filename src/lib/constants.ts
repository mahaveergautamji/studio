import type { Course as AICourseType } from '@/ai/flows/course-generator';
import { generateAICourses as fetchAICourses } from '@/ai/flows/course-generator';

// The existing Course interface, but now it aligns with AICourseType from the flow
export interface Course extends AICourseType {
  // icon?: React.ElementType; // This was in the original, but AI won't generate it. Category mapping handles icons.
}

// The MOCK_COURSES array is now replaced by a function that fetches AI-generated courses.
// We keep the name somewhat similar for easier refactoring, but it's now an async function.

let cachedCourses: Course[] | null = null;

export async function getCourses(): Promise<Course[]> {
  if (cachedCourses) {
    return cachedCourses;
  }
  try {
    const result = await fetchAICourses({ count: 6 }); // Generate 6 courses
    if (result && result.courses) {
      cachedCourses = result.courses;
      return result.courses;
    }
    console.warn("AI failed to generate courses, returning empty array.");
    return [];
  } catch (error) {
    console.error("Error fetching AI-generated courses:", error);
    // Fallback to an empty array or predefined static courses if AI fails
    return []; 
  }
}

// Example of keeping old static data as a fallback if needed,
// but the primary mechanism is now getCourses().
export const FALLBACK_MOCK_COURSES: Course[] = [
  {
    id: 'algebra-101',
    title: 'Introduction to Algebra (Fallback)',
    description: 'Learn the fundamentals of algebraic expressions, equations, and functions. (This is fallback data)',
    category: 'Mathematics',
  },
  {
    id: 'history-101',
    title: 'World History: Ancient Civilizations (Fallback)',
    description: 'Explore the major civilizations of the ancient world and their impact on history. (This is fallback data)',
    category: 'Social Studies',
  },
];
