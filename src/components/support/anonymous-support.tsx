"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Lightbulb, Award } from 'lucide-react'; // Added icons for other features
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AnonymousSupport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anonymous Support Network</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Connect with peers, access crisis intervention, and find resources for addiction recovery and family support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/wellness/addiction-support" passHref>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> Peer Support Groups
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start">
            <Lightbulb className="mr-2 h-4 w-4" /> Crisis Intervention
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Award className="mr-2 h-4 w-4" /> Addiction Recovery
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" /> Family Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnonymousSupport;
