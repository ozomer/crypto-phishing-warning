import React, {
  useState,
} from 'react';
import { hot } from 'react-hot-loader/root';
import { useEffect } from './common';
import './styles/app.sass';
import Scream from './images/scream.jpg';
import Footer from './Footer';
import Instructions from './Instructions';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [app, setApp] = useState();
  const [globalInfo, setGlobalInfo] = useState();

  useEffect(() => {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    const start = Date.now();
    const interval = setInterval(() => {
      if (document.readyState !== 'complete'
      && document.readyState !== 'loaded') {
        return;
      }
      if (typeof firebase === 'undefined') {
        if (Date.now() - start < 8e3) {
          return;
        }
        clearInterval(interval);
        setError(new Error('Timeout for loading firebase'));
        setLoading(false);
        return;
      }
      clearInterval(interval);
      try {
        setApp(firebase.app());
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load firebase: ${e.stack || e}`);
        setError(e);
        setLoading(false);
        return;
      }
      // asyncly:
      (async () => {
        try {
          const response = await fetch('/increasePageViews', {
            method: 'POST',
          });
          const { ok } = (await response.json()) || {};
          if (!ok) {
            // eslint-disable-next-line no-console
            console.error('Failed to increase page-views: response not ok');
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(`Failed to increase page-views: ${err.stack || err}`);
        }
      })();
    }, 100);
  }, []);

  useEffect(() => {
    if (!app) {
      return null;
    }
    const unsubscribe = app.firestore()
    .collection('globals')
    .doc('global-info')
    .onSnapshot((doc) => {
      setGlobalInfo(doc.data());
      setLoading(false);
    });
    return unsubscribe;
  }, [app]);

  return (
    <div className="container">
      <div className="compcontainer">
        <img src={Scream} alt="Danger!" />
      </div>
      <h1 className="header">
        This Page Could Have Been A Phishing Scam!
      </h1>
      { loading && (
        <div>Loading...</div>
      )}
      { error && (
        <div>Failed to load page...</div>
      )}
      { globalInfo && (
        <Instructions globalInfo={globalInfo} />
      )}
      { app && (
        <Footer app={app} />
      )}
    </div>
  );
}

export default hot(App);
