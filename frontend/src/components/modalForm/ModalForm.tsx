import React from 'react';
import styled, { useTheme } from 'styled-components';
import MODAL_CONTENT from '../../constants/modalContent';
import { devices } from '../../constants/breakpoints';

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
  width: 30rem;
  min-height: 18rem;
  border-radius: 10px;
  padding: 3rem 2rem;
  margin: 0 auto;
  margin-top: 6rem;
  background-color: ${({ theme }) => theme.gray};

  @media ${devices.mobile} {
    width: 20rem;
    min-height: 16rem;
    padding: 2rem 1rem;
    margin: 0 auto;
    margin-top: 14rem;
  }
`;

const QuestionGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  color: ${({ theme }) => theme.text};

  @media ${devices.mobile} {
    margin: 2rem 0.25rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;

  @media ${devices.mobile} {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const Description = styled.p`
  word-break: break-all;
  margin-top: 1rem;

  @media ${devices.mobile} {
    max-width: 16rem;
    text-align: start;
  }
`;

const AnswerGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`;

const AnswerBtn = styled('button')<AnswerBtnProps>`
  font-size: 1.5rem;
  border-radius: 10px;
  padding: 1rem 4rem;
  color: ${({ theme }) => theme.text};
  background-color: ${(props) => props.backgroundColor};

  @media ${devices.mobile} {
    font-size: 1rem;
    padding: 1rem 2.5rem;
  }
`;

export { ModalForm };
