import { ACCESS_KEY } from '../../../config';
const baseURL = 'https://api.unsplash.com';

const commonOptions = {
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
    'Accept-Version': 'v1',
  },
};

export const getPhotos = async (params) => {
  const options = {
    method: 'GET',
    ...commonOptions,
  };

  const res = await fetch(`${baseURL}/photos/random/?${appendParams(params)}`, options);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

export const searchPhotos = async (params) => {
  const options = {
    method: 'GET',
    ...commonOptions,
  };
  const res = await fetch(`${baseURL}/search/photos/?${appendParams(params)}`, options);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

export const getPhoto = async (id) => {
  const options = {
    method: 'GET',
    ...commonOptions,
  };

  const res = await fetch(`${baseURL}/photos/${id}`, options);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

const appendParams = (params) => {
  return params ? new URLSearchParams(params).toString() : '';
};
