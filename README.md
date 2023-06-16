# Soroban Example Dapps

This repository holds examples & patterns for building decentralized applications on Soroban.

The repo is organized using yarn workspaces, and git submodules:

- `@modules/payment-react`: this is an example dapp for making a payment on Soroban ([soroban-react-payment](https://github.com/stellar/soroban-react-payment/))
- `@modules/mint-token`: this is an example dapp for minting a standard token on Soroban (
  [soroban-react-mint-token](https://github.com/stellar/soroban-react-mint-token/))

## Prerequisites

You will need:

- Node (>=16.14.0 <17.0.0): https://nodejs.org/en/download/

- Yarn (v1.22.5 or newer): https://classic.yarnpkg.com/en/docs/install

- Freighter wallet: https://www.freighter.app/

## Getting Started

1. Clone and navigate into the
   [Scaffold Soroban repository](https://github.com/stellar/scaffold-soroban/tree/main)

   ```
   git clone git@github.com:stellar/scaffold-soroban.git
   cd scaffold-soroban
   ```

2. Pull the submodules in if this is your first time pulling the repo

   ```
   git submodule update --init --recursive
   ```

3. Install the dependencies by running the following:

   ```
   yarn
   ```

4. If you need to update the submodules to the latest, run:

   ```
   git submodule update --remote
   ```

## Build the Project

```
yarn && yarn build
```

## Starting a Dev Environment

```
yarn && yarn start
```
