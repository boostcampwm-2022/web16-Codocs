import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useToast from '../../hooks/useToast';
import { SiteLogo } from '../siteLogo';
import { OnlineUser } from '../onlineUser/OnlineUser';
import { devices } from '../../constants/breakpoints';

const EditorHeader = ({ fetchedTitle }: {fetchedTitle: string}) => {
  const { documentTitle, setDocumentTitle, updateDocumentTitle } = useDocumentTitle(fetchedTitle);
  const { document_id } = useParams();
  const { alertToast } = useToast();

  const handleCopyURL = () => {
    const document_URL = window.location.href;
    navigator.clipboard
      .writeText(document_URL)
      .then(() => alertToast('INFO', '링크를 복사했어요!'))
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
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DocumentTitle = styled.input`
  width: 12rem;
  font-weight: 200;
  font-size: 1.5rem;
  line-height: 1.75rem;
  text-align: center;
  border: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};

  :hover, :focus {
    border: 1px solid;
    border-color: ${({ theme }) => theme.primary};
  }

  @media ${devices.mobile} {
    width: 10rem;
    margin-left: 2rem;
  }
`;

const RightButtonWrapper = styled.div`
  gap: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ShareButton = styled.button`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  background: ${({ theme }) => theme.primary};;
  color: ${({ theme }) => theme.white};

  @media ${devices.mobile} {
    font-weight: 400;
    padding: 0.5rem;
  }
`;

export { EditorHeader };
