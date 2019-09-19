import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useEffect } from './common';

function Footer({ app }) {
  const [pageViews, setPageViews] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const hostname = `${window.location.hostname}`.replace(/^www\.$/, '').slice(0, 100) || 'empty';
    const key = (/^[a-zA-Z0-9.\-_]+$/.test(hostname) ? hostname : `base64:${Buffer.from(hostname).toString('base64')}`);

    const unsubscribe = app.firestore()
    .collection('page-views')
    .doc(key)
    .onSnapshot((doc) => {
      setPageViews(Number((doc.data() || {}).count) || 0);
      setLoading(false);
    });
    return unsubscribe;
  }, [app]);

  return (
    <footer>
      Page Views:&nbsp;
      {
        loading ? (
          <i>Loading...</i>
        ) : pageViews
      }
    </footer>
  );
}

Footer.propTypes = {
  app: PropTypes.node.isRequired,
};


export default Footer;
