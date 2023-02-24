import { useSetRecoilState } from 'recoil';
import { toastMsgState } from '../atoms/toastMsgAtom';

const useToast = () => {
  const setToastMsg = useSetRecoilState(toastMsgState);

  const alertToast = (type: string, msg: string) => {
    setToastMsg({
      type,
      msg,
      key: +new Date(),
    });
  };

  return {
    alertToast
  };
};

export default useToast;
