import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/products`;

export const createProduct = async (params: {
  token: string;
  formData: FormData;
}) =>
  (await axios.post(url, params.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      Authorization: `Bearer ${params.token}`,
    },
  })) as unknown as AxiosResponse<Objects.Product>;

export const getOwnerProducts = async (params: { token: string }) =>
  (await axios({
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'GET',
    url: `${url}/owners`,
  })) as unknown as AxiosResponse<Objects.Product[]>;

export const getProduct = async (id: number) =>
  (await axios({
    method: 'GET',
    url: `${url}/${id}`,
  })) as unknown as AxiosResponse<Objects.Product>;

export const getProducts = async () =>
  (await axios({
    method: 'GET',
    url: `${url}?status=unsold`,
  })) as unknown as AxiosResponse<Objects.Product[]>;

export const deleteProduct = async (id: number) =>
  (await axios({
    method: 'DELETE',
    url: `${url}/${id}`,
  })) as unknown as AxiosResponse<Objects.Product>;

// export const createProduct = async (params: {
//   token: string;
//   formData: FormData;
// }) => {
//   const { token, formData } = params;

//   // return (await axios({
//   //   url: `${host}`,
//   //   method: 'POST',
//   //   headers: {
//   //     Authorization: `Bearer ${token}`,
//   //   },
//   //   data,
//   // })) as unknown as AxiosResponse<ICreateProductResponse>;

//   return (await axios.post(url, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`,
//     },
//   })) as unknown as AxiosResponse<ICreateProductResponse>;
// };

// Product Offer API
export const createProductOffer = async (params: {
  token: string;
  productId: number;
  price: number;
}) => {
  const { token, productId, price } = params;

  return (await axios({
    data: {
      price,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    url: `${url}/${productId}/offers`,
  })) as unknown as AxiosResponse<Objects.ProductOffer>;
};

export const updateProductOffer = async (params: {
  token: string;
  productId: number;
  productOfferId: number;
  status: string;
}) => {
  const { token, productId, productOfferId, status } = params;

  return (await axios({
    data: {
      status,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    url: `${url}/${productId}/offers/${productOfferId}`,
  })) as unknown as AxiosResponse<Objects.ProductOffer>;
};

// Bidder Setup API
export const createProductBidderSetup = async (params: {
  token: string;
  productId: number;
  location: string;
  latitude: string;
  longitude: string;
  date: string;
  time: string;
  mop: string;
}) => {
  const { token, productId, ...data } = params;

  return (await axios({
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    url: `${url}/${productId}/bidderSetups`,
  })) as unknown as AxiosResponse<Objects.BidderSetup>;
};

export const updateProductBidderSetup = async (params: {
  token: string;
  productId: number;
  bidderSetupId: number;
  address?: {
    location?: string;
    latitude?: string;
    longitude?: string;
  };
  date?: string;
  time?: string;
  mop?: string;
}) => {
  const { token, productId, bidderSetupId, ...data } = params;

  return (await axios({
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    url: `${url}/${productId}/bidderSetups/${bidderSetupId}`,
  })) as unknown as AxiosResponse<Objects.BidderSetup>;
};

// Review API
export const createProductReview = async (params: {
  token: string;
  productId: number;
  rate: string;
  feedback: string;
}) => {
  const { token, rate, feedback, productId } = params;

  return (await axios({
    data: {
      feedback,
      rate,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    url: `${url}/${productId}/reviews`,
  })) as unknown as AxiosResponse<Objects.Review>;
};
