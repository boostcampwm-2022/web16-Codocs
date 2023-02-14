import React from 'react';
import styled from 'styled-components';
import MODAL_CONTENT from '../../constants/modalContent';

interface ModalFormProps {
  type: string;
  actionHandler: () => void;
  cancelHandler: (state: boolean) => void;
}

interface AnswerBtnProps {
  backgroundColor: string;
}

const ModalForm = ({type, actionHandler, cancelHandler}: ModalFormProps) => {

  return (
    <ModalFormWrapper>
      <QuestionGroup>
        <Title>{MODAL_CONTENT[type].title}</Title>
        <Description>{MODAL_CONTENT[type].description}</Description>
      </QuestionGroup>
      <AnswerGroup>
        <AnswerBtn 
          backgroundColor={'#A5A5A5'} 
          onClick={() => cancelHandler(false)}>
          취소
        </AnswerBtn>
        <AnswerBtn
          backgroundColor={'#FF5757'}
          onClick={() => {
            actionHandler();
            cancelHandler(false);
          }}>
          확인
        </AnswerBtn>
      </AnswerGroup>
    </ModalFormWrapper>
  );
};

const ModalFormWrapper = styled.form`
  width: 550px;
  min-height: 450px;
  border-radius: 10px;
  background-color: #dfdfdf;
  padding: 3rem 2rem;
  margin: 0 auto;
  margin-top: 4rem;
`;

const QuestionGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 4rem;
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
`;

const AnswerBtn = styled('button')<AnswerBtnProps>`
  font-size: 20px;
  border-radius: 10px;
  padding: 1rem 6rem;
  color: white;
  background-color: ${(props) => props.backgroundColor};
`;

export { ModalForm };
