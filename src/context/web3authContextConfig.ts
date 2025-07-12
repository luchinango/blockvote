// import { WEB3AUTH_NETWORK } from "@web3auth/modal";

const clientId = "BNoJ7B8dUpOU9yQ0tXeU-zJcvWmB97NtobXdm3JnXHb1ofiG6PwKa-J-UDjRQejqiNNLeTvOG2jenR23Lw1jmu8"; // Tu Client ID

const web3AuthContextConfig = {
  clientId,
  web3AuthNetwork: "sapphire_devnet",
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
};

export default web3AuthContextConfig;