# Yescrow - crypto calmly. 

Yescrow is a decentralized escrow agent to transact with strangers online. 

Designate an Ethereum address, 

deposit to the smart contract using our <a href="https://yescrow.io">UI</a>,

release the payment when you are satisfied.

It is free to use.

**Less scams = More fun**

## Contact, requests and feedback

In case of a quarrel,

The Crow acts as an arbitre.

Contact crow@yescrow.io to summon.

The Crow takes 5% per dispute.

<a href="t.me/sunsakis">Telegram</a>

<a href="twitter.com/yescrowio">Twitter</a>

## Smart contract functions

Deployed on Ethereum's mainnet. 

Contract address: <a href="https://etherscan.io/address/0x450082ADE010fE62EB12c08350f0bA3CE55f46eF">0x450082ADE010fE62EB12c08350f0bA3CE55f46eF</a>

```
function createDepositETH( address _seller )
```
```
 function createDepositERC20( address _seller, address _token, uint256 _amount )
```
```
 function createDepositERC721( address _seller, address _token, uint256[] calldata _tokenIds )
```
```
function releaseDeposit( uint256 _id )
```
```
function intervene( uint256 _id, address _to ) onlyOwner
```

## Getting Started

This is a [Next.js](https://nextjs.org/) interface bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Install the dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

