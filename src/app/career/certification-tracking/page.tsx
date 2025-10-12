"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Award, CheckCircle } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  isVerified: boolean;
}

export default function CertificationTrackingPage() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "cert_1",
      title: "Google IT Support Professional Certificate",
      issuer: "Google",
      issuedDate: "2023-01-15",
      isVerified: true,
    },
    {
      id: "cert_2",
      title: "React - The Complete Guide",
      issuer: "Udemy",
      issuedDate: "2023-03-20",
      isVerified: false,
    },
  ]);

  const [newCertification, setNewCertification] = useState({
    title: "",
    issuer: "",
    issuedDate: "",
  });
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

  const handleAddCertification = () => {
    if (newCertification.title && newCertification.issuer && newCertification.issuedDate) {
      setCertifications([
        ...certifications,
        {
          ...newCertification,
          id: `cert_${certifications.length + 1}`,
          isVerified: false,
        },
      ]);
      setNewCertification({ title: "", issuer: "", issuedDate: "" });
    }
  };

  const handleUpdateCertification = () => {
    if (editingCertification) {
      setCertifications(
        certifications.map((cert) =>
          cert.id === editingCertification.id ? editingCertification : cert
        )
      );
      setEditingCertification(null);
    }
  };

  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Certification Tracking</h1>
      <p className="text-muted-foreground">
        Track your professional certifications and skill development.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            My Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">Issuer: {cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">Issued: {cert.issuedDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {cert.isVerified && (
                    <span className="text-green-500 flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" /> Verified
                    </span>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setEditingCertification(cert)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteCertification(cert.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {certifications.length === 0 && (
              <p className="text-muted-foreground">No certifications added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            {editingCertification ? "Edit Certification" : "Add New Certification"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cert-title">Title</Label>
            <Input
              id="cert-title"
              value={editingCertification ? editingCertification.title : newCertification.title}
              onChange={(e) =>
                editingCertification
                  ? setEditingCertification({ ...editingCertification, title: e.target.value })
                  : setNewCertification({ ...newCertification, title: e.target.value })
              }
              placeholder="e.g., AWS Certified Cloud Practitioner"
            />
          </div>
          <div>
            <Label htmlFor="cert-issuer">Issuer</Label>
            <Input
              id="cert-issuer"
              value={editingCertification ? editingCertification.issuer : newCertification.issuer}
              onChange={(e) =>
                editingCertification
                  ? setEditingCertification({ ...editingCertification, issuer: e.target.value })
                  : setNewCertification({ ...newCertification, issuer: e.target.value })
              }
              placeholder="e.g., Amazon Web Services"
            />
          </div>
          <div>
            <Label htmlFor="cert-date">Issued Date</Label>
            <Input
              id="cert-date"
              type="date"
              value={editingCertification ? editingCertification.issuedDate : newCertification.issuedDate}
              onChange={(e) =>
                editingCertification
                  ? setEditingCertification({ ...editingCertification, issuedDate: e.target.value })
                  : setNewCertification({ ...newCertification, issuedDate: e.target.value })
              }
            />
          </div>
          <Button
            onClick={editingCertification ? handleUpdateCertification : handleAddCertification}
            className="w-full"
          >
            {editingCertification ? "Update Certification" : "Add Certification"}
          </Button>
          {editingCertification && (
            <Button variant="outline" onClick={() => setEditingCertification(null)} className="w-full">
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}