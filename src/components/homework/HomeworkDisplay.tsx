// src/components/homework/HomeworkDisplay.tsx
import type { HomeworkHelperOutput } from '@/ai/flows/homework-helper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, ListChecks, BookOpen, CheckSquare } from 'lucide-react';

interface HomeworkDisplayProps {
  homeworkData: HomeworkHelperOutput;
  originalQuery: string;
}

export default function HomeworkDisplay({ homeworkData, originalQuery }: HomeworkDisplayProps) {
  const { explanation, steps, keyConcepts, hints, furtherReading } = homeworkData;

  return (
    <div className="space-y-8 mt-10">
      <h2 className="text-2xl font-semibold font-headline text-center text-primary">AI Generated Assistance</h2>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Your Query:</CardTitle>
          <CardDescription className="text-base italic">"{originalQuery}"</CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-xl">Explanation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed whitespace-pre-wrap">{explanation}</p>
        </CardContent>
      </Card>

      {steps && steps.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-2 mb-2">
                <ListChecks className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-xl">Steps to Solution</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-decimal list-outside space-y-2 pl-5">
              {steps.map((step, index) => (
                <li key={index} className="text-base">
                  {step}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {keyConcepts && keyConcepts.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <CardTitle className="font-headline text-xl">Key Concepts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {keyConcepts.map((concept, index) => (
                <li key={index}>
                  <p className="text-base font-medium">{concept.split(':')[0]}:</p>
                  <p className="text-sm text-muted-foreground pl-2">{concept.split(':').slice(1).join(':').trim()}</p>
                   {index < keyConcepts.length -1 && <Separator className="my-2" />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {hints && hints.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <CardTitle className="font-headline text-xl">Hints</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-outside space-y-2 pl-5">
              {hints.map((hint, index) => (
                <li key={index} className="text-base">
                  {hint}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {furtherReading && furtherReading.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-6 w-6 text-secondary-foreground" />
                <CardTitle className="font-headline text-xl">Further Reading</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-outside space-y-2 pl-5">
              {furtherReading.map((topic, index) => (
                <li key={index} className="text-base">
                  {topic}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
