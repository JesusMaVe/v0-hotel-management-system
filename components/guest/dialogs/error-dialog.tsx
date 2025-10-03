"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { XCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReservationErrorModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ErrorDialog({ open, onOpenChange }: ReservationErrorModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <DialogTitle className="text-2xl">Reservación No Disponible</DialogTitle>
                    <DialogDescription>No es posible realizar la reservación en las fechas seleccionadas</DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Fechas no disponibles</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Las habitaciones están ocupadas en el período seleccionado. Por favor, elige otras fechas.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => onOpenChange(false)} className="bg-teal-600 hover:bg-teal-700">
                        Elegir Otras Fechas
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
