import React from 'react';
import styled from 'styled-components';
import useProfile from '../../hooks/useProfile';

const UserProfile = () => {
  const { profile } = useProfile();

  return (
    <ProfileWrapper>
      <UserName>{profile.name}</UserName>
      <ProfileImg src={profile.profileURL} alt="사용자 프로필 이미지" />
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
