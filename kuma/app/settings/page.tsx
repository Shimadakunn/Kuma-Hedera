"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";

import { useMe } from "@/providers/MeProvider";
import { useWalletConnect, IWCReactSession } from "@/lib/wallet-connect";
import { tokens, chains } from "@/constants";

import { truncate } from "@/utils/truncate";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ChevronLeft, UserRound, Moon, Sun, Unplug, Coins } from "lucide-react";
import Spinner from "@/components/Spinner";

import { InteractWithFaucet } from "@/lib/functions";
import { useBalance } from "@/providers/BalanceProvider";

const Settings = () => {
  const { me, disconnect, isMounted } = useMe();
  const { sessions } = useWalletConnect();
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-full flex justify-start flex-col p-4 space-y-8">
      <div className="w-full items-center justify-between flex">
        <Button size={"icon"} onClick={() => router.push("/")}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button
          size={"icon"}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Sun /> : <Moon />}
        </Button>
      </div>
      <div className="w-full items-center justify-between flex py-4 px-2">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(me?.account || "");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
          }}
        >
          <UserRound className="mr-2" />
          {me?.account.slice(0, 6)}...{me?.account.slice(-4)}
        </Button>
        <Button
          variant="destructiveoutline"
          onClick={() => {
            disconnect();
            router.push("/");
          }}
        >
          LOG OUT
        </Button>
      </div>
      <Separator />
      <h2>Wallet Connect</h2>
      {(!sessions || Object.values(sessions).length < 1) && (
        <h1>No active dApp sessions</h1>
      )}
      {sessions &&
        Object.values(sessions).length > 0 &&
        Object.values(sessions).map((element) => {
          return (
            <SessionCard key={element.session.topic} wcReactSession={element} />
          );
        })}
      <Separator />
      <h2>Faucets</h2>
      <FaucetCard token="hbar" />
    </div>
  );
};
export default Settings;

interface IProps {
  wcReactSession: IWCReactSession;
}
function SessionCard({ wcReactSession }: IProps) {
  const { disconnectSession } = useWalletConnect();

  if (!wcReactSession.session) return <div>no session</div>;

  const { session } = wcReactSession;
  const topic = session.topic;
  const { name, icons, url } = session.peer.metadata;
  return (
    <div className="w-full flex items-center justify-between bg-primary/5 p-4 rounded-xl">
      <div className="flex items-center justify-center space-x-2">
        {icons && (
          <img
            src={icons[0]}
            alt="test"
            width={64}
            style={{ borderRadius: "10px" }}
          />
        )}
        <div className="flex flex-col items-start justify-center">
          <h1>{name}</h1>
          <Button
            variant={"link"}
            size={"link"}
            onClick={() => {
              window.open(url, "_blank");
            }}
          >
            {truncate(url?.split("https://")[1] ?? "Unknown", 23)}
          </Button>
        </div>
      </div>
      <Button
        variant={"outline"}
        size={"icon"}
        disabled={wcReactSession.disconnectIsLoading}
        onClick={() => disconnectSession(topic)}
      >
        {wcReactSession.disconnectIsLoading ? (
          <Spinner style={{ width: 16, height: 16 }} color="var(--gray-a8)" />
        ) : (
          <Unplug />
        )}
      </Button>
    </div>
  );
}

function FaucetCard({ token }: { token: string }) {
  const [txReceipt, setTxReceipt] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const { me, chain } = useMe();
  const { refreshBalance } = useBalance();
  return (
    <div className="w-full flex items-center justify-between bg-primary/5 p-4 rounded-xl">
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center justify-center relative">
          <Image
            src={`/tokens-icons/${tokens[token].coin.toLowerCase()}.png`}
            width={60}
            height={60}
            alt={tokens[token].coin}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h1>{tokens[token].name} Faucet</h1>
          <h2 className="text-gray-400">Get free tokens</h2>
        </div>
      </div>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={async () =>
          setTxReceipt(
            await InteractWithFaucet(
              tokens[token],
              me!,
              setIsLoading,
              refreshBalance,
              setError
            )
          )
        }
      >
        {isLoading ? <Spinner /> : <Coins />}
      </Button>
    </div>
  );
}
