import { useEffect, useState } from 'react';

// value is any string you want to debounce, usually - query from your form
// delay is an amount of miliseconds that function will wait before changing the value
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
