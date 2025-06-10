import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import CourseCard from '@/components/dashboard/CourseCard';
import { getCourses } from '@/lib/constants';
import { FileQuestion, MessageSquareText, LayoutDashboard, BookMarked } from 'lucide-react';

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8" />
          My Dashboard
        </h1>
        {/* Placeholder for educator-specific actions like "Create New Course" */}
        {/* <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Create New Course
        </Button> */}
      </div>
      
      <section>
        <h2 className="text-2xl font-semibold font-headline mb-6 text-foreground/90">My AI-Generated Courses</h2>
        {courses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No courses available at the moment. AI might be busy!</p>
              <Button variant="outline" disabled>Explore Courses</Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-6 text-foreground/90">AI Learning Tools</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-md">
                  <FileQuestion className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl font-headline">AI Quiz Generator</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Generate custom quizzes on any topic to test your knowledge and prepare for exams.
              </CardDescription>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard/quiz-generator">
                  Generate Quiz
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
             <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-md">
                  <BookMarked className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl font-headline">AI Homework Helper</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Get assistance with challenging homework problems and understand complex concepts using AI prompts.
              </CardDescription>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard/homework-helper">
                  Get Homework Help
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
