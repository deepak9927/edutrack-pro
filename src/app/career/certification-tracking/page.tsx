"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, Trophy, Briefcase } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  isVerified: boolean;
}

export default function CertificationTrackingPage() {
  const certifications: Certification[] = [
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
  ];


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Gamified Achievement & Certification System</h1>
      <p className="text-muted-foreground">
        Comprehensive credential tracking, advanced gamification, and professional profile optimization.
      </p>

      {/* Comprehensive Credential Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Comprehensive Credential Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Multi-platform integration, blockchain verification, and AI-powered portfolio generation.
          </p>
          <Button className="w-full">Sync Credentials</Button>
          {/* Existing certification list */}
          <div className="space-y-2 mt-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground">Issuer: {cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">Issued: {cert.issuedDate}</p>
                </div>
                {cert.isVerified && (
                  <span className="text-green-500 flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" /> Verified
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Gamification Engine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" /> {/* Using Trophy as a placeholder */}
            Advanced Gamification Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            3D skill trees, achievement badges, dynamic leaderboards, and social recognition.
          </p>
          <Button className="w-full">View My Achievements</Button>
          {/* Placeholder for gamification elements */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="text-lg font-semibold">Current Level: 5</p>
            <p>Badges Earned: 12</p>
            <p>Leaderboard Rank: #42</p>
          </div>
        </CardContent>
      </Card>

      {/* Employer Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="mr-2 h-5 w-5" /> {/* Using Briefcase as a placeholder */}
            Employer Showcase
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Professional profile optimization for recruitment.
          </p>
          <Button className="w-full">Optimize My Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
