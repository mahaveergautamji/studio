import QuizGeneratorForm from '@/components/quiz/QuizGeneratorForm';
import { FileQuestion } from 'lucide-react';

export const metadata = {
  title: 'AI Quiz Generator - Maths Bridge',
  description: 'Generate custom quizzes on any topic using AI.',
};

export default function QuizGeneratorPage() {
  return (
    <div className="py-8">
       <div className="flex items-center justify-center mb-8">
        <FileQuestion className="h-10 w-10 mr-3 text-accent" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center">
          Create Your Own Quiz
        </h1>
      </div>
      <QuizGeneratorForm />
    </div>
  );
}
