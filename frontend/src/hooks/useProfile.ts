import { useRecoilState } from 'recoil';
import profileState from '../atoms/profileAtom';
const useProfile = () => {
  const [profile] = useRecoilState(profileState);

  return {
    profile
  };
};

export default useProfile;
