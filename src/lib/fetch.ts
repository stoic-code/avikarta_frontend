import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type TRequest = {
  endpoint: string;
  token?: string;
  payload?: any;
  params?: any;
};

//get request
export const getRequest = async ({ endpoint, token }: TRequest) => {
  try {
    const res = await axios.get(`${BACKEND_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(`Error in request setup: ${err}`);
  }
};

//post request

export const postRequest = async ({ payload, token, endpoint }: TRequest) => {
  const isFormData = payload instanceof FormData;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await axios.post(
      `${BACKEND_URL}${endpoint}`,
      isFormData ? payload : JSON.stringify(payload),
      {
        headers,
      }
    );

    console.log('axios ko res', res.data);

    return res.data;
  } catch (err: any) {
    console.log('postRequrest ko post ko erorrrrrrrrrr', err.response.data);
    // console.log('postRequrest ko post ko erorrrrrrrrrr', err);

    if (err) {
      if (err.response.data.Error) {
        throw new Error(err.response.data.Error || 'Unknown error occurred');
      }

      if (err.response.data.message) {
        throw new Error(err.response.data.message || 'Unknown error occurred');
      }
    } else {
      console.log('else ko');
      throw new Error('Network Error.');
    }

    // Something happened in setting up the request that triggered an Error
    // throw new Error(`Error in request setup: ${err}`);
  }
};

//delette request
export const deleteRequest = async ({ token, endpoint, payload }: TRequest) => {
  // const res = await fetch(`${BACKEND_URL}${endpoint}`, {
  //   method: 'DELETE',
  //   headers: {
  //
  //     Authorization: `bearer ${token}`,
  //   },
  // });

  // console.log('payloadd', payload);
  try {
    const res = await axios.delete(`${BACKEND_URL}${endpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: payload,
    });

    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log('DeleteRequest err', err);

    if (err) {
      if (err.response.data.Error) {
        throw new Error(err.response.data.Error || 'Network Error.');
      }
      if (err.response.data.message) {
        throw new Error(err.response.data.message || 'Network Error.');
      }
    }
  }
};

//put requrest
export const editRequest = async ({ token, endpoint, payload }: TRequest) => {
  const isFormData = payload instanceof FormData;

  //  const headers: Record<string, string> = {
  //    Authorization: `Bearer ${token}`,
  //  };
  const headers: { [key: string]: string } = {
    Authorization: `bearer ${token}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  // const res = await fetch(`${BACKEND_URL}${endpoint}`, {
  //   headers,
  //   body: isFormData ? payload : JSON.stringify(payload),
  //   method: 'PUT',
  // });
  try {
    const res = await axios.put(
      `${BACKEND_URL}${endpoint}`,
      isFormData ? payload : JSON.stringify(payload),
      {
        headers,
      }
    );

    return res.data;
  } catch (err: any) {
    console.log(err);
    console.log('putRequest ko post ko erorrrrrrrrrr', err.response.data);
    if (err) {
      console.log('vitraaaa');

      throw new Error(err.response.data.Error || 'Unknown error occurred');
    } else {
      console.log('else ko');
      throw new Error('Network Error.');
    }
  }
};
//patch requrest
export const patchRequest = async ({ token, endpoint, payload }: TRequest) => {
  const isFormData = payload instanceof FormData;

  //  const headers: Record<string, string> = {
  //    Authorization: `Bearer ${token}`,
  //  };
  const headers: { [key: string]: string } = {
    Authorization: `bearer ${token}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  // const res = await fetch(`${BACKEND_URL}${endpoint}`, {
  //   headers,
  //   body: isFormData ? payload : JSON.stringify(payload),
  //   method: 'PUT',
  // });
  try {
    const res = await axios.patch(
      `${BACKEND_URL}${endpoint}`,
      isFormData ? payload : JSON.stringify(payload),
      {
        headers,
      }
    );

    return res.data;
  } catch (err: any) {
    console.log('PACTH REQUEST error', err);
    console.log('PATCHRequest ko post ko erorrrrrrrrrr', err.response.data);
    if (err) {
      console.log('vitraaaa');

      //otp error message comes in data.message
      throw new Error(err.response.data.message || 'Unknown error occurred');
    } else {
      console.log('else ko');
      throw new Error('Network Error.');
    }
  }
};
