import { useToast } from "@/components/ui/use-toast";
import { APIError } from "./errors";

export const useThrowToast = () => {
  const { toast } = useToast();
  function throwToast({
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

  return { throwToast };
};
