import React, {
  useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';

const dontTrustLinksHash = 'dont-trust-links';

function Instructions({ globalInfo }) {
  const [dontTrustLinks, setDontTrustLinks] = useState(false);

  const dontTrustLinksCallback = useCallback(() => {
    setDontTrustLinks(true);
  }, []);

  const redditPostUrl = 'https://www.reddit.com/r/Bitcoin/comments/czriz8/biladdressorg_phishing_scam_website';
  const idnLinkUrl = 'https://en.wikipedia.org/wiki/IDN_homograph_attack';

  const [domain] = (globalInfo.domains || [])
  .filter(({ mistake }) => (mistake === `${window.location.hostname}`.replace(/^www\.$/, '')));

  return (
    <div className="instructions">
      <h3>
        { domain ? (
          <span>
            Did you mean <span style={{ fontWeight: 800 }}>{domain.real}</span>?
          </span>
        ) : (
          <span>
            You probably had a spelling mistake when typing the website address.
          </span>
        )}
        &nbsp;Your typos could be used by scammers, and lead you to a spoof website that generates
        fake paper-wallets.
        This is a not only a theoretical threat, as shown
        in this <a href={redditPostUrl}>reddit post</a> about website addresses that are similar
        to <b>bitaddress.org</b>.
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
          &nbsp;All wallet generators should provide a link to download it
          locally so you could run it offline.
          Check where the file is downloaded from (right click, &quot;Copy Link Address&quot;).
          Open-Source projects will usually redirect you to download the file
          from <a href="https://github.com">github.com</a>.
          If the file is downloaded from the same website and not from GitHub,
          you should be suspicious
          (new GitHub projects may also be unsafe,
          but if someone reports them they will be removed).
          When you finish, Shut down the live operating system without reconnecting to the internet.
        </li>
        <li>
          <b>Make sure you are browsing in secure websites only.</b>
          &nbsp;If you copy-paste the website address to a text editor,
          it should begin with &quot;https://&quot; not &quot;http://&quot;.
          In most browsers you should see a lock-icon before the website address.
          Click that icon if you are not sure.
        </li>
        <li id={dontTrustLinksHash} className={dontTrustLinks ? 'red' : ''}>
          <b>Do not trust links from other websites.</b>
          &nbsp;Links may deliberately redirect you to a spoof website with an address
          that looks very similar to the one you wanted.
          These addersses may also contain non-english unicode characters that look like english
          characters
          (a.k.a <a href={idnLinkUrl}>IDN homograph attack</a>).
          Just type the website address yourself, or save it in your bookmarks/favorites.
        </li>
        <li>
          <b>Download paper-wallet generators from two or more sources</b>, for
          example <b>bitaddress.org</b> and <b>walletgenerator.net</b>.
          Make sure that when you generate a sample pair of public bitcoin address &amp; private key
          in one wallet generator, it can be verified in the other wallet generator (for your actual
          deposit, ignore this address and generate a new one).
          A typical scam would be to pick one of the scammer&apos;s public bitcoin addresses
          from a pre-defined list (i.e. to make it look random every time you generate a wallet)
          and show you an unrelated private key.
          Once you to load bitcoins/altcoins to the scammer&apos;s wallet,
          you no longer have any control over them.
        </li>
        <li>
          <b>When you will finally decide to switch to a hardware/software wallet, sweep the entire balance.</b>
          &nbsp;Transferring even a partial amount of bitcoin to another wallet, requires using your private
          key to sign the transaction, and broadcast this information. This information does not contain the
          private key directly but mathematically it makes it easier to break it.
          Software/Hardware wallets solve this by generating a new address after every transaction,
          and sending your leftover balance to that new address. Obviously this cannot be done with paper wallet.
        </li>
        <li>
          <b>Are you buying bitcoin/altcoin on a weekly/monthly basis?</b>
          &nbsp;For privacy and safety, you should use multiple paper-wallets,
          and not load all the coins to a single address.
          Instead of printing/writing-down lots of private keys,
          consider using the BIP39 Mnemonic Code standard.
          This standard would let you write down one secret BIP39 Mnemonic phrase (list of words),
          and generate as many wallets as you want - you only need to print or take a photo of the
          public addresses, not the private keys. The standard also allows you to re-generate all
          previous/new public addresses from an &quot;Account Extended Public Key&quot; without exposing
          the Mnemonic Code or any information that could lead to the private keys.
        </li>
        <li>
          <b>Printers are unsafe.</b>
          &nbsp;If you insist on generating paper wallets the old way and print
          the private keys, use a long BIP38 passphrase to encrypt them.
          Consider the fact that modern printers save cache-files of their
          recent printing history, connect to the internet, and in many workplaces
          the printers could be monitored by the IT team.
        </li>
        <li>
          <b>Watch out from QR-Code Scanner/Generator apps.</b>
          &nbsp;Many of them would immediately try to steal your coins if you scan/enter a
          private key.
        </li>
      </ol>
      {
        domain && (
          <h2 className="center">
            <a href={`#${dontTrustLinksHash}`} onClick={dontTrustLinksCallback}>
              {
                dontTrustLinks ? (
                  <span className="red">
                    Don&apos;t Trust Links!
                  </span>
                ) : (
                  <span>
                    Take me to <b>{domain.real}</b>
                  </span>
                )
              }
            </a>
          </h2>
        )
      }
      <p>
        Please donate and help me buy domain-names that could be used by scammers.
        Here are the domain-names that I&apos;ve purchased so far:
      </p>
      <ul>
        {
          (globalInfo.domains || []).map(({ mistake }) => (<li>{ mistake }</li>))
        }
      </ul>
    </div>
  );
}

Instructions.propTypes = {
  globalInfo: PropTypes.node.isRequired,
};

export default Instructions;
