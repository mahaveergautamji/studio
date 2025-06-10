import type { GenerateQuizOutput } from '@/ai/flows/quiz-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react'; // For showing correct/incorrect (optional)

interface QuizDisplayProps {
  quizData: GenerateQuizOutput;
}

export default function QuizDisplay({ quizData }: QuizDisplayProps) {
  // For simplicity, this component just displays questions and options.
  // A real quiz would need state management for answers, scoring, etc.

  return (
    <div className="space-y-8 mt-8">
      <h2 className="text-2xl font-semibold font-headline text-center text-primary">Generated Quiz</h2>
      {quizData.quizQuestions.map((q, index) => (
        <Card key={index} className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Question {index + 1}: {q.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue={undefined} className="space-y-3">
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`q${index}-opt${optIndex}`} />
                  <Label htmlFor={`q${index}-opt${optIndex}`} className="flex-1 cursor-pointer text-base">
                    {option}
                  </Label>
                  {/* Optionally reveal correct answer immediately or after submission */}
                  {/* For this version, we can subtly indicate the correct answer for review */}
                  {option === q.correctAnswer && (
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> Correct
                    </span>
                  )}
                </div>
              ))}
            </RadioGroup>
            {/* <CardDescription className="mt-4 text-sm text-muted-foreground">
              Correct Answer: {q.correctAnswer} (Revealed for review purposes)
            </CardDescription> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
