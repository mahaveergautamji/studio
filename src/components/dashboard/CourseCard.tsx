import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/constants'; // This will now refer to the updated Course interface
import { ArrowRight, BookOpenText, Atom, Calculator, Palette, Code, Music, HeartPulse } from 'lucide-react'; // Added Music, HeartPulse

interface CourseCardProps {
  course: Course;
}

// Extended category icons
const categoryIcons: { [key: string]: React.ElementType } = {
  'Mathematics': Calculator,
  'Social Studies': BookOpenText,
  'Science': Atom,
  'Language Arts': Palette, // Using Palette for Language Arts for now
  'Technology': Code,
  'Arts & Music': Music,
  'Health & PE': HeartPulse,
  'Default': BookOpenText, // Default icon
};

export default function CourseCard({ course }: CourseCardProps) {
  const IconComponent = categoryIcons[course.category as keyof typeof categoryIcons] || categoryIcons['Default'];

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-md">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-headline">{course.title}</CardTitle>
        </div>
        <CardDescription className="text-sm h-20 overflow-hidden text-ellipsis">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-xs text-muted-foreground">Category: {course.category}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
          <Link href={`/courses/${course.id}`}>
            Start Course <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
