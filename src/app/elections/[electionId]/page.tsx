"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getCandidatesByElection, elections } from '@/lib/data';
import type { Candidate, Election } from '@/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2, User, Vote as VoteIcon, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ElectionVotingPage() {
  const { toast } = useToast();
  const params = useParams();
  const electionId = params.electionId as string;

  const [election, setElection] = useState<Election | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const currentElection = elections.find(e => e.id === electionId) ?? null;
    if (currentElection) {
      setElection(currentElection);
      if (currentElection.estado === 'Abierta') {
        setCandidates(getCandidatesByElection(electionId));
      }
    }
  }, [electionId]);

  const handleVote = async () => {
    setShowConfirmDialog(false);
    setIsVoting(true);

    // Simulate signing and submitting vote
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsVoting(false);
    setHasVoted(true);
    toast({
      title: "Voto Emitido Exitosamente",
      description: "Su voto ha sido registrado de forma segura.",
      variant: "default",
      className: "bg-green-500 text-white border-green-500"
    });
  };

  if (!election) {
    return <div className="container mx-auto py-8 text-center">Cargando elección...</div>;
  }

  if (election.estado === 'Cerrada') {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold font-headline mb-2">Elección: {election.nombre}</h1>
            <Alert variant="default" className="bg-muted/50">
                <Info className="h-4 w-4" />
                <AlertTitle>Elección Cerrada</AlertTitle>
                <AlertDescription>
                    Este proceso electoral ha finalizado. Los resultados serán publicados por la administración de CABLOCK.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold font-headline mb-2">Elección: {election.nombre}</h1>
      <p className="text-muted-foreground mb-8">Seleccione un candidato y emita su voto. El voto es final y no se puede cambiar.</p>

      {hasVoted ? (
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <CardTitle className="text-green-800 font-headline">¡Gracias por votar!</CardTitle>
            <CardDescription className="text-green-700">
              Su voto ha sido emitido y registrado de forma anónima y segura en la blockchain.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <RadioGroup value={selectedCandidate ?? ""} onValueChange={setSelectedCandidate}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {candidates.map(candidate => (
                <Card key={candidate.id} className={`transition-all ${selectedCandidate === candidate.id ? 'border-primary shadow-lg' : 'hover:shadow-md'}`}>
                  <Label htmlFor={candidate.id} className="cursor-pointer block">
                    <CardHeader className="flex flex-row items-center space-x-4">
                      <Image 
                        src={candidate.foto_url} 
                        alt={`Foto de ${candidate.nombre}`}
                        data-ai-hint="person portrait" 
                        width={80} 
                        height={80} 
                        className="rounded-full border-2 border-accent"
                      />
                      <div>
                        <CardTitle className="font-headline text-lg">{candidate.nombre}</CardTitle>
                        <CardDescription>{candidate.perfil}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2">Propuestas Principales:</h4>
                      <p className="text-sm text-muted-foreground">{candidate.propuestas}</p>
                    </CardContent>
                    <CardFooter>
                       <div className="flex items-center space-x-2 p-3 border rounded-md w-full bg-background">
                         <RadioGroupItem value={candidate.id} id={candidate.id} />
                         <Label htmlFor={candidate.id}>Seleccionar a {candidate.nombre}</Label>
                       </div>
                    </CardFooter>
                  </Label>
                </Card>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={!selectedCandidate || isVoting}
              onClick={() => setShowConfirmDialog(true)}
            >
              {isVoting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <VoteIcon className="mr-2 h-5 w-5" />}
              {isVoting ? "Procesando Voto..." : "Emitir Voto"}
            </Button>
          </div>
        </>
      )}

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de su selección?</AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de votar por <span className="font-bold">{candidates.find(c => c.id === selectedCandidate)?.nombre}</span>. 
              Esta acción es irreversible y no se puede deshacer. Su voto será firmado digitalmente y registrado de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleVote} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Confirmar y Votar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
