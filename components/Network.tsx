import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CALYPSO, networks } from "../util/config";
import { getChainId } from "../util/functions";

declare const window: any;

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
}
