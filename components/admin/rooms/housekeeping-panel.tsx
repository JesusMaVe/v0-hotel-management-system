"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Timer,
} from "lucide-react";

interface HousekeepingTask {
  id: string;
  roomNumber: string;
  type:
    | "checkout-cleaning"
    | "maintenance-cleaning"
    | "deep-cleaning"
    | "inspection";
  assignedTo: string;
  priority: "low" | "medium" | "high" | "urgent";
  estimatedTime: number;
  startTime?: string;
  status: "pending" | "in-progress" | "completed" | "delayed";
  notes?: string;
}

interface HousekeepingPanelProps {
  tasks: HousekeepingTask[];
  onTaskUpdate: (taskId: string, status: string) => void;
}

export function HousekeepingPanel({
  tasks,
  onTaskUpdate,
}: HousekeepingPanelProps) {
  const [selectedStaff, setSelectedStaff] = useState("all");

  const getTaskTypeText = (type: string) => {
    switch (type) {
      case "checkout-cleaning":
        return "Limpieza Check-out";
      case "maintenance-cleaning":
        return "Limpieza Mantenimiento";
      case "deep-cleaning":
        return "Limpieza Profunda";
      case "inspection":
        return "Inspección";
      default:
        return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "high":
        return "bg-error/10 text-error border-error/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
        return <Timer className="h-4 w-4 text-accent" />;
      case "delayed":
        return <AlertCircle className="h-4 w-4 text-error" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Panel de Housekeeping
        </h3>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Hoy</span>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 rounded-lg bg-muted">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Progreso del Día
          </span>
          <span className="text-sm text-muted-foreground">
            {completedTasks}/{totalTasks} tareas
          </span>
        </div>
        <Progress value={completionRate} className="h-2" />
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>0%</span>
          <span className="font-medium">
            {completionRate.toFixed(0)}% completado
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Staff Performance */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-success/10">
          <p className="text-lg font-bold text-success">
            {tasks.filter((t) => t.status === "completed").length}
          </p>
          <p className="text-xs text-muted-foreground">Completadas</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-accent/10">
          <p className="text-lg font-bold text-accent">
            {tasks.filter((t) => t.status === "in-progress").length}
          </p>
          <p className="text-xs text-muted-foreground">En Progreso</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-error/10">
          <p className="text-lg font-bold text-error">
            {tasks.filter((t) => t.status === "delayed").length}
          </p>
          <p className="text-xs text-muted-foreground">Retrasadas</p>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Tareas Pendientes</h4>
        {tasks
          .filter((t) => t.status !== "completed")
          .map((task) => (
            <div
              key={task.id}
              className="p-3 rounded-lg border border-border hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <span className="font-medium text-foreground">
                    Habitación {task.roomNumber}
                  </span>
                  <Badge
                    className={getPriorityColor(task.priority)}
                    variant="outline"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {task.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => onTaskUpdate(task.id, "in-progress")}
                    >
                      Iniciar
                    </Button>
                  )}
                  {task.status === "in-progress" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onTaskUpdate(task.id, "completed")}
                    >
                      Completar
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>{getTaskTypeText(task.type)}</span>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{task.assignedTo}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Timer className="h-3 w-3" />
                    <span>{task.estimatedTime} min</span>
                  </div>
                </div>
              </div>

              {task.notes && (
                <p className="text-xs text-muted-foreground mt-2 p-2 rounded bg-muted">
                  {task.notes}
                </p>
              )}
            </div>
          ))}
      </div>
    </Card>
  );
}
