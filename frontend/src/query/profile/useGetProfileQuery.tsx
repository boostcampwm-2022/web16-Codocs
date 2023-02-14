import { useQuery } from 'react-query';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';

const { REACT_APP_API_URL } = process.env;

const useGetProfileQuery = () => {
  return useQuery(
    ['userProfile'],
    () => fetchDataFromPath(`${REACT_APP_API_URL}/user/profile`),
    {
      cacheTime: Infinity,
      suspense: true,
    }
  );
};

export default useGetProfileQuery;
