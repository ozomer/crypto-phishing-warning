import { useEffect as useEffectOriginal } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useEffect(callback, ...args) {
  return useEffectOriginal((...subArgs) => {
    const promise = Promise.resolve(callback(...subArgs));
    return (...unsubscribeArgs) => {
      promise.then((promiseResult) => {
        if (promiseResult) {
          // If promise returned a value, it must be an unsubscribe function
          return promiseResult(...unsubscribeArgs);
        }
        return promiseResult;
      });
    };
  }, ...args);
}
