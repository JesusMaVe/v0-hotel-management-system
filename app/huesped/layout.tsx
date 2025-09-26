"use client";

import type React from "react";
import { ActivityContainer } from "@/components/guest/activity-container";
import { BottomNavigation } from "@/components/guest/bottom-navigation";
import { LogotypeHeader } from "@/components/guest/logotype-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ActivityContainer>
      <LogotypeHeader />
      <div className="pt-[120px]">
        {children}
      </div>
      <BottomNavigation />
    </ActivityContainer>
  );
}
