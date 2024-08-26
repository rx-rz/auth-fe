"use client";
import { Button } from "@/components/ui/button";
import { useMFA } from "../_core/forms";
import { useUserStore } from "@/store/user.store";

const MFAPage = () => {
  const { user } = useUserStore();
  const { triggerWebMFARegistration, triggerWebMFAAuthentication } = useMFA();
  return (
    <div>
      <p>
        <Button
          onClick={async () => {
            if (user.mfaEnabled) {
              console.log('now here')
              await triggerWebMFAAuthentication();
            } else {
              console.log('here')
              await triggerWebMFARegistration();
            }
          }}
        >
          Click to enter passkey
        </Button>
      </p>
    </div>
  );
};
export default MFAPage;
