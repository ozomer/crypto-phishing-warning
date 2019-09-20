import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

function PageViews({ globalInfo }) {
  return (
    <div>
      <h2 className="subheader">Donate!</h2>
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label className="btc donate-crypto-box">
        <div className="coin">
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
        </div>
        <input
          className="coin-address"
          onClick={event => event.target.select()}
          readOnly="readonly"
          spellCheck="false"
          type="text"
          value={globalInfo.donation.bitcoin}
        />
        <div className="coin-qr">
          <QRCode value={`bitcoin:${globalInfo.donation.bitcoin}?message=Donation`} size="40" />
        </div>
      </label>
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label className="ltc donate-crypto-box">
        <div className="coin">
          <div className="coin-face">
            <svg height="8" viewBox="0 0 38 38" width="8" xmlns="http://www.w3.org/2000/svg">
              { /* eslint-disable-next-line max-len */ }
              <path d="M12.29 28.04l1.29-5.52-1.58.67.63-2.85 1.64-.68L16.52 10h5.23l-1.52 7.14 2.09-.74-.58 2.7-2.05.8-.9 4.34h8.1l-.99 3.8z" fill="#fff" />
            </svg>
          </div>
          <div className="coin-face" />
          <div className="coin-face" />
          <div className="coin-face" />
          <div className="coin-face">
            <svg height="8" viewBox="0 0 38 38" width="8" xmlns="http://www.w3.org/2000/svg">
              { /* eslint-disable-next-line max-len */ }
              <path d="M12.29 28.04l1.29-5.52-1.58.67.63-2.85 1.64-.68L16.52 10h5.23l-1.52 7.14 2.09-.74-.58 2.7-2.05.8-.9 4.34h8.1l-.99 3.8z" fill="#fff" />
            </svg>
          </div>
        </div>
        <input
          className="coin-address"
          onClick={event => event.target.select()}
          readOnly="readonly"
          spellCheck="false"
          type="text"
          value={globalInfo.donation.litecoin}
        />
        <div className="qr-code">
          <QRCode value={`litecoin:${globalInfo.donation.litecoin}?message=Donation`} size="40" />
        </div>
      </label>
    </div>
  );
}

PageViews.propTypes = {
  globalInfo: PropTypes.node.isRequired,
};

export default PageViews;
