import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

function Donation({ globalInfo }) {
  const bitcoinURI = `bitcoin:${globalInfo.donation.bitcoin}?message=Donation`;
  return (
    <div className="donation">
      <h2 className="header">
        Please donate to help me buy more dangerous <span className="nowrap">domain-names</span> and
        prevent phishing scams
      </h2>
      <div className="center-column">
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label className="btc donate-crypto-box">
          <a className="coin" href={bitcoinURI}>
            <div className="coin-face">
              <svg height="10" viewBox="0 0 32 32" width="10" xmlns="http://www.w3.org/2000/svg">
                { /* eslint-disable-next-line max-len */ }
                <path d="M21.78 15.37c.51-.61.83-1.4.83-2.26 0-2.74-1.6-4.38-4.24-4.38V5.45c0-.12-.1-.22-.22-.22h-1.27c-.11 0-.2.1-.2.21v3.3h-1.7V5.44c0-.12-.1-.22-.22-.22H13.5c-.12 0-.2.1-.21.21v3.3H9.67c-.12 0-.21.09-.21.21v1.31c0 .12.1.22.21.22h.21c.94 0 1.7.79 1.7 1.75v7c0 .92-.68 1.67-1.55 1.75a.21.21 0 0 0-.18.16l-.33 1.32c-.01.06 0 .13.04.19.04.05.1.08.17.08h3.55v3.3c0 .1.1.2.2.2h1.28c.12 0 .21-.1.21-.22v-3.28h1.7v3.3c0 .1.1.2.21.2h1.27c.12 0 .22-.1.22-.22v-3.28h.85c2.65 0 4.24-1.64 4.24-4.37 0-1.28-.68-2.39-1.68-3zm-6.8-4.01h2.54c.94 0 1.7.78 1.7 1.75 0 .96-.76 1.75-1.7 1.75h-2.55v-3.5zm3.39 8.75h-3.4v-3.5h3.4c.93 0 1.7.78 1.7 1.75 0 .96-.77 1.75-1.7 1.75z" fill="#FFF" />
              </svg>
            </div>
            <div className="coin-face" />
            <div className="coin-face" />
            <div className="coin-face" />
            <div className="coin-face">
              <svg height="10" viewBox="0 0 32 32" width="10" xmlns="http://www.w3.org/2000/svg">
                { /* eslint-disable-next-line max-len */ }
                <path d="M21.78 15.37c.51-.61.83-1.4.83-2.26 0-2.74-1.6-4.38-4.24-4.38V5.45c0-.12-.1-.22-.22-.22h-1.27c-.11 0-.2.1-.2.21v3.3h-1.7V5.44c0-.12-.1-.22-.22-.22H13.5c-.12 0-.2.1-.21.21v3.3H9.67c-.12 0-.21.09-.21.21v1.31c0 .12.1.22.21.22h.21c.94 0 1.7.79 1.7 1.75v7c0 .92-.68 1.67-1.55 1.75a.21.21 0 0 0-.18.16l-.33 1.32c-.01.06 0 .13.04.19.04.05.1.08.17.08h3.55v3.3c0 .1.1.2.2.2h1.28c.12 0 .21-.1.21-.22v-3.28h1.7v3.3c0 .1.1.2.21.2h1.27c.12 0 .22-.1.22-.22v-3.28h.85c2.65 0 4.24-1.64 4.24-4.37 0-1.28-.68-2.39-1.68-3zm-6.8-4.01h2.54c.94 0 1.7.78 1.7 1.75 0 .96-.76 1.75-1.7 1.75h-2.55v-3.5zm3.39 8.75h-3.4v-3.5h3.4c.93 0 1.7.78 1.7 1.75 0 .96-.77 1.75-1.7 1.75z" fill="#FFF" />
              </svg>
            </div>
          </a>
          <input
            className="coin-address"
            onClick={event => event.target.select()}
            readOnly="readonly"
            spellCheck="false"
            type="text"
            value={globalInfo.donation.bitcoin}
          />
          <a className="coin-qr" href={bitcoinURI}>
            <QRCode value={bitcoinURI} size="40" />
          </a>
        </label>
        <p>
          Domains bought so far:
        </p>
        <ul>
          {
            (globalInfo.domains || []).map(({ mistake }) => (<li>{ mistake }</li>))
          }
        </ul>
      </div>
    </div>
  );
}

Donation.propTypes = {
  globalInfo: PropTypes.node.isRequired,
};

export default Donation;
