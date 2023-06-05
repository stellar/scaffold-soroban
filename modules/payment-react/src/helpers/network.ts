import freighterApi from "@stellar/freighter-api";

export interface NetworkDetails {
  network: string;
  networkUrl: string;
  networkPassphrase: string;
}

export enum Networks {
  Futurenet = "FUTURENET",
}

export const connectNetwork = async () => {
  try {
    const networkDetails = await freighterApi.getNetworkDetails();
    const pubKey = await freighterApi.getPublicKey();

    return {
      networkDetails,
      pubKey,
    };
  } catch (error) {
    console.log(error);
    return {
      networkDetails: {} as NetworkDetails,
      pubKey: "",
    };
  }
};

export const signTx = async (
  xdr: string,
  options: {
    network?: string;
    accountToSign?: string;
    networkPassphrase?: string;
  },
) => {
  const signedTx = await freighterApi.signTransaction(xdr, options);
  return signedTx;
};
