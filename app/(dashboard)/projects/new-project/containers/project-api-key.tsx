import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Clipboard, CheckCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  apiKey: string;
  clientKey: string;
};
export const ProjectApiKey = ({ apiKey, clientKey }: Props) => {
  const [clientKeyCopied, setClientKeyCopied] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const copyClientKey = () => {
    navigator.clipboard.writeText(clientKey);
    setClientKeyCopied(true);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
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
      <Separator className="my-10" />
      <h1 className="text-3xl font-bold opacity-90">
        You've created a new project!
      </h1>
      <p className="text-lg">
        Here are your project API Keys. For security purposes, this will only be
        shown to you once.
      </p>
      <div className="flex  mt-10 gap-4 items-end">
        <div className="flex w-full gap-10">
          <div className="flex-1 flex flex-col gap-2">
            <Label className="font-bold">Client Key</Label>
            <Input
              type="password"
              className="border-2"
              disabled
              placeholder="............"
              value={clientKey}
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
              value={apiKey}
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
      </div>
    </div>
  );
};
