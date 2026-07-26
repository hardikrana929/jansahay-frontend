import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates after `delay`ms
 * have passed without `value` changing. Use this for search inputs so an
 * API call isn't fired on every keystroke.
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;