import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';

const DocList = () => {
  const [docList, setDocList] = useState<DocListItem[]>([]);

  useEffect(() => {
    const fetchDocList = async () => {
      // try {
      // const response = await fetch('/document/main');
      // const data = await response.json();
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
      // setDocList(data);
      // } catch (err) {
      //   console.log(err);
      // }
    };
    fetchDocList();
  }, []);

  return (<div>
    {docList.length && docList.map(doc => {
      return <DocListItem key={doc.id} id={doc.id} title={doc.title} lastVisited={doc.lastVisited} role={doc.role}></DocListItem>;
    })}
  </div>);
};

export { DocList };