import React, {
  useState,
  useEffect as useEffectOriginal
} from 'react';
import { hot } from 'react-hot-loader/root';

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

function App() {
  const result = stubHook();

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Result:</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default hot(App);
