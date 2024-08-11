"use client";
import { Button } from "@/components/ui/button";
import { useMFA } from "../_core/forms";

const MFAPage = () => {
  const { triggerWebMFARegistration } = useMFA();
  return (
    <div>
      <p>
        <Button
          onClick={async () => {
            await triggerWebMFARegistration();
          }}
        >
          Click to enter passkey
        </Button>
      </p>
    </div>
  );
};
export default MFAPage;
