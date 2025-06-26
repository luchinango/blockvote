"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { elections, candidates, getCandidatesByElection } from '@/lib/data';
import type { Candidate, Election } from '@/types';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown, Users, Vote as VoteIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

export default function ElectionResultsPage() {
  const params = useParams();
  const electionId = params.electionId as string;

  const { election, electionCandidates, resultsData, winner } = useMemo(() => {
    const election = elections.find(e => e.id === electionId);
    
    if (!election || election.estado !== 'Cerrada' || !election.resultados) {
      return { election: null, electionCandidates: [], resultsData: [], winner: null };
    }

    const electionCandidates = getCandidatesByElection(electionId);
    const totalVotes = election.votos_totales ?? 1;

    let winner: (Candidate & { votos: number; porcentaje: number }) | null = null;
    let maxVotes = -1;

    const resultsData = election.resultados
      .map(result => {
        const candidate = electionCandidates.find(c => c.id === result.candidateId);
        if (!candidate) return null;

        const percentage = totalVotes > 0 ? (result.votos / totalVotes) * 100 : 0;
        const candidateResult = {
          ...candidate,
          votos: result.votos,
          porcentaje: parseFloat(percentage.toFixed(2)),
        };

        if (result.votos > maxVotes) {
          maxVotes = result.votos;
          winner = candidateResult;
        }

        return candidateResult;
      })
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .sort((a, b) => b.votos - a.votos);

    return { election, electionCandidates, resultsData, winner };
  }, [electionId]);

  if (!election) {
    notFound();
    return null;
  }
  
  const chartData = resultsData.map(r => ({
    name: r.nombre.split(' ')[0], // Use first name for chart label
    votos: r.votos,
    fill: "hsl(var(--primary))",
  })).reverse(); // Reverse for horizontal bar chart to show winner at top

  const chartConfig = {
    votos: {
      label: "Votos",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/elections">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2" />
            Volver a Elecciones
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-headline">Resultados: {election.nombre}</h1>
        <p className="text-muted-foreground">Elección finalizada el {election.fecha_fin}.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganador/a</CardTitle>
            <Crown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winner?.nombre ?? 'N/A'}</div>
            <p className="text-xs text-muted-foreground">con {winner?.votos} votos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Votos</CardTitle>
            <VoteIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{election.votos_totales}</div>
            <p className="text-xs text-muted-foreground">Votos emitidos en total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resultsData.length}</div>
            <p className="text-xs text-muted-foreground">Candidatos en la elección</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold font-headline">Detalle de Resultados</h2>
            {resultsData.map(candidate => (
              <Card key={candidate.id} className={`transition-all ${candidate.id === winner?.id ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Image
                    src={candidate.foto_url}
                    alt={`Foto de ${candidate.nombre}`}
                    data-ai-hint="person portrait"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-accent"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="font-headline text-lg">{candidate.nombre}</CardTitle>
                      {candidate.id === winner?.id && <Badge className="bg-yellow-400 text-yellow-900">Ganador/a</Badge>}
                    </div>
                    <CardDescription>{candidate.perfil}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between items-center bg-muted/50 p-3 rounded-b-lg">
                    <div className="font-bold text-lg">{candidate.votos} Votos</div>
                    <div className="text-sm text-muted-foreground">{candidate.porcentaje}% del total</div>
                </CardFooter>
              </Card>
            ))}
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Votos</CardTitle>
              <CardDescription>Visualización de los votos por candidato.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} interval={0} />
                    <Tooltip
                        cursor={{ fill: "hsl(var(--muted))" }}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="votos" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
