import { useQueryClient, useMutation } from 'react-query';
import useToast from '../../hooks/useToast';

const { REACT_APP_API_URL } = process.env;

const useDeleteDocumentMutation = (documentType: string) => {
  const { alertToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation((id: string) => {
      return fetch(`${REACT_APP_API_URL}/document/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(documentType);
        alertToast('INFO', '성공적으로 삭제했습니다.');
      },
      onError: () => {
        alertToast('WARNING', '문서 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  );
};

export default useDeleteDocumentMutation;
