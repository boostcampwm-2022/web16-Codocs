import React from 'react';
import styled from 'styled-components';
import { SiteLogo } from '../siteLogo';
import useTitle from '../../hooks/useTitle';

const EditorHeader = () => {
  const { title, onTitleChange } = useTitle('Untitled');
  const copyURLPath = () => {
    try {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => alert('주소가 복사되었습니다.\n문서를 다른 사람에게 공유해보세요!'));
    } catch (e) {
      alert('주소 복사에 실패했어요 ㅠㅠ');
    }
  };

  return (
    <>
      <HeaderContainer>
        <SiteLogo />
        <DocumentTitle type="text" value={title} onChange={onTitleChange} />
        <RightButtonWrapper>
          <ShareButton type="button" onClick={copyURLPath}>
            Share
          </ShareButton>
          <Peer>3</Peer>
        </RightButtonWrapper>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  width: 100vw;
  height: 5vh;
  padding: 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DocumentTitle = styled.input`
  width: 16rem;
  font-weight: 200;
  font-size: 24px;
  line-height: 29px;
  text-align: center;

  border: none;

  :focus {
    border: 1px solid #222222;
  }

  :hover {
    border: 1px solid #3a7dff;
  }
`;

const RightButtonWrapper = styled.div`
  width: 9rem;
  height: 1.5rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ShareButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: #3a7dff;
  border-radius: 10px;

  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1rem;
  color: #ffffff;
`;

const Peer = styled.div`
  width: 2.75rem;
`;

export { EditorHeader };
