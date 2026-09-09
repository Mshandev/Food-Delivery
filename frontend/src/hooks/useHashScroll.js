// NOTE: No test framework is configured in this repository.
// Unit and integration tests for this hook are blocked pending test infrastructure setup.

import { useEffect } from "react";
import { scrollToHash } from "../utils/scrollToHash";

export function useHashScroll() {
  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }

    function handleHashChange() {
      scrollToHash(window.location.hash);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
}
