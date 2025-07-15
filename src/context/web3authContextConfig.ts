import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";

const clientId = "BNoJ7B8dUpOU9yQ0tXeU-zJcvWmB97NtobXdm3JnXHb1ofiG6PwKa-J-UDjRQejqiNNLeTvOG2jenR23Lw1jmu8";

const web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    uiConfig: {
      appName: "BlockVote - Sistema de Votación Blockchain",
      theme: { primary: "#7C3AED" },
    }
  },
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  }
};

export default web3AuthContextConfig;