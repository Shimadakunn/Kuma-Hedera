import { sepolia, Chain } from "viem/chains";
import { http } from "viem";
import { defineChain } from "viem";

export type ChainType = {
  viem: Chain;
  bundlerRpc: any;
  transport?: any;
  fee?: string;
};

export const CHAIN = {
  ...sepolia,
};

export const chains: {
  [key: string]: ChainType;
} = {
  hedera: {
    viem: sepolia,
    bundlerRpc: `https://api.stackup.sh/v1/node/${process.env.NEXT_PUBLIC_STACKUP_BUNDLER_SEPOLIA_API_KEY}`,
  },
};
