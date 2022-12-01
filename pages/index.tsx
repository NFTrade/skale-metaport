import { useEffect, useState } from 'react';
import Network, { CALYPSO, changeNetwork } from '../components/Network';

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

  const [completed, setCompleted] = useState(false);

  const transferCompleted = async () => {
    setCompleted(true);
    await changeNetwork(CALYPSO);
  }
  
  const loadMetaport = async () => {
    try {
      const { Metaport } = await import('@skalenetwork/metaport');
      const metaport = new Metaport(metaportConfig as any);
      window.addEventListener(
        "metaport_transferComplete",
        async (e) => {
          const { from, to } = e.detail;
          if (from === 'elated-tan-skat' && to === 'honorable-steel-rasalhague') {
            transferCompleted();
          }
        },
        false
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadMetaport();
  }, []);
  return (
    <div>
      {
        completed && (
          <div className="completed">
            <div>
              Your transfer has been completed!
            </div>
            <div>
              you can close this dialog now.
            </div>
            <div className="chainNotice">
              <div>Please make sure you are switching back to</div>
              <div>&quot;Calypso SKALE Chain&quot;</div>
            </div>
          </div>
        )
      }
      <div className="header">
        <h2>SKALE Metaport</h2>
      </div>
      <div id="metaport" />
      <div className="footer">
        <div>
          <a rel="noreferrer" href="https://skale.space/blog/how-to-use-nftrade-on-skale" target="_blank">Need help?</a>
        </div>
        <div>
          <Network />
        </div>
      </div>
    </div>
  );
}
