import { useCallback, useEffect, useState, lazy } from "react";
import axios from "axios";

function windowSizeDefiner(){
    let [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      let [menuExpanded, setMenuExpanded] = useState(false);
    
      useEffect(() => {
        function handleWindowSizeChange() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
        window.addEventListener("resize", handleWindowSizeChange);
    
        return () => window.removeEventListener("resize", handleWindowSizeChange)
      }, [])

    return windowSize
}

const fetcher = url => axios.get(url).then(res => res.data);

function useToggleState(initialState = false)
{
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggle];
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

export { windowSizeDefiner, fetcher, useToggleState, isEmpty};