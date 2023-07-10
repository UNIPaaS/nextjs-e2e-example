import React, { useEffect } from "react";

export const useSdk = (id: string, scriptSrc: string, onLoad: () => void) => {
  // on src change: load unipaas script
  useEffect(() => {
    // remove existing unipaas script
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }
    // create unipaas script
    const script = document.createElement('script');
    script.id = id;
    script.src = scriptSrc;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);
  }, [scriptSrc]);
};

