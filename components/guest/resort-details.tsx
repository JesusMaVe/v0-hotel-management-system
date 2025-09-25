"use client";

import {
  ArrowLeft,
  MapPin,
  Phone,
  Info,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ResortDetails() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center p-4 pt-8">
        <Link href="/huesped/resorts" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Detalles del hotel</h1>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 mx-4 mb-4 rounded-lg overflow-hidden">
        <Image
          src="/images/hotel-puebla-2.jpg"
          alt="Villamagna Familiy Resorts"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold mb-1">
            Villamagna Familiy Resorts
          </h2>
          <p className="text-sm opacity-90">Aguascalientes, AGS., México</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Go to booking button */}
        <Link href="/huesped/reservacion">
          <div className="bg-blue-300 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Reservar</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>
        </Link>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 mt-1 text-gray-300" />
            <div>
              <p className="font-medium">Av. Francisco I. Madero 224</p>
              <p>AGS., Centro 20000</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-300" />
            <p className="font-medium">+52 449-400-3030</p>
          </div>
        </div>

        {/* Resort Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-gray-300" />
            <h3 className="text-lg font-semibold">Acerca de...</h3>
          </div>

          <p className=" text-sm leading-relaxed">
            Disfrute de la emoción de Aguascalientes desde las elegantes y
            modernas habitaciones de Villamagna Resorts Family. Con una
            ubicación privilegiada en el centro de Aguascalientes, este resort
            ofrece una experiencia excelente.
          </p>
        </div>

        {/* Amenities */}
        <div className="space-y-3 pb-20">
          <h3 className="text-lg font-semibold">Servicios y amenidades</h3>

          <div className="grid grid-cols-2 gap-y-2 text-sm ">
            <div>Atención especial para niños y adultos mayores</div>
            <div>Cuarto para masajes y SPA</div>
            <div>Área de fumadores</div>
            <div>Servicio al cuarto</div>
            <div>Wi-Fi</div>
          </div>
        </div>
      </div>
    </div>
  );
}
