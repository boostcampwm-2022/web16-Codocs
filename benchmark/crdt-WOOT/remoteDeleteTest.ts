import { CRDT } from "./crdt/crdt";
import Char from "./crdt/char";

interface Template {
  [key: string] : string
}

interface TestType {
  [key: string] : Function
}

const testType: TestType = {
  "DELETE" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc([funcParams]);
  },
}

const calcTimeDiff = (testFunc : any, funcParams: any, time: number, type : string) : string => {
  const startTime = performance.now();
  for (let i = 0; i < time ; i++) {
    testType[type](i, testFunc, funcParams[i]);
  }
  const endTime = performance.now();
  return `${endTime - startTime}ms`;
}

const remoteDeleteBenchmark = (type: string) => {
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
    operationTime = Math.pow(10, i);
    let operationHistory : Char[] = []
    for(let j = 0; j < operationTime; j++) {
        const newChar = crdt.localInsert(0, 'a');
        operationHistory.push({...newChar});
    }
    template[operationTime.toString()] = calcTimeDiff(crdt.remoteDelete.bind(crdt), operationHistory, operationTime, type);
  }
  
  console.table(template);
}

export { remoteDeleteBenchmark };