"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Lightbulb } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  team: string[];
  status: "planning" | "in-progress" | "completed";
}

export default function InnovationLabPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj_1",
      title: "Smart Campus Navigation App",
      description: "Develop a mobile app to help students navigate the campus efficiently.",
      team: ["Alice", "Bob"],
      status: "in-progress",
    },
    {
      id: "proj_2",
      title: "AI-Powered Study Buddy",
      description: "Create an AI assistant to help students with their studies.",
      team: ["Charlie", "David"],
      status: "planning",
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    team: "",
    status: "planning",
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddProject = () => {
    if (newProject.title && newProject.description && newProject.team) {
      setProjects([
        ...projects,
        {
          ...newProject,
          id: `proj_${projects.length + 1}`,
          team: newProject.team.split(",").map((s) => s.trim()),
          status: newProject.status as "planning" | "in-progress" | "completed",
        },
      ]);
      setNewProject({ title: "", description: "", team: "", status: "planning" });
    }
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      setProjects(
        projects.map((project) =>
          project.id === editingProject.id
            ? { ...editingProject, team: editingProject.team.map((s) => s.trim()), status: editingProject.status as "planning" | "in-progress" | "completed" }
            : project
        )
      );
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Innovation Lab</h1>
      <p className="text-muted-foreground">
        Showcase student projects and collaborate on solving real-world problems.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            Student Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Team: {project.team.join(", ")} | Status: {project.status}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-muted-foreground text-center">No projects added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            {editingProject ? "Edit Project" : "Add New Project"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="project-title">Project Title</Label>
            <Input
              id="project-title"
              value={editingProject ? editingProject.title : newProject.title}
              onChange={(e) =>
                editingProject
                  ? setEditingProject({ ...editingProject, title: e.target.value })
                  : setNewProject({ ...newProject, title: e.target.value })
              }
              placeholder="e.g., AI-Powered Chatbot"
            />
          </div>
          <div>
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              value={editingProject ? editingProject.description : newProject.description}
              onChange={(e) =>
                editingProject
                  ? setEditingProject({ ...editingProject, description: e.target.value })
                  : setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Briefly describe your project"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="project-team">Team Members (comma-separated)</Label>
            <Input
              id="project-team"
              value={editingProject ? editingProject.team.join(", ") : newProject.team}
              onChange={(e) =>
                editingProject
                  ? setEditingProject({ ...editingProject, team: e.target.value.split(",").map((s) => s.trim()) })
                  : setNewProject({ ...newProject, team: e.target.value })
              }
              placeholder="e.g., Alice, Bob, Charlie"
            />
          </div>
          <div>
            <Label htmlFor="project-status">Status</Label>
            <select
              id="project-status"
              className="w-full p-2 border rounded"
              value={editingProject ? editingProject.status : newProject.status}
              onChange={(e) =>
                editingProject
                  ? setEditingProject({ ...editingProject, status: e.target.value as "planning" | "in-progress" | "completed" })
                  : setNewProject({ ...newProject, status: e.target.value as "planning" | "in-progress" | "completed" })
              }
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <Button
            onClick={editingProject ? handleUpdateProject : handleAddProject}
            className="w-full"
          >
            {editingProject ? "Update Project" : "Add Project"}
          </Button>
          {editingProject && (
            <Button variant="outline" onClick={() => setEditingProject(null)} className="w-full">
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}