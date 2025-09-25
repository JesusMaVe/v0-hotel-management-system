import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ActivityContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid w-full justify-items-center min-h-screen bg-white">
      <div className="w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <ScrollArea className="h-screen">
          <div className="pb-20">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
