"use client";

import { useState, useMemo } from 'react';
import { elections, candidates, getVotesByElection } from '@/lib/data';
import type { Vote } from '@/lib/data';
import { AlertTriangle, Download, FileText, Search, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Helper to truncate long strings
const truncate = (str: string, n: number) => {
  return (str.length > n) ? str.slice(0, n-1) + '…' : str;
};

// Main component
export default function AuditPage() {
  const [selectedElectionId, setSelectedElectionId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedElection = useMemo(() => {
    return elections.find(e => e.id === selectedElectionId) || null;
  }, [selectedElectionId]);

  const votes = useMemo(() => {
    return getVotesByElection(selectedElectionId);
  }, [selectedElectionId]);

  const candidatesForSelectedElection = useMemo(() => {
    if (!selectedElectionId) return [];
    return candidates.filter(c => c.eleccion_id === selectedElectionId);
  }, [selectedElectionId]);

  const voteCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    candidatesForSelectedElection.forEach(c => counts[c.id] = 0);
    votes.forEach(vote => {
      if (counts[vote.id_candidato] !== undefined) {
        counts[vote.id_candidato]++;
      }
    });
    return counts;
  }, [votes, candidatesForSelectedElection]);

  const filteredVotes = useMemo(() => {
    if (!searchTerm) return votes;
    return votes.filter(vote => {
      const candidate = candidates.find(c => c.id === vote.id_candidato);
      const searchTermLower = searchTerm.toLowerCase();

      return (
        vote.wallet_address.toLowerCase().includes(searchTermLower) ||
        (candidate && candidate.nombre.toLowerCase().includes(searchTermLower)) ||
        vote.firma_digital.toLowerCase().includes(searchTermLower)
      );
    });
  }, [votes, searchTerm]);

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Panel de Auditoría de Votos</h1>
        <p className="text-muted-foreground">Consulte y exporte los datos de las votaciones.</p>
      </header>

      <Alert variant="destructive" className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Acceso a Datos Sensibles</AlertTitle>
        <AlertDescription>
          Está accediendo a una zona con información confidencial. El acceso y las acciones realizadas en este panel son registrados. Proceda con responsabilidad.
        </AlertDescription>
      </Alert>

      {/* Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros de Auditoría</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Select onValueChange={setSelectedElectionId} value={selectedElectionId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una elección..." />
            </SelectTrigger>
            <SelectContent>
              {elections.map(election => (
                <SelectItem key={election.id} value={election.id}>
                  {election.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por wallet, candidato, firma..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!selectedElectionId}
            />
          </div>
        </CardContent>
      </Card>
      
      {selectedElection && (
        <>
          {/* Summary */}
          <section className="mb-8">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-headline">{selectedElection.nombre}</h2>
                    <Badge variant={selectedElection.anonimato === 'Auditado' ? 'default' : 'secondary'} className={selectedElection.anonimato === 'Auditado' ? 'bg-primary' : ''}>
                      <ShieldCheck className="mr-1 h-3 w-3"/>
                      Modo {selectedElection.anonimato}
                    </Badge>
                </div>
                <Button variant="outline" disabled={filteredVotes.length === 0}>
                    <Download className="mr-2 h-4 w-4" /> Exportar CSV
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Votos Totales</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{votes.length}</div>
                   <p className="text-xs text-muted-foreground">Votos registrados en esta elección</p>
                </CardContent>
              </Card>
              {candidatesForSelectedElection.map(candidate => (
                <Card key={candidate.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{candidate.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{voteCounts[candidate.id]} Votos</div>
                    <p className="text-xs text-muted-foreground">
                      {votes.length > 0 ? ((voteCounts[candidate.id] / votes.length) * 100).toFixed(1) : 0}% del total
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Votes Table */}
          <Card>
             <CardHeader>
                <CardTitle>Registro de Votos Individuales</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="rounded-md border">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        {selectedElection.anonimato === 'Auditado' ? (
                            <TableHead>Wallet Votante</TableHead>
                        ) : (
                            <TableHead>ID Voto Anónimo</TableHead>
                        )}
                        <TableHead>Candidato Seleccionado</TableHead>
                        <TableHead>Fecha y Hora</TableHead>
                        <TableHead>Firma Digital</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredVotes.length > 0 ? filteredVotes.map(vote => {
                            const candidate = candidates.find(c => c.id === vote.id_candidato);
                            return (
                            <TableRow key={vote.wallet_address + vote.timestamp}>
                                <TableCell className="font-mono text-xs">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>{truncate(vote.wallet_address, 15)}</TooltipTrigger>
                                            <TooltipContent>
                                                <p>{vote.wallet_address}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                                <TableCell>{candidate?.nombre ?? 'N/A'}</TableCell>
                                <TableCell>{format(new Date(vote.timestamp), 'dd MMM yyyy, HH:mm:ss', { locale: es })}</TableCell>
                                <TableCell className="font-mono text-xs">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>{truncate(vote.firma_digital, 20)}</TooltipTrigger>
                                            <TooltipContent>
                                                <p>{vote.firma_digital}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                            );
                        }) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    {selectedElectionId ? "No se encontraron votos para los filtros aplicados." : "Seleccione una elección para ver los datos."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </div>
             </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
