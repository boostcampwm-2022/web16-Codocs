import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
// import { COLOR_ACTIVE, COLOR_CAUTION } from '../../constants/styled';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { IconButton } from '../iconButton';
import { Modal } from '../modal';
import { ModalForm } from '../modalForm';
import useModal from '../../hooks/useModal';


interface DocListItemProps extends DocListItem {
  bookmarkMutate: MutateProp,
  unbookmarkMutate: MutateProp,
  deleteMutate: MutateProp,
}

const DocListItem = (props: DocListItemProps) => {
  const {bookmarkMutate, unbookmarkMutate, deleteMutate, ...document} = props;
  const {onModal, toggleModal, modalData, setupModalData} = useModal();
  const theme = useTheme();

  const LIST_ITEM_STYLE = {
    fill: theme.gray,
    width: '0.75',
    height: '0.75'
  };

  const getActionHandler = (modalType: string) => {
    switch (modalType) {
      case 'BOOKMARK' :
        return bookmarkMutate;
      case 'UNBOOKMARK' :
        return unbookmarkMutate;
      default: // DELETE
        return deleteMutate;
    }
  };

  const handleDocumentAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const modalType = target.dataset['value'];
    if (!modalType) {
      return;
    }
    setupModalData(
      modalType, 
      () => getActionHandler(modalType)(document.id)
    );
    toggleModal();
  };

  return (
    <ListItemWrapper>
      <Link to={`../${document.id}`}>
        <Title>{document.title}</Title>
        <LowerLayout>
          <DateGroup>
            <DateText>
              최근 방문일: {document.lastVisited.slice(0, 10)}
            </DateText>
            <DateText>
              문서 생성일: {document.createdAt.slice(0, 10)}
            </DateText>
          </DateGroup>
          <IconGroup>
              {document.role === 'owner' && 
                <IconButton
                  {...LIST_ITEM_STYLE}
                  hover={theme.caution}
                  dataset="DELETE"
                  clickHandler={handleDocumentAction}>
                  <TrashIcon />
                </IconButton>
              }
              {document.isBookmarked 
                ? <IconButton
                    {...LIST_ITEM_STYLE}
                    fill={theme.primary}
                    dataset="UNBOOKMARK"
                    clickHandler={handleDocumentAction}>
                    <BookmarkIcon />
                  </IconButton> 
                : <IconButton
                    {...LIST_ITEM_STYLE}
                    hover={theme.primary}
                    dataset="BOOKMARK"
                    clickHandler={handleDocumentAction}>
                    <BookmarkIcon />
                  </IconButton>
              }
          </IconGroup>
        </LowerLayout>
      </Link>
      {onModal &&
        <Modal toggleModal={toggleModal}>
          <ModalForm 
            type={modalData.modalType as string}
            cancelHandler={toggleModal} 
            actionHandler={modalData.actionHandler as WrappedHandler} />
        </Modal>
      }
    </ListItemWrapper>
  );
};

const ListItemWrapper = styled.div`
  width: 15rem;
  height: 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => `0px 4px 4px ${theme.border}`};
`;

const Title = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const LowerLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
`;

const DateGroup = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const DateText = styled.li`
  font-weight: 300;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.gray};
`;

const IconGroup = styled.div`
  display: flex;
  margin: 0;
  gap: 0.4rem;
`;

export { DocListItem };
