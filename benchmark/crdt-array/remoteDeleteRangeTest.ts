import { CRDT } from "./crdt/crdt";

interface Template {
  [key: string] : string
}

interface TestType {
  [key: string] : Function
}

const testType: TestType = {
  "DELETE" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc(funcParams);
  },
}

const calcTimeDiff = (testFunc : any, funcParams: any, time: number, type : string) : string => {
  const startTime = performance.now();
  testType[type](0, testFunc, funcParams);
  const endTime = performance.now();
  return `${endTime - startTime}ms`;
}

const remoteDeleteRangeBenchmark = (type: string) => {
  const template : Template = {
    '10' : "",
    '100' : "",
    '1000' : "",
    '10000' : "",
  };

  let crdt;
  let operationTime;
  let caseLength = Object.keys(template).length;
  
  for (let i = 1; i <= caseLength; i++) {
    crdt = new CRDT();
    const crdtOthers = new CRDT();
    operationTime = Math.pow(10, i);
    for(let j = 0; j < operationTime; j++) {
        crdt.localInsert(0, 'a');
        crdtOthers.localInsert(0, 'a');
    }
    let operationHistory = crdtOthers.localDelete(0, operationTime);
    
    template[operationTime.toString()] = calcTimeDiff(crdt.remoteDeleteRange.bind(crdt), operationHistory, operationTime, type);
  }
  
  console.table(template);
}

export { remoteDeleteRangeBenchmark };