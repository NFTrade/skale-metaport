import { getChainId } from './functions';
export const metaportConfig = {
    openOnLoad     : true,
    openButton     : false,
    mainnetEndpoint: 'https://mainnet.skalenodes.com/v1/elated-tan-skat',
    skaleNetwork   : 'mainnet',
    chains         : [
      'mainnet',
      'elated-tan-skat',
      'honorable-steel-rasalhague',
    ],
    chainsMetadata: {
      'elated-tan-skat': {
        alias      : 'Europa SKALE Chain',
        minSfuelWei: '1',
        faucetUrl  : 'https://ruby.exchange/faucet.html',
      },
      'honorable-steel-rasalhague': {
        alias      : 'Calypso SKALE Chain',
        minSfuelWei: '1',
        faucetUrl  : 'https://sfuel.dirtroad.dev',
      },
    },
    tokens: {
      mainnet: {
        eth: {
          chains: [
            'elated-tan-skat',
          ],
        },
      },
      'elated-tan-skat': {
        erc20: {
          wETH: {
            iconUrl: 'https://ruby.exchange/images/tokens/eth-square.jpg',
            address: '0xa5274efA35EbeFF47C1510529D9a8812F95F5735', // wrapper token address
            symbol : 'ETH', // UI: token symbol display name (On the left).
            name   : 'ETH', // UI: token symbol display name (On the left).
            wraps  : {
              address: '0xD2Aaa00700000000000000000000000000000000', // unwrapped token address
              symbol : 'ETH', // UI: token symbol display name for the balance (On the right).
            },
          },
        },
      },
  },
    theme: {
      primary   : '#000000',
      background: '#ffffff',
      mode      : 'light',
    },
};

export const EUROPA = getChainId(2046399126);
export const CALYPSO = getChainId(1564830818);

export const networks = [
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