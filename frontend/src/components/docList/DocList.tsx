import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';

const DocList = () => {
  const [docList, setDocList] = useState<DocListItem[]>([]);

  useEffect(() => {
    const fetchDocList = async () => {
      try {
        const response = await fetch('/document/main');
        const data = await response.json();
        setDocList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDocList();
  }, []);

  return (<DocListWrapper>
    {docList.length > 0 ? docList.map(doc => {
      return <DocListItem key={doc.id} id={doc.id} title={doc.title} lastVisited={doc.lastVisited} role={doc.role}></DocListItem>;
    }) : 
      <div> 문서가 존재하지 않습니다 😥 </div>
    }
  </DocListWrapper>);
};

const DocListWrapper = styled.section`
  display: grid; 
  grid-auto-flow: column;
`;

export { DocList };