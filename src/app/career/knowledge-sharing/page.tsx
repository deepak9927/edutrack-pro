"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
}

export default function KnowledgeSharingPage() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: "ki_1",
      title: "Understanding Recursion",
      content: "A detailed explanation of recursion with examples in JavaScript.",
      author: "John Doe",
      category: "Programming",
    },
    {
      id: "ki_2",
      title: "Introduction to Data Visualization",
      content: "Basic principles and tools for effective data visualization.",
      author: "Jane Smith",
      category: "Data Science",
    },
  ]);

  const [newKnowledgeItem, setNewKnowledgeItem] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [editingKnowledgeItem, setEditingKnowledgeItem] = useState<KnowledgeItem | null>(null);

  const handleAddKnowledgeItem = () => {
    if (newKnowledgeItem.title && newKnowledgeItem.content && newKnowledgeItem.category) {
      setKnowledgeItems([
        ...knowledgeItems,
        {
          ...newKnowledgeItem,
          id: `ki_${knowledgeItems.length + 1}`,
          author: "You",
        },
      ]);
      setNewKnowledgeItem({ title: "", content: "", category: "" });
    }
  };

  const handleUpdateKnowledgeItem = () => {
    if (editingKnowledgeItem) {
      setKnowledgeItems(
        knowledgeItems.map((item) =>
          item.id === editingKnowledgeItem.id ? editingKnowledgeItem : item
        )
      );
      setEditingKnowledgeItem(null);
    }
  };

  const handleDeleteKnowledgeItem = (id: string) => {
    setKnowledgeItems(knowledgeItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Knowledge Sharing & Peer Mentoring</h1>
      <p className="text-muted-foreground">
        Share your knowledge, learn from others, and mentor your peers.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Shared Knowledge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {knowledgeItems.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                    <p className="text-xs text-muted-foreground">
                      Author: {item.author} | Category: {item.category}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingKnowledgeItem(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteKnowledgeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {knowledgeItems.length === 0 && (
              <p className="text-muted-foreground text-center">No knowledge items shared yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            {editingKnowledgeItem ? "Edit Knowledge Item" : "Add New Knowledge Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="item-title">Title</Label>
            <Input
              id="item-title"
              value={editingKnowledgeItem ? editingKnowledgeItem.title : newKnowledgeItem.title}
              onChange={(e) =>
                editingKnowledgeItem
                  ? setEditingKnowledgeItem({ ...editingKnowledgeItem, title: e.target.value })
                  : setNewKnowledgeItem({ ...newKnowledgeItem, title: e.target.value })
              }
              placeholder="e.g., My Guide to React Hooks"
            />
          </div>
          <div>
            <Label htmlFor="item-content">Content</Label>
            <Textarea
              id="item-content"
              value={editingKnowledgeItem ? editingKnowledgeItem.content : newKnowledgeItem.content}
              onChange={(e) =>
                editingKnowledgeItem
                  ? setEditingKnowledgeItem({ ...editingKnowledgeItem, content: e.target.value })
                  : setNewKnowledgeItem({ ...newKnowledgeItem, content: e.target.value })
              }
              placeholder="Write your explanation or tutorial here..."
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor="item-category">Category</Label>
            <Input
              id="item-category"
              value={editingKnowledgeItem ? editingKnowledgeItem.category : newKnowledgeItem.category}
              onChange={(e) =>
                editingKnowledgeItem
                  ? setEditingKnowledgeItem({ ...editingKnowledgeItem, category: e.target.value })
                  : setNewKnowledgeItem({ ...newKnowledgeItem, category: e.target.value })
              }
              placeholder="e.g., Programming, Design, Wellness"
            />
          </div>
          <Button
            onClick={editingKnowledgeItem ? handleUpdateKnowledgeItem : handleAddKnowledgeItem}
            className="w-full"
          >
            {editingKnowledgeItem ? "Update Item" : "Add Item"}
          </Button>
          {editingKnowledgeItem && (
            <Button variant="outline" onClick={() => setEditingKnowledgeItem(null)} className="w-full">
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}