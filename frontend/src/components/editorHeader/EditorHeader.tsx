import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SiteLogo } from '../siteLogo';
import useTitle from '../../hooks/useTitle';
import useToast from '../../hooks/useToast';
import { OnlineUser } from '../../components/onlineUser/OnlineUser';

interface EditorHeaderProps {
  titleProp: string;
}

const EditorHeader = ({ titleProp }: EditorHeaderProps) => {
  const { title, onTitleChange, onTitleUpdate, setTitle } = useTitle();
  const { alertToast } = useToast();

  useEffect(() => {
    setTitle(titleProp);
  }, []);

  const handleCopyURL = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alertToast('INFO', '링크 복사 성공! 공유해보세요!');
      })
      .catch(() => {
        alertToast('WARNING', '실패!');
      });
  };

  return (
    <>
      <HeaderContainer>
        <SiteLogo />
        <DocumentTitle
          type="text"
          value={title ?? ''}
          onChange={onTitleChange}
          onBlur={onTitleUpdate}
        />
        <RightButtonWrapper>
          <ShareButton type="button" onClick={handleCopyURL}>
            Share
          </ShareButton>
          <OnlineUser />
        </RightButtonWrapper>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
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

export { EditorHeader };
