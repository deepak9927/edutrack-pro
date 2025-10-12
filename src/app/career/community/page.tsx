"use client";

import CommunityForum from "@/components/community/community-forum";

export default function CommunityPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Community</h1>
      <CommunityForum />
    </div>
  );
}