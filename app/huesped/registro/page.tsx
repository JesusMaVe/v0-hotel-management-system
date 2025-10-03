import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpPage() {
  return (
    <div className="w-full h-[120vh] grid place-items-center">
      <Card className="w-[92%] max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold">Crear una cuenta</CardTitle>
          <CardDescription className="text-sm">
            Ingresa tu información para crear tu cuenta de FitSchedule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm" htmlFor="first-name">
                Nombre
              </Label>
              <Input
                className="text-xs"
                id="first-name"
                placeholder="Juan"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm" htmlFor="last-name">
                Apellido
              </Label>
              <Input
                className="text-xs"
                id="last-name"
                placeholder="Pérez"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm" htmlFor="email">
              Correo electrónico
            </Label>
            <Input
              className="text-xs"
              id="email"
              type="email"
              placeholder="m@ejemplo.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm" htmlFor="email">
              Número telefónico
            </Label>
            <Input
              className="text-xs"
              id="email"
              type="tel"
              placeholder="+52 449 8090"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm" htmlFor="password">
              Contraseña
            </Label>
            <Input
              className="text-xs"
              id="password"
              type="password"
              placeholder="contra_segura_123*"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label className="text-xs" htmlFor="terms">
              Acepto los{" "}
              <Link
                href="/terms"
                className="text-teal-600 text-xs underline-offset-4 hover:underline"
              >
                términos y condiciones
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="button" className="w-full bg-teal-600">
            Crear cuenta
          </Button>
          <div className="text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/auth/sign-in"
              className="text-teal-600 underline-offset-4 hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
