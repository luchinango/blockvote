import { useContractRead } from "wagmi";
import { VOTACION_CONTRACT_ADDRESS, VOTACION_CONTRACT_ABI } from "@/contracts/votacion";

export function ElectionResults() {
  const { data, isLoading, error } = useContractRead({
    address: VOTACION_CONTRACT_ADDRESS,
    abi: VOTACION_CONTRACT_ABI,
    functionName: "getResultados", // Cambia por el nombre real
  });

  if (isLoading) return <div>Cargando resultados...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return (
    <div>
      <h2>Resultados</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}