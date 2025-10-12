"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiRequest, getAddictionSupport } from "@/lib/ai/gemini";
import { AlertTriangle, Heart, Phone } from "lucide-react";

const formSchema = z.object({
  addictionType: z.string().min(1, { message: "Please specify the type of addiction." }),
  triggers: z.string().min(1, { message: "Please describe your triggers." }),
  copingStrategies: z.string().optional(),
  supportNeeded: z.enum(["trigger-identification", "coping-strategies", "emergency-help", "general-support"]),
  timeInRecovery: z.string().optional(),
});

export function AddictionSupport() {
  const [supportPlan, setSupportPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addictionType: "",
      triggers: "",
      copingStrategies: "",
      supportNeeded: "general-support",
      timeInRecovery: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSupportPlan(null);

    try {
      // Convert inputs from comma-separated strings to arrays
      const triggersArray = values.triggers.split(",").map((trigger) => trigger.trim());
      const copingStrategiesArray = values.copingStrategies
        ? values.copingStrategies.split(",").map((strategy) => strategy.trim())
        : [];

      const aiResponse = await aiRequest(() =>
        getAddictionSupport({
          addictionType: values.addictionType,
          triggers: triggersArray,
          copingStrategies: copingStrategiesArray,
          supportNeeded: values.supportNeeded as "trigger-identification" | "coping-strategies" | "emergency-help" | "general-support",
          timeInRecovery: values.timeInRecovery,
        })
      );

      if (aiResponse.success && aiResponse.data) {
        setSupportPlan(aiResponse.data);
      } else {
        setError(aiResponse.error || "Failed to get addiction support.");
      }
    } catch (err) {
      console.error("Addiction Support Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Emergency Notice */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">If you're in crisis, please seek immediate help:</span>
          </div>
          <div className="mt-2 space-y-1 text-sm text-red-600">
            <p>• Emergency: Call 112 (India) or your local emergency number</p>
            <p>• Mental Health Helpline: 1Life (India) - Text or Call 78980</p>
            <p>• AASRA (Suicide Prevention): +91-9820466726</p>
            <p>• Vandrevala Foundation: +91-9999666555</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-red-500" />
            Addiction Support & Recovery Guidance
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get personalized support for identifying triggers and developing coping strategies.
            Remember, seeking help is a sign of strength, not weakness.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="addictionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Addiction/Challenge</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Social media, Gaming, Substance use, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="triggers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Triggers (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Stress, Boredom, Social situations, Study breaks"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copingStrategies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Coping Strategies (optional, comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Exercise, Meditation, Talking to friends"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supportNeeded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Support Needed</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded"
                        {...field}
                      >
                        <option value="general-support">General Support</option>
                        <option value="trigger-identification">Trigger Identification</option>
                        <option value="coping-strategies">Coping Strategies</option>
                        <option value="emergency-help">Emergency Help</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeInRecovery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time in Recovery (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 2 weeks, 3 months, 1 year"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Getting Support..." : "Get Personalized Support"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {supportPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Recovery Support Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {supportPlan.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}