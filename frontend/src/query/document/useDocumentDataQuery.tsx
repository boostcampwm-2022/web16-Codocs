import { useQuery } from 'react-query';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';

const { REACT_APP_API_URL } = process.env;

const useDocumentDataQuery = (documentId: string) => {
  return useQuery(
    [documentId],
    () => fetchDataFromPath(`${REACT_APP_API_URL}/document/${documentId}`),
    {
      cacheTime: 0,
      suspense: true,
    }
  );
};

export default useDocumentDataQuery;
