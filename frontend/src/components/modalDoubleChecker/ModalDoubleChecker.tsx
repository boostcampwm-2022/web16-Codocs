import React from 'react';
import styled from 'styled-components';

interface DoubleCheckerProps {
  modalType: string,
  modalCancelHandler: React.MouseEventHandler
  modalActionHandler: () => void
}

interface CheckerType {
  questionTitle: string,
  questionDescription: string
}

interface CheckerByType {
  [key: string] : CheckerType;
}

interface AnswerBtnProps {
  backgroundColor: string;
}

const ModalDoubleChecker = ({modalType, modalCancelHandler,  modalActionHandler}: DoubleCheckerProps) => {
  const checkerByType: CheckerByType = {
    'DELETE' : {
      questionTitle: '정말로 삭제하시겠습니까?',
      questionDescription: '한 번 삭제한 문서는 복원할 수 없습니다. 그래도 진행하시겠습니까?',
    }, 
    'BOOKMARK': {
      questionTitle: '북마크에 등록하시겠습니까?',
      questionDescription: '등록한 문서는 북마크 페이지에서 확인할 수 있습니다.',
    }
  };

  if (modalType === 'INIT') {
    return <></>;
  } else {
    return (
      <ModalContent>
        <Question>
          <QuestionTitle>
          {checkerByType[modalType].questionTitle}
          </QuestionTitle>
          <QuestionDescription>
            {checkerByType[modalType].questionDescription}
          </QuestionDescription>
        </Question>
        <Answers>
          <AnswerBtn backgroundColor={'#A5A5A5'} onClick={modalCancelHandler}>취소</AnswerBtn>
          <AnswerBtn backgroundColor={'#FF5757'} onClick={(e) => {
            modalActionHandler();
            modalCancelHandler(e);
          }}>확인</AnswerBtn>
        </Answers>
      </ModalContent>
    );
  }
};

const ModalContent = styled.div`
  width: 550px;
  min-height: 450px;
  border-radius: 10px;
  background-color: #DFDFDF;
  padding: 6.5rem 2rem;
  margin: 0 auto;
  margin-top: 4rem;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 4rem 3rem 4rem;
`;

const QuestionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

const QuestionDescription = styled.p`
  max-width: 330px;
  word-break: keep-all;
  margin-top: 0;
`;

const Answers = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AnswerBtn = styled('button')<AnswerBtnProps>`
  font-size: 20px;
  border-radius: 10px;
  padding: 1rem 6rem;
  color: white;
  background-color: ${(props) => props.backgroundColor};
`;

export { ModalDoubleChecker };
