import Image from "next/image";
import React, { useState } from "react";
import { ethers } from "ethers";
import { Web3Button } from "@thirdweb-dev/react";
import { Interface, FormatTypes } from "@ethersproject/abi";
import styles from "../styles/Home.module.css";
import Router from "next/router";

const humanReadableABI = [
  "function createDepositETH(address _receiver) external payable",
  "function createDepositERC20(address _receiver, address _token, uint256 _amount) external",
  "function releaseDeposit(uint256 _id) external",
  "event NewDepositETH(uint256 indexed depositId, address indexed depositor, address indexed receiver, uint256 amount)",
  "event NewDepositERC20(uint256 indexed depositId, address indexed depositor, address indexed receiver, address token, uint256 amount)",
  "event DepositReleased(uint256 indexed id)"
  ];

const humanReadableERC20_ABI = [
  "function approve(address _spender, uint256 _value) external",
  "function symbol() external view returns (string)"
  ];

  const ERC20Address = "0xdac17f958d2ee523a2206206994597c13d831ec7";

  const iface = new Interface(humanReadableABI);
  const jsonABI = iface.format(FormatTypes.json);

export default function EscrowForm() {

  const [_amount, setAmount] = useState("");
  const [_seller, setSellerAddress] = useState("");

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleAddressChange(e) {
    setSellerAddress(e.target.value);
  }

  async function blockchainTalk() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(
      ERC20Address,
      humanReadableERC20_ABI,
      signer
    );
  
    const escrowContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MAINNET,
      humanReadableABI,
      signer
    );
    
    try {
      const approveTx = await tokenContract.approve(
          process.env.NEXT_PUBLIC_MAINNET,
          ethers.utils.parseUnits(_amount)
      );
      await approveTx.wait();

      const depositTx = await escrowContract.createDepositERC20(
          _seller,
          _tokenAddress,
          ethers.utils.parseUnits(_amount)
      );
      await depositTx.wait();

      escrowContract.on("NewDepositERC20", (counter, depositor, receiver, token, amount, event) => {
          Router.reload(window.location.pathname);
      });
  } catch (error) {
      console.error(error);
      alert("Make sure you have enough funds to cover the transaction cost. Message escrow@yescrow.io for guidance.");
  }
  }

  return (
    <div class="m-5">
        <div>
          <Image src="usdt.svg" width="48" height="48" alt="USDT logo" class="mx-auto"/>
          <br/>
          <label>Receiving Ethereum address:</label>
          <br/>
          <input class="text-center rounded-xl mt-2 mb-2 max-w-xs sm:max-w-md"
            type="text" 
            placeholder="0x..."
            required
            minLength="42"
            maxLength="42"
            size="50"
            onChange={handleAddressChange} 
          />
          <br/>
          <label>USDT amount:</label>
          <br/>
          <div class="text-center">
          <input
            class="rounded-xl mt-2 mb-2 text-center max-w-xs sm:max-w-md"
            type="number" 
            placeholder="$0.00" 
            step="any"
            required
            onChange={handleAmountChange} 
            />
          </div>
          <br />
          <Web3Button 
                contractAddress={process.env.NEXT_PUBLIC_MAINNET}
                contractAbi={jsonABI}
                action={async () => {
                  await blockchainTalk()
                }
                }
                className={styles.btn}
                >
                <li class="flex items-center">
                <Image
                  src="/lock_icon.png" 
                  class="fill-current h-6 w-6 mr-1" 
                  width="48" 
                  height="48" 
                  alt="lock icon">
                </Image> Escrow</li>
                </Web3Button>
        </div>
  </div>
  );
}