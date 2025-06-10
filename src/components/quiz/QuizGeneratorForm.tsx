"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import QuizDisplay from './QuizDisplay';
import { generateQuizAction } from '@/app/dashboard/quiz-generator/actions';
import type { GenerateQuizOutput } from '@/ai/flows/quiz-generator';
import { Terminal } from 'lucide-react';

const formSchema = z.object({
  topic: z.string().min(3, { message: "Topic must be at least 3 characters long." }).max(100, { message: "Topic must be at most 100 characters long." }),
});

type FormData = z.infer<typeof formSchema>;

export default function QuizGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<GenerateQuizOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setQuizData(null);

    const result = await generateQuizAction(data.topic);

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setQuizData(result.data);
    } else {
      setError("An unexpected error occurred. No data received.");
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">AI Quiz Generator</CardTitle>
        <CardDescription className="text-center">
          Enter a topic, and our AI will generate a multiple-choice quiz for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="topic" className="text-lg font-medium">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Photosynthesis, World War II, Python programming"
              {...form.register('topic')}
              className="mt-2 text-base"
              disabled={isLoading}
            />
            {form.formState.errors.topic && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.topic.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" /> Generating...
              </>
            ) : (
              'Generate Quiz'
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

        {quizData && <QuizDisplay quizData={quizData} />}
      </CardContent>
    </Card>
  );
}
