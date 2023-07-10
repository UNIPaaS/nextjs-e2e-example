import React from "react";
import { useStore } from "@/hooks/useStore";

export const useEnvironment = () => {
  const [environment, setEnvironment] = useStore('environment');
  const environmentMap: any = {
    "development": {
      "scriptSrc": "https://cdn.unipaas.com/embedded-ui.dev.js",
      "privateKey": "",
      "baseURL": "https://dev.unipaas.com"
    },
    "sandbox": {
      "scriptSrc": "https://cdn.unipaas.com/embedded-ui.js",
      "privateKey": "",
      "baseURL": "https://sandbox.unipaas.com"
    },
    "production": {
      "scriptSrc": "https://cdn.unipaas.com/embedded-ui.js",
      "privateKey": "",
      "baseURL": "https://api.unipaas.com"
    }
  };

  return {
    ...environmentMap[environment] || {},
    names: Object.keys(environmentMap),
  };

};

