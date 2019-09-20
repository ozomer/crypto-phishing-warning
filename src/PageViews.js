import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useEffect } from './common';

function PageViews({ app }) {
  const [pageViews, setPageViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const hostname = `${window.location.hostname}`.replace(/^www\.$/, '').slice(0, 100);
  const hostnameKey = (/^[a-zA-Z0-9][a-zA-Z0-9.\-_]*$/.test(hostname)
  ? hostname
  : `base64:${Buffer.from(hostname).toString('base64')}`);
  useEffect(() => {
    const unsubscribe = app.firestore()
    .collection('page-views')
    .doc(hostnameKey)
    .onSnapshot((doc) => {
      setPageViews(Number((doc.data() || {}).count) || 0);
      setLoading(false);
    });
    return unsubscribe;
  }, [app]);

  return (
    <div className="page-views">
      Page Views for <b>{hostname}</b>:&nbsp;
      <span>
        { loading ? (<i>Loading...</i>) : pageViews }
      </span>
    </div>
  );
}

PageViews.propTypes = {
  app: PropTypes.node.isRequired,
};


export default PageViews;
