import { useEffect } from 'react';
const useClickOutSide = (ref, callback) => {
  const handleOnClick = (e) => {
    if (!(e.target === ref?.current || ref?.current?.contains?.(e.target))) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOnClick);
    return () => document.removeEventListener('click', handleOnClick);
  }, []);

  return;
};

export default useClickOutSide;
