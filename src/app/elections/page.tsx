import Link from "next/link";
import { elections } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Check, AlertTriangle, Bell, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { differenceInHours, parseISO } from 'date-fns';

// Mock user data - in a real app, this would come from a user session or context
const userVoteStatus: { [key: string]: boolean } = {
  'eleccion-directorio-2025': false, // Let's assume the user hasn't voted in this one
};

function ElectionNotifications() {
  const now = new Date();
  const openElections = elections.filter(e => e.estado === 'Abierta');

  if (openElections.length === 0) {
    return (
       <Alert className="mb-8 bg-muted/50">
        <Info className="h-4 w-4" />
        <AlertTitle>No hay elecciones activas</AlertTitle>
        <AlertDescription>
          Actualmente no hay ningún proceso electoral en curso. Vuelva más tarde para ver nuevas elecciones.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      {openElections.map(election => {
        const closingDate = parseISO(election.fecha_fin || "");
        const hoursLeft = differenceInHours(closingDate, now);
        const hasVoted = userVoteStatus[election.id] ?? false;
        
        const isClosingSoon = hoursLeft > 0 && hoursLeft <= 24;

        if (hasVoted) {
          return (
            <Alert key={election.id} variant="default" className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">¡Ya votaste!</AlertTitle>
              <AlertDescription className="text-green-700">
                Gracias por participar en la elección "{election.nombre}". Tu voto ha sido registrado.
              </AlertDescription>
            </Alert>
          )
        }

        return (
          <Alert key={election.id} variant={isClosingSoon ? "destructive" : "default"}>
            {isClosingSoon ? <AlertTriangle className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            <AlertTitle>{isClosingSoon ? "¡Elección por cerrar!" : "Elección en curso"}</AlertTitle>
            <AlertDescription>
              Recuerda emitir tu voto en la elección "{election.nombre}" antes del {election.fecha_fin}.
              {isClosingSoon && <span className="font-bold"> Quedan menos de 24 horas.</span>}
            </AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}

export default function ElectionsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      
      <ElectionNotifications />

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Procesos Electorales</h1>
        <p className="text-muted-foreground">
          Seleccione una elección para ver los candidatos, emitir su voto o consultar los resultados.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {elections.map((election) => (
          <Card key={election.id} className="flex flex-col transition-transform hover:scale-[1.02] hover:shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">{election.nombre}</CardTitle>
                <Badge variant={election.estado === 'Abierta' ? 'default' : 'secondary'} className={election.estado === 'Abierta' ? 'bg-green-500 text-white' : ''}>
                  {election.estado === 'Abierta' && <Check className="mr-1 h-3 w-3" />}
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
                {election.descripcion}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={election.estado === 'Abierta' ? `/elections/${election.id}` : `/elections/${election.id}/results`} className="w-full">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
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
