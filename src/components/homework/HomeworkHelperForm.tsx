// src/components/homework/HomeworkHelperForm.tsx
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import HomeworkDisplay from './HomeworkDisplay';
import { generateHomeworkHelpAction } from '@/app/dashboard/homework-helper/actions';
import type { HomeworkHelperOutput } from '@/ai/flows/homework-helper';
import { Terminal } from 'lucide-react';

const formSchema = z.object({
  problemDescription: z.string().min(10, { message: "Please describe your problem or topic in at least 10 characters." }).max(1000, { message: "Problem description must be at most 1000 characters long." }),
  gradeLevel: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function HomeworkHelperForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [homeworkData, setHomeworkData] = useState<HomeworkHelperOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemDescription: "",
      gradeLevel: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setHomeworkData(null);

    const result = await generateHomeworkHelpAction(data.problemDescription, data.gradeLevel);

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setHomeworkData(result.data);
    } else {
      setError("An unexpected error occurred. No data received from AI.");
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">Get Homework Assistance</CardTitle>
        <CardDescription className="text-center">
          Describe your homework problem or the topic you need help with. You can also specify a grade level for a more tailored explanation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="problemDescription" className="text-lg font-medium">Problem / Topic</Label>
            <Textarea
              id="problemDescription"
              placeholder="e.g., How does photosynthesis work? or Solve for x: 2x + 5 = 15"
              {...form.register('problemDescription')}
              className="mt-2 text-base min-h-[100px]"
              disabled={isLoading}
              rows={4}
            />
            {form.formState.errors.problemDescription && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.problemDescription.message}</p>
            )}
          </div>
           <div>
            <Label htmlFor="gradeLevel" className="text-lg font-medium">Grade Level (Optional)</Label>
            <Input
              id="gradeLevel"
              placeholder="e.g., Grade 8, High School Physics, University Calculus"
              {...form.register('gradeLevel')}
              className="mt-2 text-base"
              disabled={isLoading}
            />
            {form.formState.errors.gradeLevel && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.gradeLevel.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" /> Generating Assistance...
              </>
            ) : (
              'Get Help from AI'
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {homeworkData && <HomeworkDisplay homeworkData={homeworkData} originalQuery={form.getValues("problemDescription")} />}
      </CardContent>
    </Card>
  );
}
