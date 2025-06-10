import HomeworkHelperForm from '@/components/homework/HomeworkHelperForm';
import { BookMarked } from 'lucide-react';

export const metadata = {
  title: 'AI Homework Helper - Maths Bridge',
  description: 'Get AI-powered assistance with your homework problems and concepts.',
};

export default function HomeworkHelperPage() {
  return (
    <div className="py-8">
       <div className="flex items-center justify-center mb-8">
        <BookMarked className="h-10 w-10 mr-3 text-accent" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center">
          AI Homework Helper
        </h1>
      </div>
      <HomeworkHelperForm />
    </div>
  );
}
