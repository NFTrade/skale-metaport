import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const getChainId = (chainId: string | number) => `0x${Number(chainId).toString(16)}`;

export const EUROPA = getChainId(2046399126);
export const CALYPSO = getChainId(1564830818);

const networks = [
  {
    chainId: getChainId(1),
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://rpc.ankr.com/eth"],
    blockExplorerUrls: ["https://etherscan.io/"]
  },{
    chainId: EUROPA,
    chainName: "Europa SKALE Chain",
    nativeCurrency: {
      nname: "sFUEL",
      symbol: "SFUEL",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.skalenodes.com/v1/elated-tan-skat"],
    blockExplorerUrls: ["https://elated-tan-skat.explorer.mainnet.skalenodes.com"]
  },
  {
    chainId: CALYPSO,
    chainName: "Calypso SKALE Chain",
    nativeCurrency: {
      name: "sFUEL",
      symbol: "SFUEL",
      decimals: 18
    },
    rpcUrls: [
      "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
    ],
    blockExplorerUrls: ["https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com"]
  }
];

export const changeNetwork = async (chainId: string) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          { chainId },
        ], // chainId must be in hexadecimal numbers
      });
    } catch(e: any) {
      if (![4902, -32603].includes(e.code)) return;
      const network = networks.find(chain => chain.chainId === chainId);
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...network
          }
        ]
      });
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

declare const window: any;

export default function Network() {
  const [connectedNetwork, setConnectedNetwork] = useState(CALYPSO);

  const networkChanged = (chainId: string | number) => {
    setConnectedNetwork(getChainId(Number(chainId)));
  };

  useEffect(() => {
    if (window?.ethereum?.networkVersion && getChainId(Number(window?.ethereum?.networkVersion)) !== connectedNetwork) {
      setConnectedNetwork(getChainId(Number(window?.ethereum?.networkVersion)));
    }
  }, [connectedNetwork]);

  useEffect(() => {
    window?.ethereum?.on("chainChanged", networkChanged);
  }, []);

  return (
    <div>
      <FormControl>
      <Select
        value={connectedNetwork}
        onChange={(e: SelectChangeEvent) => changeNetwork(e.target.value)}
      >
        {
          networks.map(({chainName, chainId}) => <MenuItem value={chainId} key={chainId}>{chainName}</MenuItem>)
        }
      </Select>
      </FormControl>
    </div>
  );

  return <></>;
}
