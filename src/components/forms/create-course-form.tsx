"use client";

import * as z from "zod";
import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the schema for creating a course
const CreateCourseSchema = z.object({
  // Course code (minimum 3 characters)
  courseCode: z.string().min(3, {
    message: "Course code must be at least 3 characters.",
  }),
  // Course title (minimum 3 characters)
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  // Course description (optional)
  description: z.string().optional(),
  // Number of credits (minimum 1)
  credits: z.number().min(1, {
    message: "Credits must be at least 1.",
  }),
  // Semester number (minimum 1)
  semester: z.number().min(1, {
    message: "Semester must be at least 1.",
  }),
  // Teacher ID (required)
  teacherId: z.string().min(1, {
    message: "Teacher ID must be selected.",
  }),
  // Department (required)
  department: z.string().min(1, {
    message: "Department must be selected.",
  }),
});

// Define the Teacher interface
interface Teacher {
  id: string;
  name: string;
}

/**
 * Form for creating a new course.
 * @returns A React component for the course creation form.
 */
export const CreateCourseForm = () => {
  // State for error messages
  const [error, setError] = useState<string | undefined>("");
  // State for success messages
  const [success, setSuccess] = useState<string | undefined>("");
  // State for indicating a pending operation
  const [isPending, startTransition] = useTransition();
  // State for storing the list of teachers
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Initialize the form using react-hook-form
  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    // Use Zod resolver for form validation
    resolver: zodResolver(CreateCourseSchema),
    // Set default values for the form fields
    defaultValues: {
      courseCode: "",
      title: "",
      description: "",
      credits: 3,
      semester: 1,
      teacherId: "",
      department: "",
    },
  });

  // Fetch teachers from the API on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // Fetch teachers from the /api/teachers endpoint
        const response = await fetch("/api/teachers");
        // Parse the response as JSON
        const data: Teacher[] = await response.json();
        // Update the teachers state with the fetched data
        setTeachers(data);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Failed to fetch teachers:", error);
        // Set an error message if the fetch fails
        setError("Failed to fetch teachers.");
      }
    };

    // Call the fetchTeachers function
    fetchTeachers();
  }, []);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof CreateCourseSchema>) => {
    // Clear any existing error or success messages
    setError("");
    setSuccess("");

    // Start a transition to indicate a pending operation
    startTransition(() => {
      // Send a POST request to create a course
      fetch("/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Convert the form values to a JSON string
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle any errors returned from the API
          if (data.error) {
            setError(data.error);
          } else if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => {
          // Set a generic error message if the request fails
          setError("Something went wrong!");
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="courseCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="CS101" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Introduction to Computer Science" type="text" />
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
                  <Input {...field} placeholder="A brief overview of computer science concepts" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="credits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credits</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="3" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="1" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teacherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teacher</FormLabel>
                {/* Removed Select and added Input for department */}
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Computer Science" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Create Course
        </Button>
      </form>
    </Form>
  );
};