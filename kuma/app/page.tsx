"use client";

import GlobalBalance from "./home/global-balance";
import TokensDashboard from "./home/tokens-dashboard";

import { Deploy } from "@/lib/functions/deploy";
import { useMe } from "@/providers/MeProvider";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { me, chain } = useMe();
  return (
    <main className="h-full w-full flex items-start justify-start flex-col">
      <GlobalBalance />
      <TokensDashboard />
    </main>
  );
}
