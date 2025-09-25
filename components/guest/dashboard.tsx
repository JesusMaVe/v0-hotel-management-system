"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase as Suitcase,
  ArrowRight,
  Plane,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("TRIPS");

  const tabs = [
    { id: "TRIPS", label: "Trips", count: 2 },
    { id: "POINTS", label: "Points", count: "87.6K" },
    { id: "MEMBERSHIP", label: "Membership", count: null },
  ];

  return (
    <div className="min-h-screen bg-hotel-surface">
      <div className="bg-hotel-primary text-hotel-primary-foreground">
        <div className="p-6 pt-12">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            My Dashboard
          </h1>
          <p className="text-hotel-primary-foreground/80 mt-2 text-sm">
            Welcome back! Here's your travel overview
          </p>
        </div>

        <div className="px-6 pb-4">
          <div className="flex space-x-1 bg-hotel-primary-foreground/10 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                  "flex items-center justify-center gap-2",
                  activeTab === tab.id
                    ? "bg-hotel-primary-foreground text-hotel-primary shadow-sm"
                    : "text-hotel-primary-foreground/70 hover:text-hotel-primary-foreground hover:bg-hotel-primary-foreground/5",
                )}
              >
                <span>{tab.label}</span>
                {tab.count && (
                  <Badge variant="secondary" className="text-xs">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card className="overflow-hidden shadow-lg border-0 bg-hotel-surface-elevated">
          {/* Resort Image */}
          <div className="relative h-52">
            <Image
              src="/images/hotel-puebla-2.jpg"
              alt="Kalia Suites by Hilton Grand Vacations Club"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute top-4 right-4">
              <Badge className="bg-hotel-accent text-hotel-accent-foreground font-semibold shadow-lg">
                UPCOMING
              </Badge>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-xl font-bold mb-2 text-balance leading-tight">
                Kalia Suites by Hilton Grand Vacations Club®
              </h3>
              <div className="flex items-center gap-2 text-sm opacity-90 mb-1">
                <MapPin className="w-4 h-4" />
                <span>Honolulu, Hawaii</span>
              </div>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <span>Reservation # 653352700</span>
                <span>•</span>
                <span>1BR Suite</span>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Check In</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold">Jun 30, 2020</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>4:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Check Out</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold">Jul 3, 2020</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-px bg-border flex-1 w-8"></div>
                <ArrowRight className="w-5 h-5" />
                <div className="h-px bg-border flex-1 w-8"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-hotel-accent hover:bg-hotel-accent/90 text-hotel-accent-foreground py-6 font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <Suitcase className="w-4 h-4 mr-2" />
                Trip Details
              </Button>
              <Button
                variant="outline"
                className="py-6 font-semibold border-2 hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] bg-transparent"
              >
                <Plane className="w-4 h-4 mr-2" />
                Request Uber
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-hotel-surface-elevated border-0">
            <div className="text-2xl font-bold text-hotel-accent">3</div>
            <div className="text-sm text-muted-foreground">Days Left</div>
          </Card>
          <Card className="p-4 text-center bg-hotel-surface-elevated border-0">
            <div className="text-2xl font-bold text-hotel-accent">87.6K</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </Card>
          <Card className="p-4 text-center bg-hotel-surface-elevated border-0">
            <div className="text-2xl font-bold text-hotel-accent">Gold</div>
            <div className="text-sm text-muted-foreground">Status</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
