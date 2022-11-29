import { useEffect } from 'react';

const metaportConfig = {
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

export default function Home() {

  const loadMetaport = async () => {
    const { Metaport } = await import('@skalenetwork/metaport');
    new Metaport(metaportConfig as any);
  }

  useEffect(() => {
    loadMetaport();
  }, []);
  return (
    <div>
      <h2 className="header">SKALE Metaport</h2>
      <div id="metaport" />
      <p className="footer"><a rel="noreferrer" href="https://skale.space/blog/how-to-use-nftrade-on-skale" target="_blank">Need help?</a></p>
    </div>
  );
}
