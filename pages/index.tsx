import { useEffect, useState } from 'react';
import Network, { changeNetwork } from '../components/Network';
import { CALYPSO, metaportConfig } from '../util/config';

declare const window: any;

export default function Home() {

  const [completed, setCompleted] = useState(false);
  const [supported, setSupported] = useState(true);

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
        async (e: any) => {
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
        <h2>SKALE Metaport</h2>
      </div>
      <div id="metaport" />
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
