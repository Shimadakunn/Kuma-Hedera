import { sepolia, arbitrumSepolia, Chain, optimismSepolia } from "viem/chains";
import { http } from "viem";
import { defineChain } from "viem";

export type ChainType = {
  viem: Chain;
  bundlerRpc: any;
  transport?: any;
  fee?: string;
};

export const hedera = defineChain({
  id: 296,
  name: "Hedera Testnet",
  network: "hedera-testnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.hashio.io/api"],
    },
    public: {
      http: ["https://testnet.hashio.io/api"],
    },
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/testnet",
    },
  },
  testnet: true,
});

export const CHAIN = {
  ...hedera,
};

export const chains: {
  [key: string]: ChainType;
} = {
  hedera: {
    viem: hedera,
    bundlerRpc: "http://localhost:4337",
  },
};
