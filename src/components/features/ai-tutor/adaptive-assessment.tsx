"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiRequest, getAssignmentHelp } from "@/lib/ai/gemini";

// Schema for the initial assessment setup
const setupSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
});

// Schema for answering questions
const answerSchema = z.object({
  answer: z.string().min(1, { message: "Answer is required." }),
});

export function AdaptiveAssessment() {
  const [stage, setStage] = useState<"setup" | "assessment" | "results">("setup");
  const [question, setQuestion] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [assessmentHistory, setAssessmentHistory] = useState<Array<{question: string, answer: string, feedback: string}>>([]);

  // Form for initial setup
  const setupForm = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      subject: "",
      topic: "",
    },
  });

  // Form for answering questions
  const answerForm = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  // Function to start the assessment
  async function startAssessment(values: z.infer<typeof setupSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demonstration, we'll generate a simple question.
      // In a real implementation, this would be more sophisticated.
      const initialQuestion = `Explain the basic concepts of ${values.topic} in ${values.subject}.`;
      setQuestion(initialQuestion);
      setStage("assessment");
    } catch (err) {
      console.error("Adaptive Assessment Start Error:", err);
      setError("Failed to start assessment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Function to submit an answer and get feedback
  async function submitAnswer(values: z.infer<typeof answerSchema>) {
    if (!question) return;
    
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    
    try {
      // Add current question and answer to history
      const newHistoryItem = {
        question,
        answer: values.answer,
        feedback: "" // Will be filled after AI response
      };
      setAssessmentHistory(prev => [...prev, newHistoryItem]);
      
      // Get AI feedback
      const aiResponse = await aiRequest(() =>
        getAssignmentHelp(
          setupForm.getValues().subject,
          setupForm.getValues().topic,
          `Question: ${question}\nAnswer: ${values.answer}\n\nPlease provide feedback on the answer, including what was correct, what was incorrect, and suggestions for improvement.`
        )
      );

      if (aiResponse.success && aiResponse.data) {
        setFeedback(aiResponse.data);
        // Update the history item with feedback
        setAssessmentHistory(prev => {
          const updated = [...prev];
          updated[updated.length - 1].feedback = aiResponse.data || "";
          return updated;
        });
        
        // Generate next question based on answer (simplified logic)
        // In a real implementation, this would be more sophisticated
        const nextQuestion = `Based on your answer, can you elaborate on ${setupForm.getValues().topic}?`;
        setQuestion(nextQuestion);
        
        // Reset answer form
        answerForm.reset({ answer: "" });
      } else {
        setError(aiResponse.error || "Failed to get feedback.");
      }
    } catch (err) {
      console.error("Adaptive Assessment Submit Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Function to finish the assessment
  function finishAssessment() {
    setStage("results");
  }

  return (
    <div className="space-y-6">
      {stage === "setup" && (
        <Card>
          <CardHeader>
            <CardTitle>Adaptive Assessment Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...setupForm}>
              <form onSubmit={setupForm.handleSubmit(startAssessment)} className="space-y-4">
                <FormField
                  control={setupForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Data Structures" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={setupForm.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Recursion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Starting..." : "Start Assessment"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {stage === "assessment" && question && (
        <Card>
          <CardHeader>
            <CardTitle>Adaptive Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-secondary rounded">
              <h3 className="font-semibold">Question:</h3>
              <p>{question}</p>
            </div>
            
            <Form {...answerForm}>
              <form onSubmit={answerForm.handleSubmit(submitAnswer)} className="space-y-4">
                <FormField
                  control={answerForm.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Answer</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full p-2 border rounded"
                          rows={5}
                          placeholder="Type your answer here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Answer"}
                  </Button>
                  <Button type="button" variant="outline" onClick={finishAssessment}>
                    Finish Assessment
                  </Button>
                </div>
              </form>
            </Form>
            
            {feedback && (
              <div className="mt-4 p-4 bg-primary/10 rounded">
                <h3 className="font-semibold">Feedback:</h3>
                <div className="prose max-w-none">
                  {feedback.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-destructive/10 rounded">
                <p className="text-destructive">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {stage === "results" && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Your Answers & Feedback:</h3>
            {assessmentHistory.length > 0 ? (
              <div className="space-y-4">
                {assessmentHistory.map((item, index) => (
                  <div key={index} className="p-4 border rounded">
                    <h4 className="font-medium">Question {index + 1}:</h4>
                    <p className="mb-2">{item.question}</p>
                    <h4 className="font-medium">Your Answer:</h4>
                    <p className="mb-2">{item.answer}</p>
                    <h4 className="font-medium">Feedback:</h4>
                    <div className="prose max-w-none">
                      {item.feedback.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No answers recorded.</p>
            )}
            <Button onClick={() => setStage("setup")} className="mt-4">
              Start New Assessment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}