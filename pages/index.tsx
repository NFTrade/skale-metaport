import { useEffect, useState } from 'react';
import { Metaport as MetaportInterface } from '@skalenetwork/metaport/build/Metaport';
import Network, { changeNetwork } from '../components/Network';
import { CALYPSO, metaportConfig } from '../util/config';

declare const window: any;

const FROM_ETH = 'from_eth';
const FROM_EUROPA = 'from_europa';

export default function Home() {

  const [metaport, setMetaport] = useState<null | MetaportInterface>(null);
  const [completed, setCompleted] = useState(false);
  const [supported, setSupported] = useState(true);
  const [flow, setFlow] = useState('');

  const transferCompleted = async () => {
    setCompleted(true);
    await changeNetwork(CALYPSO);
  }
  
  const loadMetaport = async () => {
    try {
      const { Metaport } = await import('@skalenetwork/metaport');
      const _metaport = new Metaport(metaportConfig as any);
      setMetaport(_metaport);

      window.addEventListener(
        "metaport_transferComplete",
        async (e: any) => {
          const { from, to } = e.detail;
          debugger;
          if (from === 'elated-tan-skat' && to === 'honorable-steel-rasalhague') {
            transferCompleted();
          } else if (to === 'elated-tan-skat') {
            setFlow(FROM_EUROPA);
            const params = {
              amount: '1000000000000000000', // amount to transfer (in wei) - for eth, erc20 and erc1155 tokens
              chains: ['elated-tan-skat', 'honorable-steel-rasalhague'], // 'from' and 'to' chains (must be present in the list on chains)
              tokenKeyname: '_ETH_0xa5274efA35EbeFF47C1510529D9a8812F95F5735', // token that you want to transfer
              tokenType: 'erc20',
            };
            _metaport.transfer(params as any);
          }
        },
        false
      );

    } catch (e) {
      console.log(e);
    }
  }

  const loadFromEth = async () => {
    const params = {
        amount: '1000000000000000000', // amount to transfer (in wei) - for eth, erc20 and erc1155 tokens
        chains: ['mainnet', 'elated-tan-skat'], // 'from' and 'to' chains (must be present in the list on chains)
        tokenKeyname: 'eth', // token that you want to transfer
        tokenType: 'eth',
    };
    if (metaport) {
      metaport.transfer(params as any);
    }
  }

  const loadFromEuropa = async () => {
    const params = {
        amount: '1000000000000000000', // amount to transfer (in wei) - for eth, erc20 and erc1155 tokens
        chains: ['elated-tan-skat', 'honorable-steel-rasalhague'], // 'from' and 'to' chains (must be present in the list on chains)
        tokenKeyname: '_ETH_0xa5274efA35EbeFF47C1510529D9a8812F95F5735', // token that you want to transfer
        tokenType: 'erc20',
    };
    if (metaport) {
      metaport.transfer(params as any);
    }
  }

  useEffect(() => {
    if (flow === FROM_ETH) {
      loadFromEth();
    } else if (flow === FROM_EUROPA) {
      loadFromEuropa();
    }
  }, [flow]);

  useEffect(() => {
    if (!window.ethereum) {
      setSupported(false);
    } else {
      loadMetaport();
    }
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
        <h2>SKALE Add Funds</h2>
      </div>

      <div className="body">
        {
          !flow && (
            <div>
              <h3>Hey!</h3>
              <p>Welcome to the SKALE Metaport widget.</p>
              <p>SKALE Metaport was created as a super fast, simple way for users to use the <b>chain to chain bridging capabilities of the SKALE Network</b></p>
              <p>You are about to bridge ETH to the <b>Calypso NFT Hub</b> going through <b>Europa Liquidity Hub</b></p>
              <p><b>Europa Liquidity Hub</b> is the entry point for tokens (e.g., ETH, SKL, USDC) onto the SKALE Network</p>
              <p><b>Calypso NFT Hub</b> id the official launch point for SKALE NFT Projects</p>
              <div className="bridge-btn" onClick={() => setFlow(FROM_ETH)}>
                Get From "Ethereum Mainnet"
              </div>
              <div className="bridge-btn" onClick={() => setFlow(FROM_EUROPA)}>
                Get From "Europa Hub"
              </div>
            </div>
          )
        }
        {
          flow === FROM_ETH && (
            <div>
              <h3>Get From "Ethereum Mainnet"</h3>
              <p>You are about to transfer <b>ETH</b> from <b>Ethereum Mainnet</b> to <b>Europa Liquidity Hub</b></p>
            </div>
          )
        }
        {
          flow === FROM_EUROPA && (
            <div>
              <h3>Get From "Europa Hub"</h3>
              <p>You are about to transfer <b>ETH</b> from <b>Europa Liquidity Hub</b> to <b>Calypso NFT Hub</b></p>
            </div>
          )
        }
        <div id="metaport" className={flow ? 'metaport' : 'metaport-hidden'} />
        {
          !supported && (
            <div className="completed">
              <p>Looks like your device is not compatible with loading metaport inside an iframe</p>
              <h3>
                <a target="_blank" href={location.href} rel="noreferrer">Open in New Tab</a>
              </h3>
            </div>
          )
        }
      </div>

      <div className="footer">
        <div>
          <a rel="noreferrer" href="https://link.skale.space/metaport-guide" target="_blank">Need help?</a>
        </div>
        <div>
          <Network />
        </div>
      </div>
    </div>
  );
}
