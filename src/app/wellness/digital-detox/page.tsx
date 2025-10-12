"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DigitalDetoxInput, digitalDetoxSchema } from "@/lib/validations/wellness";
import { toast } from "react-hot-toast";

export default function DigitalDetoxPage() {
  const [results, setResults] = useState<z.infer<typeof digitalDetoxSchema> | null>(null);

  const form = useForm<z.infer<typeof digitalDetoxSchema>>({
    resolver: zodResolver(digitalDetoxSchema),
    defaultValues: {
      screenTime: 0,
      productiveTime: 0,
      socialMediaTime: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof digitalDetoxSchema>) {
    // Here you would typically send the data to an API endpoint
    // and update the results state with the response.
    setResults(values);
    toast.success("Digital detox data submitted!");
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Digital Detox</h1>
      <p>Track your screen time and improve your digital wellness.</p>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your Daily Screen Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="screenTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Screen Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 180" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productiveTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Productive Screen Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Your Digital Detox Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Screen Time: {results.screenTime} minutes</p>
            <p>Productive Time: {results.productiveTime} minutes</p>
            <p>Social Media Time: {results.socialMediaTime} minutes</p>
            {/* Add more analysis and recommendations here */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}