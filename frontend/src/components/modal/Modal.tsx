import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom';

interface DimmedProps {
  isVisible: boolean;
}

interface AnswerBtnProps {
  backgroundColor: string;
}

const Modal = () => {
  const [isVisible, setIsVisible] = useRecoilState(modalState);
  const dimmedRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (e.target === dimmedRef.current) {
      setIsVisible(false);
      console.log(isVisible);
    }
  };

  return (
      <Dimmed ref={dimmedRef} isVisible={isVisible} onClick={handleCloseModal}>
        <ModalContent>
          <Question>
            <QuestionTitle>
            정말로 삭제하시겠습니까?
            </QuestionTitle>
            <QuestionDescribtion>
              한 번 삭제한 문서는 복구할 수 없습니다.
              그래도 진행하시겠습니까?
            </QuestionDescribtion>
          </Question>
          <Answers>
            <AnswerBtn backgroundColor={'#A5A5A5'}>취소</AnswerBtn>
            <AnswerBtn backgroundColor={'#FF5757'}>확인</AnswerBtn>
          </Answers>
        </ModalContent>
      </Dimmed>
  );
};

const Dimmed = styled('div')<DimmedProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(30, 30, 30, 0.9);
  z-index: 1000;
  visibility: ${(props) => props.isVisible ? 'visible': 'hidden'};
`;

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

const QuestionDescribtion = styled.p`
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

export default Modal;
