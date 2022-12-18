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
            /* const params = {
              amount: '1', // amount to transfer (in wei) - for eth, erc20 and erc1155 tokens
              chains: ['elated-tan-skat', 'honorable-steel-rasalhague'], // 'from' and 'to' chains (must be present in the list on chains)
              tokenKeyname: '_ETH_0xa5274efA35EbeFF47C1510529D9a8812F95F5735', // token that you want to transfer
              tokenType: 'erc20',
            };
            _metaport.transfer(params as any); */
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
        amount: '1', // amount to transfer (in wei) - for eth, erc20 and erc1155 tokens
        chains: ['mainnet', 'elated-tan-skat'], // 'from' and 'to' chains (must be present in the list on chains)
        tokenKeyname: 'eth', // token that you want to transfer
        tokenType: 'eth',
    };
    if (metaport) {
      await metaport.reset();
      metaport.transfer(params as any);
    }
  }

  const loadFromEuropa = async () => {
    const params = {
        amount: '1', // amount to transfer (in wei) - for eth, erc20 and erc1155 tokens
        chains: ['elated-tan-skat', 'honorable-steel-rasalhague'], // 'from' and 'to' chains (must be present in the list on chains)
        tokenKeyname: '_ETH_0xa5274efA35EbeFF47C1510529D9a8812F95F5735', // token that you want to transfer
        tokenType: 'erc20',
    };
    if (metaport) {
      await metaport.reset();
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
      {
        flow && (
          <div className="back-btn" onClick={() => setFlow('')}>
            {'< Back'}
          </div>
        )
      }
      <div className="header">
        SKALE Bridge
      </div>

      <div className="body">
        {
          !flow && (
            <div>
              <div className="hint">
                <p>Welcome to the SKALE Metaport widget.</p>
                <p>SKALE Metaport was created as a super fast, simple way for users to use the chain-to-chain bridging capabilities of the SKALE Network</p>
                <p>You are about to bridge ETH to the Calypso NFT Hub going through Europa Liquidity Hub</p>
              </div>
              <div className="buttons-title">
                Get ETH From
              </div>
              <div className="bridge-btn" onClick={() => setFlow(FROM_ETH)}>
                Ethereum Mainnet
              </div>
              <div className="buttons-or">or</div>
              <div className="bridge-btn" onClick={() => setFlow(FROM_EUROPA)}>
                Europa Liquidity Hub
              </div>
            </div>
          )
        }
        {
          flow === FROM_ETH && (
            <div className="hint">
              <p><div className="hint-title">Get From Ethereum Mainnet</div></p>
              <p>You are about to transfer ETH from Ethereum Mainnet to Europa Liquidity Hub</p>
            </div>
          )
        }
        {
          flow === FROM_EUROPA && (
            <div className="hint">
              <p><div className="hint-title">Get From Europa Liquidity Hub</div></p>
              <p>You are about to transfer ETH from Europa Liquidity Hub to Calypso NFT Hub</p>
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
