import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BookOpenText, BrainCircuit } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 md:py-24 rounded-xl bg-gradient-to-br from-primary/10 via-background to-background shadow-inner">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 text-primary">
            Welcome to Maths Bridge
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Unlock your learning potential with our AI-powered educational platform. Tailored for students and educators from grades 1-12.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-accent text-accent hover:bg-accent/10">
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-primary">
            Why Choose Maths Bridge?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/20 rounded-full mb-4">
                  <Lightbulb className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl">AI-Powered Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Leverage cutting-edge AI for quiz generation, homework help, and personalized learning paths.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/20 rounded-full mb-4">
                  <BookOpenText className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Comprehensive Courses</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Access a wide range of courses designed for K-12 students, created by expert educators.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-secondary/20 rounded-full mb-4">
                   <BrainCircuit className="h-10 w-10 text-secondary-foreground" />
                </div>
                <CardTitle className="font-headline text-2xl">Engaging Experience</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Enjoy an intuitive and interactive platform that makes learning fun and effective.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card rounded-xl shadow-md">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-6 text-primary">
              Ready to Transform Learning?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Join Maths Bridge today and experience the future of education. Whether you're a student aiming for success or an educator looking to inspire, our platform has the tools you need.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/dashboard">Sign Up Now</Link>
            </Button>
          </div>
          <div>
            <Image 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxlZHVjYXRpb258ZW58MHx8fHwxNzQ5NDQ3NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Students learning with AI" 
              width={600} 
              height={400}
              data-ai-hint="education students"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
