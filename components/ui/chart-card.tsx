"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function ChartCard({
  title,
  children,
  icon: Icon,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-accent" />}
      </div>
      {children}
    </Card>
  );
}
