import { useRecoilState } from 'recoil';
import profileState from '../atoms/profileAtom';
import { useQuery } from 'react-query';
import { fetchDataFromPath } from '../utils/fetchBeforeRender';

const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  useQuery('userProfile', () => fetchDataFromPath('/user/profile'), {
    refetchOnWindowFocus: false,
    suspense: true,
    onSuccess: (response) => {
      setProfile({
        ...profile,
        name: response.name,
        profileURL: response.profileURL
      });
    },
    onError: (e) => {
      console.log(e);
    }
  });

  return {
    profile,
    setProfile
  };
};

export default useProfile;
