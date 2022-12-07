import React, { useState } from 'react';

const useTitle = (initTitle: string) => {
  const [title, setTitle] = useState<string>(initTitle);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return {
    title,
    onTitleChange
  };
};

export default useTitle;
