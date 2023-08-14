import React, { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import { useApi } from "@/hooks/useApi";
import { mountScript, useSdk } from "@/hooks/useSdk";
import { useEnvironmentKeys } from "@/hooks/useEnvironmentKeys";

export const useAppInit = () => {
  const [selectedVendorId, setSelectedVendorId] = useStore('selectedVendorId');
  const [vendors, setVendors] = useStore('vendors');
  const [privateKey, setPrivateKey] = useStore('privateKey');
  const [accessToken, setAccessToken] = useStore('accessToken');
  const [unipaasLoaded, setUnipaasLoaded] = useStore('unipaasLoaded');
  const [components, setComponents] = useStore('components');
  const [environment, setEnvironment] = useStore('environment');
  const environmentKeys = useEnvironmentKeys();
  const {scriptSrc, baseURL} = environmentKeys;
  const {postAuthorize, getVendors} = useApi(baseURL);
  const [isFirstRender, setIsFirstRender] = React.useState(true);



  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
  }, [isFirstRender]);


  // 1. on environment change: mount unipaas script
  useEffect(() => {
    console.log('environment changed to', environment, ' baseURL ', baseURL);
    setUnipaasLoaded(false);

    // @ts-ignore
    console.log('window.unipaas.apiBaseUrl 1', window?.unipaas?.apiBaseUrl)

    mountScript("unipaas-script", scriptSrc, () => setUnipaasLoaded(true));

    // @ts-ignore
    console.log('window.unipaas.apiBaseUrl 2', window?.unipaas?.apiBaseUrl)


    console.log('setting key', environmentKeys.privateKey, ' for env ', environment)
    setPrivateKey(environmentKeys.privateKey); // set privateKey from env keys (if available)
    // if (isFirstRender) {
    //   return;
    // }
    //
    // // todo reset all states that are being set below
    // setVendors(null); // 2
    // setPrivateKey(null); // 2
    // setAccessToken(null); // 3
    // setComponents(null); // 4
  }, [environment]);


  // 2. on private key change load vendors. sets vendors
  useEffect(() => {
    if (!privateKey) {
      return;
    }

    console.log('private key changed: ', privateKey, 'loading vendors')

    getVendors().then((vendors) => {
      setVendors(vendors);
    }).catch((error) => {
      console.error('GET /vendors failed', error);
    });
  }, [privateKey]);

  // 3. on selected vendor id change: authorize via api. sets access token
  useEffect(() => {
    if (!selectedVendorId) {
      return;
    }
    // authorizeAPI();

    const data = postAuthorize({
      ...(selectedVendorId && {vendorId: selectedVendorId}),
    }).then(res => {
      setAccessToken(res?.accessToken);
    })
  }, [selectedVendorId]);

  // 4. on access token change: create components. sets components
  useEffect(() => {
    // make sure unipaas is loaded and we have an access token
    if (!accessToken) {
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
      console.log('resetting components');
      components.reset({accessToken});
      return;
    }

    console.log('creating components');
    // otherwise create new components
    const unipaasComponents = unipaas.components(accessToken, {
      paymentsEnabled: true,
      theme: {
        boxShadow: "0px 3px 15px rgba(27, 79, 162, 0.11)"
      }
    });

    setComponents(unipaasComponents);
  }, [accessToken]);


};

