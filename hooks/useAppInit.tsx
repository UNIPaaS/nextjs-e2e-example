import React, { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import * as EnvironmentKeys from "@/environment-keys.json";
import { useApi } from "@/hooks/useApi";
import { useSdk } from "@/hooks/useSdk";

export const useAppInit = () => {
  const [selectedVendorId, setSelectedVendorId] = useStore('selectedVendorId');
  const [vendors, setVendors] = useStore('vendors');
  const [privateKey, setPrivateKey] = useStore('privateKey');
  const [environment, setEnvironment] = useStore('environment');
  const [accessToken, setAccessToken] = useStore('accessToken');
  const [unipaasLoaded, setUnipaasLoaded] = useStore('unipaasLoaded');
  const [components, setComponents] = useStore('components');

  // @ts-ignore
  const environmentKeys = EnvironmentKeys[environment];
  const {scriptSrc, baseURL} = environmentKeys || {};
  const {postAuthorize, getVendors} = useApi(baseURL, privateKey);

  const authorizeAPI = async () => {
    const data = await postAuthorize({
      ...(selectedVendorId && {vendorId: selectedVendorId}),
    });
    setAccessToken(data?.accessToken);
  }

  // on private key update get vendors
  useEffect(() => {
    if (!privateKey) {
      return;
    }
    getVendors().then((vendors) => {
      setVendors(vendors);
    }).catch((error) => {
      console.error('GET /vendors failed', error);
    });
  }, [privateKey]);

  // on environment change: update private key
  useEffect(() => {
    setAccessToken('');
    setPrivateKey('');
    setUnipaasLoaded(false);
    setPrivateKey(environmentKeys.privateKey);
  }, [environmentKeys]);

  // init unipaas sdk
  useSdk("unipaas-script", scriptSrc, () => setUnipaasLoaded(true));

  // on unipaas load and accessToken available: create unipaas components
  useEffect(() => {
    // make sure unipaas is loaded and we have an access token
    if (!unipaasLoaded || !accessToken) {
      return;
    }

    // unipaas should be loaded and we have an access token; safety check
    const unipaas = window.unipaas;
    if (!unipaas) {
      console.warn('no unipaas');
      return;
    }

    // if components already exist: reset them
    if (components) {
      components.reset({accessToken});
      return;
    }

    // otherwise create new components
    const unipaasComponents = unipaas.components(accessToken, {
      paymentsEnabled: true,
      theme: {
        boxShadow: "0px 3px 15px rgba(27, 79, 162, 0.11)"
      }
    });

    setComponents(unipaasComponents);
  }, [accessToken, unipaasLoaded, components]);

  // on selected vendor id change: authorize via api
  useEffect(() => {
    if (!selectedVendorId) {
      return;
    }
    authorizeAPI();
  }, [selectedVendorId]);

  // return {postAuthorize, getVendors};

  // return;
};

