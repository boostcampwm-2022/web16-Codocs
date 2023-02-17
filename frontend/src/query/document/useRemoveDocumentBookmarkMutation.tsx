import { useQueryClient, useMutation } from 'react-query';
import useToast from '../../hooks/useToast';

const { REACT_APP_API_URL } = process.env;

const useRemoveDocumentBookmarkMutation = (documentType: string) => {
  const { alertToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation((id: string) => {
      return fetch(`${REACT_APP_API_URL}/user-document/${id}/unbookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(documentType);
        alertToast('INFO', '북마크를 해제했습니다.');
      },
      onError: () => {
        alertToast('WARNING', '북마크 해제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  );
};

export default useRemoveDocumentBookmarkMutation;
