import React, { ChangeEvent } from "react";
import BigNumber from "bignumber.js";
import { Button, Heading, Input } from "@stellar/design-system";
import { formatTokenAmount } from "../../helpers/format";

interface SendAmountProps {
  amount: string;
  decimals: number;
  balance: string;
  onClick: () => void;
  setAmount: (amount: string) => void;
  tokenSymbol: string;
}

export const SendAmount = (props: SendAmountProps) => {
  const canFulfillPayment = new BigNumber(props.amount).isLessThanOrEqualTo(
    new BigNumber(props.balance),
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setAmount(event.target.value);
  };

  return (
    <>
      <Heading as="h1" size="sm" addlClassName="title">
        Available Balance
      </Heading>
      <Heading size="sm" as="h2" addlClassName="balance">
        {formatTokenAmount(new BigNumber(props.balance), props.decimals)}{" "}
        {props.tokenSymbol}
      </Heading>
      <Input
        fieldSize="md"
        id="input-amount"
        label="Choose amount to send"
        value={props.amount}
        onChange={handleChange}
      />
      <div className="submit-row-send">
        <Button
          size="md"
          variant="tertiary"
          isFullWidth
          onClick={props.onClick}
          disabled={props.amount.length < 1 || !canFulfillPayment}
        >
          Next
        </Button>
      </div>
    </>
  );
};
