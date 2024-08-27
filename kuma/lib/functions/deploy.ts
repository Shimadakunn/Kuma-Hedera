import {
  Chain,
  EstimateFeesPerGasReturnType,
  Hash,
  Hex,
  parseEther,
  parseUnits,
  encodeFunctionData,
  Address,
} from "viem";
import { smartWallet } from "@/lib/smart-wallet";
import { useEffect, useRef, useState } from "react";
import { UserOpBuilder, emptyHex } from "@/lib/smart-wallet/service/userOps";
import { useBalance } from "@/providers/BalanceProvider";
import { useMe } from "@/providers/MeProvider";

import {
  chains,
  contracts,
  tokens,
  ChainType,
  ContractType,
  TokenType,
  AAVE_ABI,
  ERC20_ABI,
  AAVE_IPOOL_ABI,
} from "@/constants";

const builder = new UserOpBuilder();

type Me = { account: Address; keyId: Hex; pubKey: { x: Hex; y: Hex } };

export async function Deploy(me: Me) {
  try {
    builder.init(chains[tokens["hbar"].network]);
    console.log("smartWallet", smartWallet.client);

    smartWallet.initRpc(chains[tokens["hbar"].network]);

    const { maxFeePerGas, maxPriorityFeePerGas }: EstimateFeesPerGasReturnType =
      await smartWallet.client.estimateFeesPerGas();
    console.log("maxFeePerGas", maxFeePerGas);

    smartWallet.init(chains[tokens["hbar"].network]);

    let value = parseEther("0");
    let calls = [
      {
        dest: "0x1f29312f134C79984bA4b21840f2C3DcF57b9c85" as Hex,
        value,
        data: emptyHex,
      },
    ];
    const userOp = await builder.buildUserOp({
      calls,
      maxFeePerGas: maxFeePerGas as bigint,
      maxPriorityFeePerGas: maxPriorityFeePerGas as bigint,
      keyId: me?.keyId as Hex,
    });
    console.log("userOp", userOp);
    const hash = await smartWallet.sendUserOperation({ userOp });
    const receipt = await smartWallet.waitForUserOperationReceipt({ hash });
    console.log("receipt", receipt);
    return receipt;
  } catch (e: any) {
    console.error(e);
    return e;
  }
}
