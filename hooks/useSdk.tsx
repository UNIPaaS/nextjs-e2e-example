import React, { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import { useEnvironmentKeys } from "@/hooks/useEnvironmentKeys";

export const mountScript = (id: string, scriptSrc: string, onLoad: any) => {
  console.log('useSdk handling', {id, scriptSrc})
  // remove existing unipaas script
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
    // @ts-ignore
    window.unipaas = undefined;
  }
  // create unipaas script
  const script = document.createElement('script');
  script.id = id;
  script.src = scriptSrc;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
}

export const useSdk = (id: string, onLoad: () => void) => {
  const environmentKeys = useEnvironmentKeys();
  const [environment, setEnvironment] = useStore('environment');
  const {scriptSrc, baseURL, environmentNames} = environmentKeys;
  // on src change: load unipaas script
  // useEffect(() => {
  //   mountScript(id, scriptSrc, onLoad);
  // }, [environment]);
};

