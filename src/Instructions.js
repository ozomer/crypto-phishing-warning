import React, {
  useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useEffect } from './common';

const dontTrustLinksHash = 'dont-trust-links';

function Instructions({ app }) {
  const [globalInfo, setGlobalInfo] = useState();
  const [dontTrustLinks, setDontTrustLinks] = useState(false);
  useEffect(() => {
    const unsubscribe = app.firestore()
    .collection('globals')
    .doc('global-info')
    .onSnapshot((doc) => {
      setGlobalInfo(doc.data());
    });
    return unsubscribe;
  }, [app]);

  const dontTrustLinksCallback = useCallback(() => {
    setDontTrustLinks(true);
  }, []);

  const redditPostUrl = 'https://www.reddit.com/r/Bitcoin/comments/czriz8/biladdressorg_phishing_scam_website';
  const idnLinkUrl = 'https://en.wikipedia.org/wiki/IDN_homograph_attack';

  return (
    <div className="instructions">
      <h3>
        You probably had a spelling mistake when typing the website address.
        This could be used for stealing bitcoins/altcoins from you,
        for example by generating fake paper-wallets.
        This is a not only a theoretical threat, as shown
        in <a href={redditPostUrl}>this reddit post</a>.
      </h3>
      <p>
        Are you sure you want to generate a paper-wallet and not buy a hardware wallet?
        Here are the steps that you must follow to minimize the risk:
      </p>
      <ol>
        <li>
          <b>Do not use Brain Wallets.</b> Just don&apos;t.
        </li>
        <li>
          <b>Use a live operating system</b> that does not leave any marks on your hard drive,
          like Tails or Ubuntu Live-CD.
        </li>
        <li>
          <b>Never run the wallet generator online.</b>
          <span className="after">
          All wallet generators should provide a link to download it
          locally so you could run it offline.
          Check where the file is downloaded from (right click, &quot;Copy Link Address&quot;).
          Open-Source projects will usually redirect you to download the file from <a href="https://github.com">github.com</a>.
          If the file is downloaded from the same website and not from GitHub,
          you should be suspicious
          (new GitHub projects may also be unsafe,
          but if someone reports them they will be removed).
          When you finish, Shut down the live operating system without reconnecting to the internet.
          </span>
        </li>
        <li>
          <b>Make sure you are browsing in secure websites only.</b>
          <span className="after">
          If you copy-paste the website address to a text editor,
          it should begin with &quot;https://&quot; not &quot;http://&quot;.
          In most browsers you should see a lock-icon before the website address.
          Click that icon if you are not sure.
          </span>
        </li>
        <li id={dontTrustLinksHash} className={dontTrustLinks ? 'red' : ''}>
          <b>Do not trust links from other websites.</b>
          <span className="after">
          Links may deliberately redirect you to a spoof website with an address that looks very
          similar to the one you wanted.
          These addersses may also contain non-english unicode characters that look like english
          characters
          (a.k.a <a href={idnLinkUrl}>IDN homograph attack</a>).
          Just type the website address yourself, or save it in your bookmarks/favorites.
          </span>
        </li>
        <li>
          <b>Download paper-wallet generators from two or more sources</b>, for
          example <b>bitaddress.org</b> and <b>walletgenerator.net</b>.
          Make sure that when you generate a pair of public &amp; private addresses
          in one wallet generator, it can be verified in the other wallet generator.
          A typical scam would be to pick one of the scammer&apos;s public addresses
          from a pre-defined list (i.e. to make it look random every time you generate a wallet)
          and show you an unrelated private address.
          Once you to load bitcoins/altcoins to the scammer&apos;s wallet,
          you no longer have any control over them.
        </li>
        <li>
          <b>When you spend from an address, spend the entire balance.</b>
          <span className="after">
          Move the funds left to a new wallet that belongs to you.
          Once you used the private address in an online website, it could be leaked in logs, etc.
          </span>
        </li>
        <li>
          <b>Are you buying bitcoin/altcoin on a weekly/monthly basis?</b>
          <span className="after">
          For privacy and safety, you should use multiple paper-wallets,
          and not load all the coins to a single address.
          Instead of printing/writing-down lots of private addresses,
          consider using the BIP39 Mnemonic Code standard.
          This standard would let you write down one secret BIP39 Mnemonic phrase (list of words),
          and generate as many wallets as you want
          (you only need to print or take a photo of the public addresses).
          Modern wallet apps (mycelium, electrum), would know to load the Mnemonic phrase
          (with a secret passphrase that you <b>should</b> use),
          and access all the different wallets.
          The standard also gives you an Account Extended Public Key,
          which can be used to generate more public addresses without exposing your private keys.
          You will still need to use a safe device to do so
          (a hacked device could generate fake addresses),
          and if the Account Extended Public Key is leaked,
          your privacy may be harmed because others
          could know about all the wallets that you own
          - but at least you won&apos;t loose any funds.
          </span>
        </li>
        <li>
          <b>Printers are unsafe.</b>
          <span className="after">
          If you insist on generating paper wallets the old way and print the private addresses,
          use a long BIP38 passphrase to encrypt them.
          Consider the fact that modern printers save cache-files of their
          recent printing history,
          connect to the internet, and in many workplaces the printers are monitored by the IT team.
          </span>
        </li>
        <li>
          <b>Watch out from QR-Code Scanner apps.</b>
          <span className="after">
          Many of them would immediately try to steal your coins if you scan a QR-Code
          of a private address.
          </span>
        </li>
      </ol>
      <p className="topspace">
        Here are the domains that I&apos;ve purchased so far,
        to prevent novice Bitcoin users from loosing their coins to scammers:
      </p>
      {
        globalInfo ? (
          <ul>
            {
              (globalInfo.domains || []).map(({ mistake }) => (<li>{ mistake }</li>))
            }
          </ul>
        ) : (
          <p><i>Loading...</i></p>
        )
      }
      {
        globalInfo
        && (globalInfo.domains || [])
        .filter(({ mistake }) => (mistake === `${window.location.hostname}`.replace(/^www\.$/, '')))
        .map(({ real }) => (
          <h2 className="center">
            <a href={`#${dontTrustLinksHash}`} onClick={dontTrustLinksCallback}>
              {
                dontTrustLinks ? (
                  <span className="red">
                    Don&apos;t Trust Links!
                  </span>
                ) : (
                  <span>
                    Take me to <b>{real}</b>
                  </span>
                )
              }
            </a>
          </h2>
        ))
        .slice(0, 1)
      }
    </div>
  );
}

Instructions.propTypes = {
  app: PropTypes.node.isRequired,
};

export default Instructions;
