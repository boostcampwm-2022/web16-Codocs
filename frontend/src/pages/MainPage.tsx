import React, { useState, useEffect } from 'react';
import { DocListItem } from '../components/docListItem';

interface docListItemState {
  id: string
  title: string
  lastVisited: string
  role: string,
}

const MainPage = () => {
  const [docList, setDocList] = useState<docListItemState[]>([]);

  useEffect(() => {
    const fetchDocList = async () => {
      // TODO : request docList from API server
      return new Promise((resolve) => {
        resolve(setDocList(() => [{id:'1234',
          title: '알고리즘 스터디 기록',
          lastVisited: '2022-11-10',
          role: 'onwer',  
        }, {id:'5678',
          title: 'Untitled',
          lastVisited: '2022-11-19',
          role: 'edit'}]));
      });
    };
    fetchDocList();
  }, []);

  return (
    <div>
      {docList.length ? docList.map(doc => {
        return <DocListItem key={doc.id} title={doc.title} lastVisited={doc.lastVisited} role={doc.role}></DocListItem>;
      }) : <div>...loading</div>}
    </div>
  );
};

export default MainPage;