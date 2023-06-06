import React, { ChangeEvent } from "react";
import { Button, Heading, Input } from "@stellar/design-system";

interface TokenInputProps {
  onClick: (value: string) => void;
}

export const TokenInput = (props: TokenInputProps) => {
  const [value, setValue] = React.useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onClick = () => {
    props.onClick(value);
  };
  return (
    <>
      <Heading as="h1" size="sm">
        Choose Token To Send
      </Heading>
      <Input
        fieldSize="md"
        id="input-token-id"
        label="Token ID"
        value={value}
        onChange={handleChange}
      />
      <div className="submit-row">
        <Button
          size="md"
          variant="tertiary"
          isFullWidth
          onClick={onClick}
          disabled={value.length < 1}
        >
          Next
        </Button>
      </div>
    </>
  );
};
