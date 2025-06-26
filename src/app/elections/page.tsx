import Link from "next/link";
import { elections } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Check } from "lucide-react";

export default function ElectionsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Procesos Electorales</h1>
        <p className="text-muted-foreground">
          Seleccione una elección para ver los candidatos y emitir su voto.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {elections.map((election) => (
          <Card key={election.id} className="flex flex-col transition-transform hover:scale-[1.02] hover:shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">{election.nombre}</CardTitle>
                <Badge variant={election.estado === 'Abierta' ? 'default' : 'secondary'} className={election.estado === 'Abierta' ? 'bg-green-500 text-white' : ''}>
                  {election.estado === 'Abierta' ? <Check className="mr-1 h-3 w-3" /> : null}
                  {election.estado}
                </Badge>
              </div>
              <CardDescription className="flex items-center pt-2">
                <Calendar className="mr-2 h-4 w-4" />
                {election.fecha_inicio} - {election.fecha_fin}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                {election.estado === 'Abierta' 
                  ? 'Este proceso de votación está actualmente activo. Haga clic para ver los candidatos y emitir su voto.'
                  : 'Este proceso de votación ha finalizado. Puede consultar los resultados.'
                }
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/elections/${election.id}`} className="w-full">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={election.estado === 'Cerrada'}>
                  {election.estado === 'Abierta' ? 'Ver Candidatos y Votar' : 'Ver Resultados'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
