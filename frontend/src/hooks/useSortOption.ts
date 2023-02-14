import { useState } from 'react';

interface OptionMap {
  [key: string] : string
}

const useSortOption = (initialOption: string) => {
  const [option, setOption] = useState<string>(initialOption);
  const optionList: OptionMap = {
    'lastVisited': '최근 방문순',
    'title': '제목순',
    'createdAt': '생성일순'
  };

  return { option, optionList, setOption };
};

export default useSortOption;
