export const VOTACION_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

export const VOTACION_CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "uint256", "name": "candidatoId", "type": "uint256" }],
    "name": "votar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];