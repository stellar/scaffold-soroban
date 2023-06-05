import React from "react";
import createStellarIdenticon from "stellar-identicon-js";

import "./styles.scss";

interface IdenticonImgProps {
  publicKey: string;
}

export const IdenticonImg = ({ publicKey }: IdenticonImgProps) => (
  <img
    className="identicon"
    alt="account identicon"
    src={createStellarIdenticon(publicKey).toDataURL()}
  />
);