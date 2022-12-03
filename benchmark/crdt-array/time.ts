import { CRDT } from "./crdt/crdt";

const calcTimeDiff = (testFunc : any, funcParams: any[], time: number, isStable : boolean) : string => {
  const startTime = performance.now();
  for (let i = 0; i < time ; i++) {
    if (isStable) {
      testFunc(i, ...funcParams);
    }else {
      testFunc(...funcParams);
    }
  }
  const endTime = performance.now();
  return `${endTime - startTime}ms`;
}

const localInsertTestSequence = () => {
  const template = {
    op_10 : "",
    op_100 : "",
    op_1000 : "",
    op_10000 : "",
    op_100000 : "",
  };

  let crdt = new CRDT();
  template.op_10 = calcTimeDiff(crdt.localInsert.bind(crdt), ["a"], 10, true);

  crdt = new CRDT();
  template.op_100 = calcTimeDiff(crdt.localInsert.bind(crdt), ["a"], 100, true);

  crdt = new CRDT();
  template.op_1000 = calcTimeDiff(crdt.localInsert.bind(crdt), ["a"], 1000, true);

  crdt = new CRDT();
  template.op_10000 = calcTimeDiff(crdt.localInsert.bind(crdt), ["a"], 10000, true);

  crdt = new CRDT();
  template.op_100000 = calcTimeDiff(crdt.localInsert.bind(crdt), ["a"], 100000, true);
  
  console.table(template);
}

localInsertTestSequence();


