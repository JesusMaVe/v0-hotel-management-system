"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Resort {
  id: string;
  name: string;
  location: string;
  image: string;
  region: string;
}

const resorts: Resort[] = [
  {
    id: "1",
    name: "Villamagna",
    location: "Aguascalientes, AGS.",
    image: "/images/hotel-puebla-2.jpg",
    region: "México",
  },
];

export function ResortList() {
  const groupedResorts = resorts.reduce(
    (acc, resort) => {
      if (!acc[resort.region]) {
        acc[resort.region] = [];
      }
      acc[resort.region].push(resort);
      return acc;
    },
    {} as Record<string, Resort[]>,
  );

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-8">
        <h1 className="text-2xl font-semibold">Hoteles disponibles</h1>
      </div>

      <div className="px-4 space-y-6 pb-20">
        {Object.entries(groupedResorts).map(([region, regionResorts]) => (
          <div key={region}>
            {/* Region Header */}
            <h2 className="text-lg font-medium text-gray-300 mb-4">{region}</h2>

            {/* Resort Cards */}
            <div className="space-y-4">
              {regionResorts.map((resort) => (
                <Card
                  key={resort.id}
                  className="relative overflow-hidden bg-white text-black"
                >
                  <div className="relative h-48">
                    <Image
                      src={resort.image || "/placeholder.svg"}
                      alt={resort.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 ">
                      <h3 className="text-lg font-semibold mb-1">
                        {resort.name}
                      </h3>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <p className=" text-sm opacity-90 mb-2">
                        {resort.location}
                      </p>
                      <Link href={`/huesped/resort/${resort.id}`}>
                        <Button className="bg-gray-800 hover:bg-gray-900  px-4 py-2 text-sm">
                          ver detalles
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
