import React from "react";
import axios from "axios";

export interface PostAuthorizePayload {
  vendorId?: string;
}

export const useApi = (baseURL: string, privateKey: string) => {
  const postAuthorize = async (payload: PostAuthorizePayload) => {
    const response = await axios.post<{accessToken: string}>(`${baseURL}/platform/authorize`, {
      ...payload,
      "scopes": ['master'],

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

