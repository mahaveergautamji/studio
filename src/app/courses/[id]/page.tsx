import { MOCK_COURSES, type Course } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, ListChecks, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';


export async function generateStaticParams() {
  return MOCK_COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = MOCK_COURSES.find(c => c.id === params.id);

  if (!course) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-destructive">Course not found</h1>
        <p className="text-muted-foreground">The course you are looking for does not exist.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>

      <Card className="shadow-xl overflow-hidden">
        <div className="relative h-60 md:h-80 w-full">
           <Image 
            src={`https://placehold.co/1200x400.png?text=${encodeURIComponent(course.title)}`}
            alt={course.title} 
            layout="fill"
            objectFit="cover"
            data-ai-hint="education learning"
            className="bg-muted"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                 <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary-foreground">
                    {course.title}
                </h1>
                <p className="text-lg text-primary-foreground/80 mt-2">{course.category}</p>
            </div>
        </div>
       
        <CardContent className="p-6 md:p-8 space-y-6">
          <CardDescription className="text-base md:text-lg text-foreground/90 leading-relaxed">
            {course.description}
          </CardDescription>

          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
              <PlayCircle className="mr-2 h-5 w-5" /> Start Learning
            </Button>
            <Button size="lg" variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 text-lg py-3">
              <ListChecks className="mr-2 h-5 w-5" /> View Syllabus
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-xl font-semibold font-headline mb-4 text-primary">Educator Tools (Placeholder)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you were an educator, you could manage this course here.
            </p>
            <Button variant="secondary" disabled>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Course Content
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold font-headline mb-4 text-primary">Course Modules (Placeholder)</h3>
            <ul className="space-y-3">
              {['Module 1: Introduction', 'Module 2: Core Concepts', 'Module 3: Advanced Topics', 'Module 4: Project Work'].map(module => (
                <li key={module} className="p-4 border rounded-md hover:bg-card transition-colors flex justify-between items-center">
                  <span>{module}</span>
                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const course = MOCK_COURSES.find(c => c.id === params.id);
  if (!course) {
    return {
      title: 'Course Not Found - Maths Bridge',
    };
  }
  return {
    title: `${course.title} - Maths Bridge`,
    description: course.description,
  };
}
