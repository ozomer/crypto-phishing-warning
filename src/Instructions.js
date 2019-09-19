import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useEffect } from './common';

function Instructions({ app }) {
  const [globalInfo, setGlobalInfo] = useState();
  useEffect(() => {
    const unsubscribe = app.firestore()
    .collection('globals')
    .doc('global-info')
    .onSnapshot((doc) => {
      setGlobalInfo(doc.data());
    });
    return unsubscribe;
  }, [app]);

  return (
    <div className="instructions">
      <h2>Subtitle <a href="https://www.google.com">Link</a></h2>
      <p>Text</p>
      <ol>
        <li>
          Element 1 - Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla
          Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla
          Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla
        </li>
        <li>Element 2</li>
      </ol>
      <p>Domains Registered:</p>
      {
        globalInfo ? (
          <ul>
            {
              (globalInfo.domains || []).map(domain => (<li>{ domain }</li>))
            }
          </ul>
        ) : (
          <p><i>Loading...</i></p>
        )
      }
    </div>
  );
}

Instructions.propTypes = {
  app: PropTypes.node.isRequired,
};

export default Instructions;
