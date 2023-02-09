import { useQuery } from 'react-query';
import useToast from '../../hooks/useToast';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';

const { REACT_APP_API_URL } = process.env;

const useGetDocumentMutation = (documentType: string) => {
  const { alertToast } = useToast();

  return useQuery(
    [documentType],
    () => fetchDataFromPath(`${REACT_APP_API_URL}/user-document/${documentType}`),
    {
      suspense: true,
      onError: () => {
        alertToast('WARNING', '문서 목록을 가져오지 못했습니다. 다시 시도해주세요.');
      }
    }
  );
};

export default useGetDocumentMutation;
