import { worker } from '../mocks/worker';
const { REACT_APP_NODE_ENV, REACT_APP_API_URL } = process.env;

if (REACT_APP_NODE_ENV === 'mock') {
  worker.start({
    onUnhandledRequest: 'bypass'
  });
}

const fetchDataFromPath = (path: string) => {
  try {
    const data = fetch(`${REACT_APP_API_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then((response) => response.json());
    return data;
  } catch (err) {
    throw new Error('Fail to fetch Data! Please report it to our GitHub.');
  }
};

export { fetchDataFromPath };
