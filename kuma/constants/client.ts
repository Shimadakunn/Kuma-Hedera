import { createPublicClient, http } from "viem";
import { sepolia, mainnet,arbitrumSepolia } from "viem/chains";

export const CHAIN = {
  ...sepolia,
  ...arbitrumSepolia,
};

export const transport = http(process.env.NEXT_PUBLIC_RPC_ENDPOINT);

export const PUBLIC_CLIENT = createPublicClient({
  chain: arbitrumSepolia,
  transport,
});

export const MAINNET_PUBLIC_CLIENT = createPublicClient({
  chain: mainnet,
  transport: http(),
});
