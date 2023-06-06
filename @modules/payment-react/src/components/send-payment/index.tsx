import React from "react";
import {
  Card,
  Caption,
  Layout,
  Notification,
  Profile,
  Loader,
} from "@stellar/design-system";
import freighterApi from "@stellar/freighter-api";

import {
  connectNetwork,
  Networks,
  NetworkDetails,
} from "../../helpers/network";
import { createPortal } from "react-dom";
import { ERRORS } from "../../helpers/error";
import {
  getTxBuilder,
  BASE_FEE,
  XLM_DECIMALS,
  getTokenSymbol,
  getTokenDecimals,
  getTokenBalance,
  getServer,
  submitTx,
} from "../../helpers/soroban";

import { SendAmount } from "./send-amount";
import { ConnectWallet } from "./connect-wallet";
import { PaymentDest } from "./payment-destination";
import { TokenInput } from "./token-input";
import { ConfirmPayment } from "./confirm-payment";
import { Fee } from "./fee";
import { SubmitPayment } from "./submit-payment";
import { TxResult } from "./tx-result";

import "./index.scss";

type StepCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface SendPaymentProps {
  showHeader?: boolean;
}

export const SendPayment = (props: SendPaymentProps) => {
  const showHeader = props.showHeader || true;
  const [activeNetworkDetails, setActiveNetworkDetails] = React.useState(
    {} as NetworkDetails,
  );
  const [activePubKey, setActivePubKey] = React.useState(null as string | null);
  const [stepCount, setStepCount] = React.useState(1 as StepCount);
  const [connectionError, setConnectionError] = React.useState(
    null as string | null,
  );

  const [tokenId, setTokenId] = React.useState("");
  const [tokenDecimals, setTokenDecimals] = React.useState(XLM_DECIMALS);
  const [paymentDestination, setPaymentDest] = React.useState("");
  const [sendAmount, setSendAmount] = React.useState("");
  const [tokenSymbol, setTokenSymbol] = React.useState("");
  const [tokenBalance, setTokenBalance] = React.useState("");
  const [fee, setFee] = React.useState(BASE_FEE);
  const [memo, setMemo] = React.useState("");
  const [txResultXDR, settxResultXDR] = React.useState("");
  const [signedXdr, setSignedXdr] = React.useState("");

  // 2 basic loading states for now
  const [isLoadingTokenDetails, setTokenDetails] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function setToken(id: string) {
    setTokenDetails(true);
    setTokenId(id);

    const server = getServer(activeNetworkDetails);

    try {
      const txBuilderSymbol = await getTxBuilder(
        activePubKey!,
        BASE_FEE,
        server,
        activeNetworkDetails.networkPassphrase,
      );

      const symbol = await getTokenSymbol(id, txBuilderSymbol, server);
      setTokenSymbol(symbol);

      const txBuilderBalance = await getTxBuilder(
        activePubKey!,
        BASE_FEE,
        server,
        activeNetworkDetails.networkPassphrase,
      );
      const balance = await getTokenBalance(
        activePubKey!,
        id,
        txBuilderBalance,
        server,
      );
      setTokenBalance(balance);

      const txBuilderDecimals = await getTxBuilder(
        activePubKey!,
        BASE_FEE,
        server,
        activeNetworkDetails.networkPassphrase,
      );
      const decimals = await getTokenDecimals(id, txBuilderDecimals, server);
      setTokenDecimals(decimals);
      setTokenDetails(false);

      return true;
    } catch (error) {
      console.log(error);
      setConnectionError("Unable to fetch token details.");
      setTokenDetails(false);

      return false;
    }
  }

  function renderStep(step: StepCount) {
    switch (step) {
      case 8: {
        const onClick = () => setStepCount(1);
        return <TxResult onClick={onClick} resultXDR={txResultXDR} />;
      }
      case 7: {
        const submit = async () => {
          setIsSubmitting(true);
          try {
            const server = getServer(activeNetworkDetails);
            const result = await submitTx(
              signedXdr,
              activeNetworkDetails.networkPassphrase,
              server,
            );

            settxResultXDR(result);
            setIsSubmitting(false);

            setStepCount((stepCount + 1) as StepCount);
          } catch (error) {
            console.log(error);
            setIsSubmitting(false);
            setConnectionError(ERRORS.UNABLE_TO_SUBMIT_TX);
          }
        };
        return (
          <SubmitPayment
            network={activeNetworkDetails.network}
            destination={paymentDestination}
            amount={sendAmount}
            tokenSymbol={tokenSymbol}
            fee={fee}
            signedXdr={signedXdr}
            isSubmitting={isSubmitting}
            memo={memo}
            onClick={submit}
          />
        );
      }
      case 6: {
        const setSignedTx = (xdr: string) => {
          setSignedXdr(xdr);
          setStepCount((stepCount + 1) as StepCount);
        };
        return (
          <ConfirmPayment
            tokenId={tokenId}
            tokenDecimals={tokenDecimals}
            pubKey={activePubKey!}
            tokenSymbol={tokenSymbol}
            onTxSign={setSignedTx}
            network={activeNetworkDetails.network}
            destination={paymentDestination}
            amount={sendAmount}
            fee={fee}
            memo={memo}
            networkDetails={activeNetworkDetails}
          />
        );
      }
      case 5: {
        const onClick = () => setStepCount((stepCount + 1) as StepCount);
        return (
          <Fee
            fee={fee}
            memo={memo}
            onClick={onClick}
            setFee={setFee}
            setMemo={setMemo}
          />
        );
      }
      case 4: {
        const onClick = () => setStepCount((stepCount + 1) as StepCount);
        return (
          <SendAmount
            amount={sendAmount}
            decimals={tokenDecimals}
            setAmount={setSendAmount}
            onClick={onClick}
            balance={tokenBalance}
            tokenSymbol={tokenSymbol}
          />
        );
      }
      case 3: {
        if (isLoadingTokenDetails) {
          return (
            <div className="loading">
              <Loader />
            </div>
          );
        }
        const onClick = async (value: string) => {
          const success = await setToken(value);

          if (success) {
            setStepCount((stepCount + 1) as StepCount);
          }
        };
        return <TokenInput onClick={onClick} />;
      }
      case 2: {
        const onClick = () => setStepCount((stepCount + 1) as StepCount);
        return (
          <PaymentDest
            onClick={onClick}
            setDestination={setPaymentDest}
            destination={paymentDestination}
          />
        );
      }
      case 1:
      default: {
        const onClick =
          activeNetworkDetails.network && connectionError === null
            ? () => setStepCount((stepCount + 1) as StepCount)
            : setConnection;
        return (
          <ConnectWallet
            network={activeNetworkDetails.network}
            connectionError={connectionError}
            onClick={onClick}
          />
        );
      }
    }
  }

  async function setConnection() {
    setConnectionError(null);
    setActivePubKey(null);

    const isConnected = await freighterApi.isConnected();

    if (!isConnected) {
      setConnectionError(ERRORS.FREIGHTER_NOT_AVAILABLE);
      return;
    }

    const { networkDetails, pubKey } = await connectNetwork();

    if (networkDetails.network !== Networks.Futurenet) {
      setConnectionError(ERRORS.UNSUPPORTED_NETWORK);
    }

    setActiveNetworkDetails(networkDetails);
    setActivePubKey(pubKey);
  }

  return (
    <>
      {showHeader && (
        <Layout.Header hasThemeSwitch projectId="soroban-react-payment" />
      )}
      <div className="Layout__inset account-badge-row">
        {activePubKey !== null && (
          <Profile isShort publicAddress={activePubKey} size="sm" />
        )}
      </div>
      <div className="Layout__inset layout">
        <div className="payment">
          <Card variant="primary">
            <Caption size="sm" addlClassName="step-count">
              step {stepCount} of 8
            </Caption>
            {renderStep(stepCount)}
          </Card>
        </div>
        {connectionError !== null &&
          createPortal(
            <div className="notification-container">
              <Notification title={connectionError!} variant="error" />
            </div>,
            document.getElementById("root")!,
          )}
      </div>
    </>
  );
};
