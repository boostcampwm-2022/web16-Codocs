import React from 'react';
import styled, { useTheme } from 'styled-components';
import MODAL_CONTENT from '../../constants/modalContent';

interface ModalFormProps {
  type: string;
  actionHandler: () => void;
  cancelHandler: () => void;
}

interface AnswerBtnProps {
  backgroundColor: string;
}

const ModalForm = ({type, actionHandler, cancelHandler}: ModalFormProps) => {
  const theme = useTheme();

  return (
    <ModalFormWrapper>
      <QuestionGroup>
        <Title>{MODAL_CONTENT[type].title}</Title>
        <Description>{MODAL_CONTENT[type].description}</Description>
      </QuestionGroup>
      <AnswerGroup>
        <AnswerBtn 
          backgroundColor={theme.border} 
          onClick={cancelHandler}>
          취소
        </AnswerBtn>
        <AnswerBtn
          backgroundColor={theme.caution}
          onClick={actionHandler}>
          확인
        </AnswerBtn>
      </AnswerGroup>
    </ModalFormWrapper>
  );
};

const ModalFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 550px;
  min-height: 300px;
  border-radius: 10px;
  padding: 3rem 2rem;
  margin: 0 auto;
  margin-top: 4rem;
  background-color: ${({ theme }) => theme.gray};
`;

const QuestionGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 4rem;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

const Description = styled.p`
  max-width: 330px;
  word-break: keep-all;
  margin-top: 0;
`;

const AnswerGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const AnswerBtn = styled('button')<AnswerBtnProps>`
  font-size: 1.5rem;
  border-radius: 10px;
  padding: 1rem 6rem;
  color: ${({ theme }) => theme.text};
  background-color: ${(props) => props.backgroundColor};
`;

export { ModalForm };
