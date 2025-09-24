"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Room {
  id: string;
  number: string;
  floor: number;
  type: "standard" | "suite" | "ejecutiva" | "presidencial";
  status:
    | "available"
    | "occupied"
    | "cleaning"
    | "maintenance"
    | "out-of-order";
  guest?: string;
  position: { x: number; y: number };
}

interface FloorMapProps {
  rooms: Room[];
  selectedFloor: number;
  onRoomClick: (room: Room | undefined) => void;
}

export function FloorMap({ rooms, selectedFloor, onRoomClick }: FloorMapProps) {
  const floorRooms = rooms.filter((room) => room.floor === selectedFloor);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success hover:bg-success/80";
      case "occupied":
        return "bg-accent hover:bg-accent/80";
      case "cleaning":
        return "bg-warning hover:bg-warning/80";
      case "maintenance":
        return "bg-error hover:bg-error/80";
      case "out-of-order":
        return "bg-destructive hover:bg-destructive/80";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  const getTypeSize = (type: string) => {
    switch (type) {
      case "presidencial":
        return "w-20 h-16";
      case "ejecutiva":
        return "w-16 h-12";
      case "suite":
        return "w-14 h-10";
      default:
        return "w-12 h-8";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Mapa del Piso {selectedFloor}
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-success"></div>
            <span className="text-muted-foreground">Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-accent"></div>
            <span className="text-muted-foreground">Ocupada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-warning"></div>
            <span className="text-muted-foreground">Limpieza</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-error"></div>
            <span className="text-muted-foreground">Mantenimiento</span>
          </div>
        </div>
      </div>

      {/* Floor Layout */}
      <div className="relative bg-muted/20 rounded-lg p-8 min-h-[500px] overflow-hidden">
        {/* Building Structure */}
        <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/30 rounded-lg"></div>

        {/* Central Corridor */}
        <div className="absolute top-1/2 left-8 right-8 h-8 bg-muted/40 transform -translate-y-1/2 rounded-lg border border-muted-foreground/20"></div>

        {/* Elevator Bank */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
          <div className="w-12 h-12 bg-border rounded border-2 border-dashed border-muted-foreground flex items-center justify-center">
            <span className="text-sm font-bold text-muted-foreground">E1</span>
          </div>
          <div className="w-12 h-12 bg-border rounded border-2 border-dashed border-muted-foreground flex items-center justify-center">
            <span className="text-sm font-bold text-muted-foreground">E2</span>
          </div>
        </div>

        {/* Emergency Stairs */}
        <div className="absolute top-8 right-8 w-10 h-10 bg-red-500/20 rounded border-2 border-red-500/40 flex items-center justify-center">
          <span className="text-xs font-bold text-red-500">ES</span>
        </div>
        <div className="absolute bottom-8 left-8 w-10 h-10 bg-red-500/20 rounded border-2 border-red-500/40 flex items-center justify-center">
          <span className="text-xs font-bold text-red-500">ES</span>
        </div>

        {/* Reception/Lobby (Ground Floor Only) */}
        {selectedFloor === 1 && (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-blue-500/20 rounded border-2 border-blue-500/40 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-500">LOBBY</span>
          </div>
        )}

        {/* Utility Rooms */}
        <div className="absolute top-8 left-8 w-8 h-8 bg-gray-500/20 rounded border border-gray-500/40 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-500">U</span>
        </div>
        <div className="absolute bottom-8 right-8 w-8 h-8 bg-gray-500/20 rounded border border-gray-500/40 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-500">L</span>
        </div>

        {/* Room Layout - More realistic positioning */}
        {selectedFloor === 1 && (
          <>
            {/* Left Wing Rooms */}
            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "101"))}
              className={cn(
                "absolute w-16 h-12 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("occupied"),
              )}
              style={{ left: "15%", top: "25%" }}
            >
              <span className="text-xs font-bold">101</span>
              <span className="text-xs opacity-80">Suite</span>
            </button>

            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "102"))}
              className={cn(
                "absolute w-12 h-10 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("available"),
              )}
              style={{ left: "15%", top: "65%" }}
            >
              <span className="text-xs font-bold">102</span>
              <span className="text-xs opacity-80">Std</span>
            </button>

            {/* Right Wing Rooms */}
            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "103"))}
              className={cn(
                "absolute w-14 h-11 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("cleaning"),
              )}
              style={{ left: "75%", top: "25%" }}
            >
              <span className="text-xs font-bold">103</span>
              <span className="text-xs opacity-80">Ejec</span>
            </button>

            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "104"))}
              className={cn(
                "absolute w-12 h-10 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("maintenance"),
              )}
              style={{ left: "75%", top: "65%" }}
            >
              <span className="text-xs font-bold">104</span>
              <span className="text-xs opacity-80">Std</span>
            </button>
          </>
        )}

        {selectedFloor === 2 && (
          <>
            {/* Presidential Suite */}
            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "201"))}
              className={cn(
                "absolute w-20 h-16 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("occupied"),
              )}
              style={{ left: "25%", top: "20%" }}
            >
              <span className="text-xs font-bold">201</span>
              <span className="text-xs opacity-80">Pres</span>
            </button>

            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "202"))}
              className={cn(
                "absolute w-16 h-12 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("available"),
              )}
              style={{ left: "65%", top: "25%" }}
            >
              <span className="text-xs font-bold">202</span>
              <span className="text-xs opacity-80">Suite</span>
            </button>

            {/* Additional Floor 2 Rooms */}
            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "203"))}
              className={cn(
                "absolute w-12 h-10 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("available"),
              )}
              style={{ left: "25%", top: "65%" }}
            >
              <span className="text-xs font-bold">203</span>
              <span className="text-xs opacity-80">Std</span>
            </button>

            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "204"))}
              className={cn(
                "absolute w-12 h-10 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("occupied"),
              )}
              style={{ left: "65%", top: "65%" }}
            >
              <span className="text-xs font-bold">204</span>
              <span className="text-xs opacity-80">Std</span>
            </button>
          </>
        )}

        {selectedFloor === 3 && (
          <>
            {/* Floor 3 Layout */}
            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "301"))}
              className={cn(
                "absolute w-16 h-12 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("available"),
              )}
              style={{ left: "20%", top: "25%" }}
            >
              <span className="text-xs font-bold">301</span>
              <span className="text-xs opacity-80">Suite</span>
            </button>

            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "302"))}
              className={cn(
                "absolute w-14 h-11 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("cleaning"),
              )}
              style={{ left: "70%", top: "25%" }}
            >
              <span className="text-xs font-bold">302</span>
              <span className="text-xs opacity-80">Ejec</span>
            </button>

            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "303"))}
              className={cn(
                "absolute w-12 h-10 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("available"),
              )}
              style={{ left: "20%", top: "65%" }}
            >
              <span className="text-xs font-bold">303</span>
              <span className="text-xs opacity-80">Std</span>
            </button>

            <button
              onClick={() => onRoomClick(rooms.find((r) => r.number === "304"))}
              className={cn(
                "absolute w-12 h-10 rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
                getStatusColor("maintenance"),
              )}
              style={{ left: "70%", top: "65%" }}
            >
              <span className="text-xs font-bold">304</span>
              <span className="text-xs opacity-80">Std</span>
            </button>
          </>
        )}

        {/* Rooms */}
        {floorRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomClick(room)}
            className={cn(
              "absolute rounded-lg border-2 border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-white font-medium text-sm hover:scale-105 hover:border-white/40",
              getStatusColor(room.status),
              getTypeSize(room.type),
            )}
            style={{
              left: `${room.position.x}%`,
              top: `${room.position.y}%`,
            }}
          >
            <span className="text-xs font-bold">{room.number}</span>
            {room.guest && (
              <span className="text-xs opacity-80 truncate max-w-full px-1">
                {room.guest.split(" ")[0]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Floor Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">
            {floorRooms.filter((r) => r.status === "available").length}
          </p>
          <p className="text-sm text-muted-foreground">Disponibles</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">
            {floorRooms.filter((r) => r.status === "occupied").length}
          </p>
          <p className="text-sm text-muted-foreground">Ocupadas</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">
            {floorRooms.filter((r) => r.status === "cleaning").length}
          </p>
          <p className="text-sm text-muted-foreground">Limpieza</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">
            {floorRooms.filter((r) => r.status === "maintenance").length}
          </p>
          <p className="text-sm text-muted-foreground">Mantenimiento</p>
        </div>
      </div>
    </Card>
  );
}
