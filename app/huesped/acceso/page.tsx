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

export default function SignInPage() {
  return (
    <div className="w-full h-[100vh] grid place-items-center">
      <Card className="w-[92%] max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold">Iniciar sesión</CardTitle>
          <CardDescription className="text-sm">
            Ingresa tu correo electrónico y contraseña para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm">
                Contraseña
              </Label>
              <Link
                href="/auth/reset-password"
                className="text-sm text-teal-600 underline-offset-4 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              className="text-xs"
              id="password"
              type="password"
              placeholder="contra_segura_123*"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="button" className="w-full bg-teal-600">
            Iniciar sesión
          </Button>
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/auth/sign-up"
              className="text-teal-600 underline-offset-4 hover:underline"
            >
              Regístrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
