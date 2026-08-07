import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the page to the element matching the URL hash fragment whenever the
 * location changes.  Mount once inside the Router (e.g. in App.jsx) so it
 * observes every navigation event.
 *
 * Example: navigating to "/#explore-menu" will call
 *   document.querySelector("#explore-menu")?.scrollIntoView()
 */
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout lets React finish rendering the destination page before
      // we attempt to find the element.
      const id = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(id);
    } else {
      // No hash — scroll back to the top of the page.
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
