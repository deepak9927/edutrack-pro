"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Award,
  Book,
  Users2
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  topic: string; // Added topic field
}

interface Mentor {
  id: string;
  name: string;
  expertise: string;
  contact: string;
}

const topics = [
  "Climate Change",
  "Technology Ethics",
  "Career Guidance",
  "General Discussion",
  "Expert Session",
  "Debate Club",
  "Book Club",
];

export default function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post_1",
      title: "Introduction to Programming",
      content: "What are the best resources for learning Python?",
      author: "John Doe",
      likes: 10,
      topic: "General Discussion",
    },
    {
      id: "post_2",
      title: "Data Structures",
      content: "How to implement a binary search tree in JavaScript?",
      author: "Jane Smith",
      likes: 5,
      topic: "General Discussion",
    },
    {
      id: "post_3",
      title: "Expert Session: AI in Healthcare",
      content: "Discussion on the impact of AI in modern healthcare.",
      author: "Dr. Emily White",
      likes: 20,
      topic: "Expert Session",
    },
    {
      id: "post_4",
      title: "Book Club: 'Clean Code'",
      content: "Discussing Chapter 1: Clean Code.",
      author: "Alice Brown",
      likes: 8,
      topic: "Book Club",
    },
  ]);

  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: "mentor_1",
      name: "Dr. Alex Johnson",
      expertise: "Data Science, Machine Learning",
      contact: "alex.johnson@example.com",
    },
    {
      id: "mentor_2",
      name: "Ms. Sarah Lee",
      expertise: "Web Development, UI/UX",
      contact: "sarah.lee@example.com",
    },
  ]);
  
  const [newPost, setNewPost] = useState<{ title: string; content: string; topic: string }>({ title: "", content: "", topic: topics[0] });
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  const handleCreatePost = () => {
    if (newPost.title && newPost.content && newPost.topic) {
      setPosts([...posts, { 
        id: `post_${Date.now()}`, 
        title: newPost.title, 
        content: newPost.content, 
        author: "You", 
        likes: 0, 
        topic: newPost.topic 
      }]);
      setNewPost({ title: "", content: "", topic: topics[0] });
    }
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDislike = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: Math.max(0, post.likes - 1) } : post
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Meaningful Discussions Platform</h1>
      <p className="text-muted-foreground">
        Engage in topic-based forums, expert sessions, debate clubs, and connect with mentors.
      </p>

      {/* Create New Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Create New Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Enter post title"
              />
            </div>
            <div>
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Enter post content"
              />
            </div>
            <div>
              <Label htmlFor="post-topic">Topic</Label>
              <select
                id="post-topic"
                className="w-full p-2 border rounded"
                value={newPost.topic}
                onChange={(e) => setNewPost({ ...newPost, topic: e.target.value })}
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={handleCreatePost} className="w-full">
              Create Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter by Topic */}
      <div className="flex items-center space-x-2">
        <Label htmlFor="filter-topic">Filter by Topic:</Label>
        <select
          id="filter-topic"
          className="p-2 border rounded"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="All Topics">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts
          .filter((post) => selectedTopic === "All Topics" || post.topic === selectedTopic)
          .map((post) => (
            <Card key={post.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                  <p className="text-xs text-muted-foreground">
                    Author: {post.author} | Topic: {post.topic}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(post.id)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <span>{post.likes}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDislike(post.id)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        {posts.filter((post) => selectedTopic === "All Topics" || post.topic === selectedTopic).length === 0 && (
          <p className="text-muted-foreground text-center">No posts found for this topic.</p>
        )}
      </div>

      {/* Mentor Connect */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users2 className="mr-2 h-5 w-5" />
            Mentor Connect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Connect with experienced alumni and industry professionals for guidance.
          </p>
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="p-4 border rounded-lg">
                <h3 className="font-medium">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground">Expertise: {mentor.expertise}</p>
                <p className="text-sm text-muted-foreground">Contact: {mentor.contact}</p>
              </Card>
            ))}
            {mentors.length === 0 && (
              <p className="text-muted-foreground text-center">No mentors available yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
