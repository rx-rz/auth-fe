"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getProjectKeysQuery } from "../queries";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clipboard, Check } from "lucide-react";

const GetNewProjectApiKeys = () => {
  const { id } = useParams();
  const [getKeys, setGetKeys] = useState(false);
  const { projectKeys } = getProjectKeysQuery({ id: id as string, getKeys });
  const [clientKeyCopied, setClientKeyCopied] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const copyClientKey = () => {
    navigator.clipboard.writeText(projectKeys?.clientKey ?? "");
    setClientKeyCopied(true);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(projectKeys?.apiKey ?? "");
    setApiKeyCopied(true);
  };

  useEffect(() => {
    if (clientKeyCopied) {
      const timeout = setTimeout(() => {
        setClientKeyCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [clientKeyCopied]);

  useEffect(() => {
    if (apiKeyCopied) {
      const timeout = setTimeout(() => {
        setApiKeyCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [apiKeyCopied]);

  return (
    <div>
      <h3 className="font-bold mb-2">API Key Management</h3>
      <Button onClick={() => setGetKeys(true)}>Get New API Keys</Button>
      {getKeys ? (
        <>
          <p className="text-sm font-medium opacity-90 mt-2">
            Here are your new API Keys. For security purposes, please keep them
            secure in an env file preferably.
          </p>

          <div className=" w-full gap-10 mt-4">
            <div className="flex-1 flex flex-col gap-2">
              <Label className="font-bold">Client Key</Label>
              <Input
                type="password"
                className="border-2"
                disabled
                placeholder="............"
                value={projectKeys?.clientKey}
              />
              <Button className="w-fit self-end" onClick={copyClientKey}>
                {clientKeyCopied ? (
                  <Check strokeWidth={1.3} className="animate-in" />
                ) : (
                  <Clipboard strokeWidth={1.3} className="animate-out" />
                )}
              </Button>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label className="font-bold">API Key</Label>
              <Input
                type="password"
                disabled
                className="border-2"
                placeholder="............"
                value={projectKeys?.apiKey}
              />
              <Button className="w-fit self-end" onClick={copyApiKey}>
                {apiKeyCopied ? (
                  <Check strokeWidth={1.3} className="animate-in" />
                ) : (
                  <Clipboard strokeWidth={1.3} className="animate-out" />
                )}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default GetNewProjectApiKeys;
