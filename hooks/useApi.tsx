import React from "react";
import axios from "axios";
import { useStore } from "@/hooks/useStore";

export interface PostAuthorizePayload {
  vendorId?: string;
}

export const useApi = (baseURL: string) => {
  const [privateKey, setPrivateKey] = useStore('privateKey');

  const postAuthorize = async (payload: PostAuthorizePayload) => {
    const response = await axios.post<{accessToken: string}>(`${baseURL}/platform/authorize`, {
      ...payload,
      "scopes": [
        'master', // todo specifiec scopes (pay portal and onboarding)

        // invoice component
        'invoice_read',
        'invoice_write',
      ],

    }, {
      headers: {"Authorization": `Bearer ${privateKey}`},
    });
    const {data} = response || {};
    return data;
  }

  const getVendors = async () => {
    const response = await axios.get(`${baseURL}/platform/vendors`, {
      headers: {"Authorization": `Bearer ${privateKey}`},
    });
    const {data} = response || {};
    return data;
  }

  return {postAuthorize, getVendors};
};

