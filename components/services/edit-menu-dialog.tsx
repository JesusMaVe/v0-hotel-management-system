"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EditMenuDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  menuData: any
}

export function EditMenuDialog({ open, onOpenChange, menuData }: EditMenuDialogProps) {
  const { toast } = useToast()
  const [entradas, setEntradas] = useState<string[]>(menuData?.entradas || [])
  const [principales, setPrincipales] = useState<string[]>(menuData?.principales || [])
  const [postres, setPostres] = useState<string[]>(menuData?.postres || [])
  const [precio, setPrecio] = useState(menuData?.precioMenu?.toString() || "")
  const [newEntrada, setNewEntrada] = useState("")
  const [newPrincipal, setNewPrincipal] = useState("")
  const [newPostre, setNewPostre] = useState("")

  const addItem = (category: "entradas" | "principales" | "postres", value: string) => {
    if (!value.trim()) return

    switch (category) {
      case "entradas":
        setEntradas([...entradas, value])
        setNewEntrada("")
        break
      case "principales":
        setPrincipales([...principales, value])
        setNewPrincipal("")
        break
      case "postres":
        setPostres([...postres, value])
        setNewPostre("")
        break
    }
  }

  const removeItem = (category: "entradas" | "principales" | "postres", index: number) => {
    switch (category) {
      case "entradas":
        setEntradas(entradas.filter((_, i) => i !== index))
        break
      case "principales":
        setPrincipales(principales.filter((_, i) => i !== index))
        break
      case "postres":
        setPostres(postres.filter((_, i) => i !== index))
        break
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Menú actualizado",
      description: "El menú del día ha sido actualizado exitosamente.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Menú del Día</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="precio">Precio del Menú ($)</Label>
            <Input
              id="precio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="420"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Entradas</Label>
            <div className="space-y-2">
              {entradas.map((entrada, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={entrada} readOnly className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem("entradas", index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newEntrada}
                  onChange={(e) => setNewEntrada(e.target.value)}
                  placeholder="Nueva entrada..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addItem("entradas", newEntrada)
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={() => addItem("entradas", newEntrada)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Platos Principales</Label>
            <div className="space-y-2">
              {principales.map((principal, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={principal} readOnly className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem("principales", index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newPrincipal}
                  onChange={(e) => setNewPrincipal(e.target.value)}
                  placeholder="Nuevo plato principal..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addItem("principales", newPrincipal)
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => addItem("principales", newPrincipal)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Postres</Label>
            <div className="space-y-2">
              {postres.map((postre, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={postre} readOnly className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem("postres", index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newPostre}
                  onChange={(e) => setNewPostre(e.target.value)}
                  placeholder="Nuevo postre..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addItem("postres", newPostre)
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={() => addItem("postres", newPostre)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Menú</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
