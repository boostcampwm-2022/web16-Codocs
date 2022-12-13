import React from 'react';
import styled from 'styled-components';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';
import { useQuery } from 'react-query';

const UserProfile = () => {
  const { data: profile } = useQuery('userProfile', () => fetchDataFromPath('/user/profile'), {
    refetchOnWindowFocus: false,
    suspense: true,
    onError: e => {
      console.log(e);
    },
  });

  return (
    <ProfileWrapper>
      <UserName>{profile.userName}</UserName>
      <ProfileImg src={profile.profileImgURL} alt="사용자 프로필 이미지" />
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50px;
`;

const UserName = styled.span`
  font-size: 1rem;
  font-weight: 300;
  padding: 0.5rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export { UserProfile };
