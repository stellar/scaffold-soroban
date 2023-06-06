import React, { ChangeEvent } from "react";
import { Button, Heading, Input } from "@stellar/design-system";

interface FeeProps {
  fee: string;
  memo: string;
  onClick: () => void;
  setFee: (fee: string) => void;
  setMemo: (memo: string) => void;
}

export const Fee = (props: FeeProps) => {
  const handleFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setFee(event.target.value);
  };
  const handleMemoChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setMemo(event.target.value);
  };

  return (
    <>
      <Heading as="h1" size="sm">
        Payment Settings
      </Heading>
      <Input
        fieldSize="md"
        id="input-fee"
        label="Estimated Fee"
        value={props.fee}
        onChange={handleFeeChange}
      />
      <Input
        fieldSize="md"
        id="input-memo"
        label="Memo"
        value={props.memo}
        onChange={handleMemoChange}
      />
      <div className="submit-row-fee">
        <Button
          size="md"
          variant="tertiary"
          isFullWidth
          onClick={props.onClick}
        >
          Next
        </Button>
      </div>
    </>
  );
};
