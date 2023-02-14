export interface QUESTION_MAP {
  title: string;
  description: string;
}

export interface TYPE_QUESTION_MAP {
  [key: string] : QUESTION_MAP;
}

const MODAL_CONTENT: TYPE_QUESTION_MAP = {
  'DELETE': {
    title: '정말로 삭제하시겠습니까?',
    description: '한 번 삭제한 문서는 복원할 수 없습니다. 그래도 진행하시겠습니까?'
  },
  'BOOKMARK': {
    title: '북마크에 등록하시겠습니까?',
    description: '등록한 문서는 북마크 페이지에서 확인할 수 있습니다.'
  },
  'UNBOOKMARK': {
    title: '북마크를 해제하시겠습니까?',
    description: '북마크를 해제해도 다시 북마크할 수 있습니다.'
  }
};

export default MODAL_CONTENT;
