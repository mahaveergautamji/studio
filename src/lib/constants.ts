export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: React.ElementType; // Lucide icon component
}

// Example: import { Book, Atom, Calculator } from 'lucide-react';
// Then use icon: Book for a course. For now, we'll keep it simple or use strings for icon names.

export const MOCK_COURSES: Course[] = [
  {
    id: 'algebra-101',
    title: 'Introduction to Algebra',
    description: 'Learn the fundamentals of algebraic expressions, equations, and functions.',
    category: 'Mathematics',
  },
  {
    id: 'history-101',
    title: 'World History: Ancient Civilizations',
    description: 'Explore the major civilizations of the ancient world and their impact on history.',
    category: 'Social Studies',
  },
  {
    id: 'physics-basics',
    title: 'Basic Physics Concepts',
    description: 'Understand core physics principles like motion, energy, and forces.',
    category: 'Science',
  },
  {
    id: 'creative-writing',
    title: 'Creative Writing Workshop',
    description: 'Develop your storytelling skills and learn various creative writing techniques.',
    category: 'Language Arts',
  },
  {
    id: 'coding-for-kids',
    title: 'Coding for Kids: Python',
    description: 'An introduction to programming concepts using the Python language.',
    category: 'Technology',
  },
];
