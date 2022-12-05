import { worker } from '../mocks/worker';

let requestDomain = 'http://localhost:3000';

if (process.env.NODE_ENV === 'development') {
  worker.start();
} else {
  requestDomain = '';
}

interface Response<T> {
  status: 'success' | 'pending' | 'error';
  data: T | null;
}

const response: Response<unknown> = {
  status: 'pending',
  data: null
};

export function wrapPromise<T>(promise: Promise<T>) {
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
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
    return wrapPromise(data);
  } catch (err) {
    throw new Error('Fail to fetch Data! Please report it to our GitHub.');
  }
};

export { fetchDataFromPath };


