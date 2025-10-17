"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";
import ConsentManagement from "@/components/consent/consent-management";
import RightToErasure from "@/components/erasure/right-to-erasure";
import MedicalPrivacy from "@/components/privacy/medical-privacy";

export default function PrivacySecurityPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Enhanced Security & Privacy Framework</h1>
      <p className="text-muted-foreground">
        Ensuring your data is protected with enterprise-grade security and medical-grade privacy.
      </p>

      {/* Enterprise-Grade Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Enterprise-Grade Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Zero-Trust Architecture, end-to-end encryption with multi-layer authentication, and regular security audits.
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Zero-Trust Architecture: All access requests are strictly authenticated and authorized.</li>
            <li>Privacy by Design: GDPR/CCPA compliance with user data sovereignty.</li>
            <li>Secure AI Processing: On-device computation where possible to minimize data exposure.</li>
            <li>Regular Security Audits: Quarterly penetration testing and vulnerability assessments.</li>
            <li>Anonymous Analytics: Behavioral insights without personal identification.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Wellness Data Protection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            Wellness Data Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Medical-grade privacy for mental health information and anonymous support systems.
          </p>
          <MedicalPrivacy />
          <ConsentManagement />
          <RightToErasure />
        </CardContent>
      </Card>
    </div>
  );
}