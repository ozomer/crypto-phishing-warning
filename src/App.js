import React, {
  useState,
  useEffect as useEffectOriginal
} from 'react';
import { hot } from 'react-hot-loader/root';
import './styles/appStyles.sass';
import Scream from './images/scream.jpg';

function useEffect(callback, ...args) {
  return useEffectOriginal((...subArgs) => {
    callback(subArgs); // ignores result
  }, ...args);
} 

const stubHook = () => {
  const [hookResult, setHookResult] = useState();
  useEffect(async () => {
    try {
      const result = await fetch('https://api.github.com/');
      setHookResult(await result.json());
    } catch (err) {
      setHookResult({
        error: `${err}`,
      });
    }
  }, ['stubHook']);

  return hookResult;
};

function Instructions() {
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
    </div>
  );
}

function App() {
  const result = stubHook();

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="compcontainer">
        <img src={Scream} />
      </div>
      <h1 className="header">
        This Page Could Have Been A Phishing Scam!
      </h1>
      <Instructions />
      <footer>
        Page Views:
        <i> Loading...</i>
      </footer>
    </div>
  );
}

export default hot(App);
