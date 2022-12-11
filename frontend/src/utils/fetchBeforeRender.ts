import { worker } from '../mocks/worker';
const { REACT_APP_NODE_ENV, NODE_ENV } = process.env;

let requestDomain: string;

if (REACT_APP_NODE_ENV === 'mock') {
  worker.start();
  requestDomain = 'http://localhost:3000';
} else if (NODE_ENV === 'test') {
  requestDomain = 'http://localhost:3000';
} else if (NODE_ENV === 'development') {
  requestDomain = 'http://localhost:8000';
} else if (NODE_ENV === 'production') {
  requestDomain = '';
} 

interface Response<T> {
  status: 'success' | 'pending' | 'error';
  data: T | null;
}

export function wrapPromise<T>(promise: Promise<T>, path: string) {
  const response: Response<unknown> = {
    status: 'pending',
    data: null
  };

  const suspender = promise.then(
    (res) => {
      response.status = 'success';
      response.data = res;
    },
    (error) => {
      response.status = 'error';
      response.data = error;
    }
  );

  const read = () => {
    switch (response.status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response.data as T;
      default:
        return response.data as T;
    }
  };

  return { read };
}

const fetchDataFromPath = (path: string) => {
  console.log(`${requestDomain}${path}`);
  try {
    const data = fetch(`${requestDomain}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then((response) => response.json());
    return wrapPromise(data, path);
  } catch (err) {
    throw new Error('Fail to fetch Data! Please report it to our GitHub.');
  }
};

export { fetchDataFromPath };
