import React, { useState, createContext, useContext, useEffect } from "react";
import { DEFAULT_ENVIRONMENT } from "@/hooks/useEnvironmentKeys";
import { useRouter } from "next/router";

interface StoreState {
  organization: string;
  environment: string;
  vendors: any[];
  selectedVendorId: string;
  accessToken: string;
  privateKey: string;
  components?: any;
  unipaasLoaded?: boolean;

}
const storeInitialState: StoreState = {
  organization: "None",
  environment: DEFAULT_ENVIRONMENT,
  vendors: [],
  selectedVendorId: "",
  accessToken: "",
  privateKey: "",
  components: null,
  unipaasLoaded: true,
};

export const StateContext = createContext({});

interface StoreProviderProps {
  children: React.ReactNode;
}
export const StoreProvider = (props: StoreProviderProps) => {
  const [data, setData] = useState(storeInitialState);
  return <StateContext.Provider value={[data, setData]} {...props} />;
};
export const useStore = (key: keyof StoreState) => {
  const router = useRouter();
  const { query } = router;
  const context = useContext<any>(StateContext);
  const [data, setData] = context;

  const isLocalStorageAvailable = typeof window !== "undefined" && typeof localStorage !== "undefined";
  const isLocalStorageKey = key === 'environment' || key === 'privateKey';
  const useLocalStorage = isLocalStorageAvailable && isLocalStorageKey;
  const localStorageKey = `store-${key}`;
  const localStorageValue = useLocalStorage ? localStorage.getItem(localStorageKey) : null;

  const value = query[key] || localStorageValue || data[key];

  const setValue = (value: any) => {
    setData({...data, [key]: value})
    if (useLocalStorage) {
      localStorage.setItem(localStorageKey, value);
    }

  };


  return [value, setValue];
};

