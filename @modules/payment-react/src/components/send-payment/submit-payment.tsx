import React from "react";
import {
  Button,
  Card,
  Heading,
  IconButton,
  Icon,
  Loader,
  Profile,
} from "@stellar/design-system";
import { copyContent } from "../../helpers/dom";

interface SubmitPaymentProps {
  amount: string;
  destination: string;
  fee: string;
  isSubmitting: boolean;
  memo: string;
  network: string;
  onClick: () => void;
  signedXdr: string;
  tokenSymbol: string;
}

export const SubmitPayment = (props: SubmitPaymentProps) => (
  <>
    <Heading as="h1" size="sm">
      Submit Payment
    </Heading>
    <div className="tx-details">
      <div className="tx-detail-item">
        <p className="detail-header">Network</p>
        <p className="detail-value">{props.network}</p>
      </div>
      <div className="tx-detail-item">
        <p className="detail-header">To</p>
        <div className="dest-identicon">
          <Profile isShort publicAddress={props.destination} size="sm" />
        </div>
      </div>
      <div className="tx-detail-item">
        <p className="detail-header">Amount</p>
        <p className="detail-value">
          {props.amount} {props.tokenSymbol}
        </p>
      </div>
      <div className="tx-detail-item">
        <p className="detail-header">Fee</p>
        <p className="detail-value">{props.fee} XLM</p>
      </div>
      <div className="tx-detail-item">
        <p className="detail-header">Memo</p>
        <p className="detail-value">{props.memo}</p>
      </div>
    </div>
    <div className="signed-xdr">
      <p className="detail-header">Signed XDR</p>
      <Card variant="secondary">
        <div className="xdr-copy">
          <IconButton
            altText="copy signed xdr data"
            icon={<Icon.ContentCopy key="copy-icon" />}
            onClick={() => copyContent(props.signedXdr)}
          />
        </div>
        <div className="xdr-data">{props.signedXdr}</div>
      </Card>
    </div>
    <div className="submit-row-confirm">
      <Button size="md" variant="tertiary" isFullWidth onClick={props.onClick}>
        Submit Payment
        {props.isSubmitting && <Loader />}
      </Button>
    </div>
  </>
);
