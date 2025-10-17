"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, PlusCircle, Clock, Award } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form"; // Explicitly importing from form.tsx

interface ServiceProject {
  id: string;
  name: string;
  description: string;
  hours: number;
  date: string;
  completed: boolean;
}

const communityServiceSchema = z.object({
  name: z.string().min(1, { message: "Project name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  hours: z.coerce.number().min(1, { message: "Hours must be at least 1." }),
  date: z.string().min(1, { message: "Date is required." }),
});

export default function CommunityServicePage() {
  const [projects, setProjects] = useState<ServiceProject[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const form = useForm<z.infer<typeof communityServiceSchema>>({
    resolver: zodResolver(communityServiceSchema),
    defaultValues: {
      name: "",
      description: "",
      hours: 1,
      date: new Date().toISOString().split('T')[0], // Default to today's date
    },
  });

  const handleAddProject = (values: z.infer<typeof communityServiceSchema>) => {
    const newProject: ServiceProject = {
      id: `cs_${Date.now()}`,
      ...values,
      completed: false,
    };
    setProjects([...projects, newProject]);
    form.reset();
    setIsAddingProject(false);
    toast.success("Community service project added!");
  };

  const handleToggleCompletion = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, completed: !project.completed } : project
      )
    );
    toast.success("Project status updated!");
  };

  const totalHours = projects.reduce((sum, project) => sum + project.hours, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Community Service Tracker</h1>
      <p className="text-muted-foreground">
        Track your volunteer hours and social impact projects.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Total Volunteer Hours: {totalHours}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Your Projects</CardTitle>
          <Button onClick={() => setIsAddingProject(!isAddingProject)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {isAddingProject ? "Cancel" : "Add New Project"}
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingProject && (
            <div className="mb-6 p-4 border rounded-lg bg-muted/50">
              <h3 className="text-lg font-medium mb-4">Add New Community Service Project</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddProject)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Beach Cleanup" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Collected trash from local beach" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours Contributed</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="e.g., 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit Project</Button>
                </form>
              </Form>
            </div>
          )}

          <div className="space-y-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card key={project.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleCompletion(project.id)}
                      className={project.completed ? "text-green-500" : "text-gray-400"}
                    >
                      <CheckCircle className="h-6 w-6" />
                    </Button>
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.hours} hours on {project.date}
                      </p>
                    </div>
                  </div>
                  {project.completed && <Award className="h-5 w-5 text-yellow-500" />}
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-center">No community service projects added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
