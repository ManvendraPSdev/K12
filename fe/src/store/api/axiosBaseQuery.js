import apiClient from '../../services/apiClient';

/**
 * Custom Axios Base Query for RTK Query.
 * Integrates RTK Query caching & lifecycle with our central Axios instance.
 */
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const response = await apiClient({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      // Backend returns { success: true, message: string, data: { ... } }
      return { data: response.data.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data?.message || err.message,
          data: err.response?.data,
        },
      };
    }
  };
