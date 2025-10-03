"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Calendar, Users, Bed, UserCheck } from "lucide-react"

interface ReservationSuccessModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ConfirmationDialog({ open, onOpenChange }: ReservationSuccessModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-teal-600" />
                    </div>
                    <DialogTitle className="text-2xl">Reservación Confirmada</DialogTitle>
                    <DialogDescription>Tu reservación ha sido procesada exitosamente</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-start gap-3">
                        <UserCheck className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Datos de la reservación</p>
                            <p className="text-sm text-muted-foreground mt-1">Elias Cardona</p>
                            <p className="text-sm text-muted-foreground mt-1">elias2347@gmail.com</p>
                            <p className="text-sm text-muted-foreground mt-1">+52 492 105 4240</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Bed className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Tipo de Habitación</p>
                            <Badge variant="secondary" className="mt-1 bg-teal-50 text-teal-600 hover:bg-teal-100">
                                Estándar
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Huéspedes</p>
                            <p className="text-sm text-muted-foreground mt-1">2 Adultos • 2 Niños</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Fechas</p>
                            <p className="text-sm text-muted-foreground mt-1">02-10-2025 al 14-10-2025</p>
                            <p className="text-xs text-muted-foreground mt-0.5">12 noches</p>
                        </div>
                    </div>

                    <div className="flex items-start mt-6">
                        <p className="text-lg font-medium italic">"Te envíamos un correo electrónico con tus datos de reservación"</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
