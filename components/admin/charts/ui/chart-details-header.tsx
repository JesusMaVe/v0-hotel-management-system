import { ArrowLeft, Download, RefreshCw, Settings, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ChartDetailsHeader() {
  return (
    <div className="border-border bg-card/50 sticky top-0 z-10 border-b backdrop-blur-sm">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Link href="/charts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresar al catálogo
            </Button>
          </Link>
        </div>
        {/* Chart quick actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>

          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
