import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";

export default function CreateElectionPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Crear Nueva Votación</h1>
        <p className="text-muted-foreground">Complete el formulario para configurar y publicar una nueva elección.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <CardTitle>Detalles de la Elección</CardTitle>
                <CardDescription>Información general sobre el proceso electoral.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="election-name">Nombre de la Elección</Label>
                    <Input id="election-name" placeholder="Ej: Elección de Directorio 2026" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="election-description">Descripción</Label>
                    <Textarea id="election-description" placeholder="Describa el propósito de esta elección." rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Fecha de Inicio</Label>
                         <Button id="start-date" variant="outline" className="w-full justify-start text-left font-normal text-muted-foreground">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Seleccionar fecha</span>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end-date">Fecha de Cierre</Label>
                        <Button id="end-date" variant="outline" className="w-full justify-start text-left font-normal text-muted-foreground">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Seleccionar fecha</span>
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="anonymity-level">Nivel de Anonimato</Label>
                    <Select>
                    <SelectTrigger id="anonymity-level">
                        <SelectValue placeholder="Seleccione un nivel" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="auditado">Auditado (Se guarda wallet y voto)</SelectItem>
                        <SelectItem value="secreto">Secreto (Voto anónimo, no se guarda wallet)</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Candidatos</CardTitle>
                            <CardDescription>Añada los candidatos que participarán en la elección.</CardDescription>
                        </div>
                         <Button variant="outline">Añadir Candidato</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
                        <p>Aún no se han agregado candidatos.</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle>Acciones</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                     <Button>Publicar Elección</Button>
                     <Button variant="outline">Guardar como Borrador</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
