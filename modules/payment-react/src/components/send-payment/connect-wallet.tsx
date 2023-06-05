import React from "react";
import { Button, Heading } from "@stellar/design-system";

interface ConnectWalletProps {
  network: string | null;
  connectionError: string | null;
  onClick: () => void;
}

export const ConnectWallet = (props: ConnectWalletProps) => {
  const text =
    props.network && props.connectionError === null
      ? "Next"
      : "Connect Freighter";
  return (
    <>
      <Heading as="h1" size="sm">
        Send a Soroban Payment
      </Heading>
      <div className="submit-row">
        <Button
          size="md"
          variant="tertiary"
          isFullWidth
          onClick={props.onClick}
        >
          {text}
        </Button>
      </div>
    </>
  );
};
