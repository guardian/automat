import { useState, useEffect } from 'react';
import { checkForErrors } from '../utils/checkForErrors';

// Not meant to be an exhaustive type definition of the fetch API,
// just a starting point to get us going on 99% of our possible use cases
interface FetchOptions {
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
  headers?: {
    'Content-Type': 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';
  };
  body?: string;
}

const callApi = (url: string, options?: FetchOptions) => {
  return fetch(url, options)
    .then(checkForErrors)
    .then((response) => response.json());
};

interface ApiResponse<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}

export const useApi = <T>(endpointUrl: string, options?: FetchOptions, prefixAutomat = true): ApiResponse<T> => {
  const [request, setRequest] = useState<{
    loading: boolean;
    data?: T;
    error?: Error;
  }>({
    loading: true,
  });

  const apiPrefix = process.env.REACT_APP_AUTOMAT_API_URL;
  const apiUrl = prefixAutomat && apiPrefix ? `${apiPrefix}${endpointUrl}` : endpointUrl;
  useEffect(() => {
    callApi(apiUrl, options)
      .then((data) => {
        setRequest({
          data,
          loading: false,
        });
      })
      .catch((error) => {
        setRequest({
          error,
          loading: false,
        });
      });
  }, [apiUrl, options]);

  return request;
};
