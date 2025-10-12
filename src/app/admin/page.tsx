"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MarksTable from "@/components/admin/MarksTable";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  credits: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "course_1",
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming with Python",
      credits: 3
    },
    {
      id: "course_2",
      title: "Data Structures",
      description: "Explore advanced data structures and algorithms",
      credits: 4
    }
  ]);
  
  const [users, setUsers] = useState<User[]>([
    {
      id: "user_1",
      name: "John Doe",
      email: "john@example.com",
      role: "STUDENT"
    },
    {
      id: "user_2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "TEACHER"
    }
  ]);
  
  const [newCourse, setNewCourse] = useState({ title: "", description: "", credits: 3 });
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "STUDENT" });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      setCourses([...courses, { ...newCourse, id: `course_${courses.length + 1}` }]);
      setNewCourse({ title: "", description: "", credits: 3 });
    }
  };

  const handleUpdateCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? editingCourse : course
      ));
      setEditingCourse(null);
    }
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleCreateUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: `user_${users.length + 1}` }]);
      setNewUser({ name: "", email: "", role: "STUDENT" });
    }
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* Courses Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Course Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course List */}
            <div>
              <h3 className="text-lg font-medium mb-4">Existing Courses</h3>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                        <p className="text-sm">Credits: {course.credits}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingCourse(course)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Add/Edit Course Form */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="course-title">Course Title</Label>
                  <Input
                    id="course-title"
                    value={editingCourse ? editingCourse.title : newCourse.title}
                    onChange={(e) => 
                      editingCourse 
                        ? setEditingCourse({ ...editingCourse, title: e.target.value })
                        : setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <Label htmlFor="course-description">Description</Label>
                  <Textarea
                    id="course-description"
                    value={editingCourse ? editingCourse.description : newCourse.description}
                    onChange={(e) => 
                      editingCourse 
                        ? setEditingCourse({ ...editingCourse, description: e.target.value })
                        : setNewCourse({ ...newCourse, description: e.target.value })
                    }
                    placeholder="Enter course description"
                  />
                </div>
                <div>
                  <Label htmlFor="course-credits">Credits</Label>
                  <Input
                    id="course-credits"
                    type="number"
                    value={editingCourse ? editingCourse.credits : newCourse.credits}
                    onChange={(e) => 
                      editingCourse 
                        ? setEditingCourse({ ...editingCourse, credits: parseInt(e.target.value) || 0 })
                        : setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <Button 
                  onClick={editingCourse ? handleUpdateCourse : handleCreateCourse}
                  className="w-full"
                >
                  {editingCourse ? "Update Course" : "Add Course"}
                </Button>
                {editingCourse && (
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingCourse(null)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User List */}
            <div>
              <h3 className="text-lg font-medium mb-4">Existing Users</h3>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm">Role: {user.role}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Add/Edit User Form */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                {editingUser ? "Edit User" : "Add New User"}
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user-name">Name</Label>
                  <Input
                    id="user-name"
                    value={editingUser ? editingUser.name : newUser.name}
                    onChange={(e) => 
                      editingUser 
                        ? setEditingUser({ ...editingUser, name: e.target.value })
                        : setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="Enter user name"
                  />
                </div>
                <div>
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    value={editingUser ? editingUser.email : newUser.email}
                    onChange={(e) => 
                      editingUser 
                        ? setEditingUser({ ...editingUser, email: e.target.value })
                        : setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="Enter user email"
                  />
                </div>
                <div>
                  <Label htmlFor="user-role">Role</Label>
                  <select
                    id="user-role"
                    className="w-full p-2 border rounded"
                    value={editingUser ? editingUser.role : newUser.role}
                    onChange={(e) => 
                      editingUser 
                        ? setEditingUser({ ...editingUser, role: e.target.value })
                        : setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <Button 
                  onClick={editingUser ? handleUpdateUser : handleCreateUser}
                  className="w-full"
                >
                  {editingUser ? "Update User" : "Add User"}
                </Button>
                {editingUser && (
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingUser(null)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Marks Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Marks Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MarksTable />
        </CardContent>
      </Card>
    </div>
  );
}