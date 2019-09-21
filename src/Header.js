import React from 'react';
import PropTypes from 'prop-types';

function Header({ globalInfo }) {
  const redditPostUrl = 'https://www.reddit.com/r/Bitcoin/comments/czriz8/biladdressorg_phishing_scam_website';

  const [domain] = (globalInfo.domains || [])
  .filter(({ mistake }) => (mistake === `${window.location.hostname}`.replace(/^www\.$/, '')));

  return (
    <h3 className="header">
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
      to <span style={{ fontWeight: 800 }}>bitaddress.org</span>.
    </h3>
  );
}

Header.propTypes = {
  globalInfo: PropTypes.node.isRequired,
};

export default Header;
