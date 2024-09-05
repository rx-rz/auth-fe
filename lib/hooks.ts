import { useToast } from "@/components/ui/use-toast";
import { APIError } from "./errors";
import { useCallback, useState } from "react";

export const useShowToast = () => {
  const { toast } = useToast();
  function showToast({
    title,
    error,
  }: {
    title?: string;
    error?: APIError | Error;
  }) {
    toast({
      title: error
        ? error instanceof APIError
          ? error.error
          : error.message
        : title,
      variant: error ? "destructive" : "default",
    });
  }

  return { showToast };
};

type ServerActionResult<T> = {
  data?: T | undefined;
  error?: APIError | Error | undefined;
};

type ServerActionFn<TArgs extends any[], TResult> = (
  ...args: TArgs
) => Promise<ServerActionResult<TResult>>;

export const useServerAction = <TArgs extends any[], TResult>(
  actionFn: ServerActionFn<TArgs, TResult>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<TResult | null>(null);

  const executeAction = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const { data, error } = await actionFn(...args);
        if (data) {
          setData(data);
        }
        if (error) {
          setError(error);
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [actionFn]
  );

  return { executeAction, isLoading, error, data };
};
