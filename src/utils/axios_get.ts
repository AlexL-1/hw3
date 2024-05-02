import axios from "axios";

export type BaseResponse<T> =
  | {
      data: T;
      isError: false;
    }
  | {
      isError: true;
    };

type RequestParams = {
  url: string;
  params?: Record<string, string | number>;
};

export const makeGetRequest = async <T>({
  url,
  params,
}: RequestParams): Promise<BaseResponse<T>> => {
  try {
    const response = await axios.get(url, {
      params: params,
    });

    if (response.status === 200) {
      return {
        data: response.data,
        isError: false,
      };
    }
    return {
      isError: true,
    };
  } catch {
    return { isError: true };
  }
};
