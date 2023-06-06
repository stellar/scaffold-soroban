import React from "react";
import {
  Button,
  Card,
  IconButton,
  Icon,
  Heading,
} from "@stellar/design-system";
import { copyContent } from "../../helpers/dom";

interface TxResultProps {
  resultXDR: string;
  onClick: () => void;
}

export const TxResult = (props: TxResultProps) => (
  <>
    <Heading as="h1" size="sm" addlClassName="title">
      Transaction Result
    </Heading>
    <div className="signed-xdr">
      <p className="detail-header">Result XDR</p>
      <Card variant="secondary">
        <div className="xdr-copy">
          <IconButton
            altText="copy result xdr data"
            icon={<Icon.ContentCopy key="copy-icon" />}
            onClick={() => copyContent(props.resultXDR)}
          />
        </div>
        <div className="xdr-data">{props.resultXDR}</div>
      </Card>
    </div>
    <div className="submit-row-send">
      <Button size="md" variant="tertiary" isFullWidth onClick={props.onClick}>
        Start Over
      </Button>
    </div>
  </>
);
