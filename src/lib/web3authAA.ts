import { Web3Auth, WEB3AUTH_NETWORK } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { AccountAbstractionProvider } from "@web3auth/account-abstraction-provider";

// Completa la configuración de la cadena con los campos requeridos
const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0x1", // Ethereum Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
};

export async function initWeb3AuthAA(clientId: string, paymasterUrl: string) {
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  // La propiedad correcta es 'config', no 'provider'
  //const accountAbstractionProvider = new AccountAbstractionProvider({
    //config: {
      //paymasterUrl, // Cuando tengas el endpoint real
      // Puedes agregar más opciones aquí si tu paymaster/bundler lo requiere
   // },
  //});

  const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    //privateKeyProvider,
    //ccountAbstractionProvider,
    useAAWithExternalWallet: false,
  });

  // El método correcto es 'initModal' solo en el Modal SDK
  // Si usas Modal SDK, esto está bien. Si usas No Modal, sería 'init()'
  //await web3auth.initModal();
  return web3auth;
}