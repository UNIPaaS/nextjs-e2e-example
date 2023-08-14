import React, { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { DEFAULT_ENVIRONMENT } from "@/hooks/useEnvironmentKeys";

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
  const context = useContext<any>(StateContext);
  const [data, setData] = context;

  const value = data[key];
  const setValue = (value: any) => {
    setData({...data, [key]: value})

  };

  // // load from localstorage



  return [value, setValue];
};

