import { useEffect, useRef, useState } from "react";

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const useStateWithCallback = <S>(
  initialState: S,
  callback: (previousState: S) => void
): [S, (state: S) => void] => {
  const [state, setState] = useState<S>(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState];
};
