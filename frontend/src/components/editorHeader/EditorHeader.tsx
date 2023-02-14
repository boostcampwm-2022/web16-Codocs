import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useToast from '../../hooks/useToast';
import { SiteLogo } from '../siteLogo';
import { OnlineUser } from '../onlineUser/OnlineUser';

const EditorHeader = ({ fetchedTitle }: {fetchedTitle: string}) => {
  const { documentTitle, setDocumentTitle, updateDocumentTitle } = useDocumentTitle(fetchedTitle);
  const { document_id } = useParams();
  const { alertToast } = useToast();

  const handleCopyURL = () => {
    const document_URL = window.location.href;
    navigator.clipboard
      .writeText(document_URL)
      .then(() => alertToast('INFO', '링크를 복사했어요! 공유해보세요!'))
      .catch(() => alertToast('WARNING', '링크 복사에 실패했어요!'));
  };

  const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  const handleTitleUpdate = () => {
    updateDocumentTitle(String(document_id));
  };

  return (
    <>
      <HeaderContainer>
        <SiteLogo />
        <DocumentTitle
          type="text"
          value={documentTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleUpdate}
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
height: 1.5rem;
  width: 9rem;
  gap: 0.5rem;
  display: flex;
  align-items: center;
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
