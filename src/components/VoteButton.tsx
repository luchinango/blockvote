import { useWriteContract } from "wagmi";
import { VOTACION_CONTRACT_ADDRESS, VOTACION_CONTRACT_ABI } from "@/contracts/votacion";
import { Button } from "@/components/ui/button";

export function VoteButton({ candidatoId }: { candidatoId: number }) {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const handleVote = () => {
    writeContract({
      address: VOTACION_CONTRACT_ADDRESS,
      abi: VOTACION_CONTRACT_ABI,
      functionName: "votar", // Cambia por el nombre real
      args: [candidatoId],
    });
  };

  return (
    <div>
      <Button onClick={handleVote} disabled={isPending}>
        {isPending ? "Votando..." : "Votar"}
      </Button>
      {isSuccess && <div>¡Voto registrado en blockchain!</div>}
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
}