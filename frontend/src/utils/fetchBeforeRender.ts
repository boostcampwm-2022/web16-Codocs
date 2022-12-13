import { worker } from '../mocks/worker';
const { REACT_APP_NODE_ENV, NODE_ENV } = process.env;

let requestDomain: string;

if (REACT_APP_NODE_ENV === 'mock') {
  worker.start({
    onUnhandledRequest: 'bypass'
  });
  requestDomain = 'http://localhost:3000';
} else if (REACT_APP_NODE_ENV === 'test') {
  requestDomain = 'http://localhost:3000';
} else if (REACT_APP_NODE_ENV === 'development') {
  requestDomain = 'http://localhost:8000';
} else {
  requestDomain = 'http://www.codocs.site/api';
}
console.log(REACT_APP_NODE_ENV);
console.log(requestDomain);
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
    return data;
  } catch (err) {
    throw new Error('Fail to fetch Data! Please report it to our GitHub.');
  }
};

export { fetchDataFromPath };
