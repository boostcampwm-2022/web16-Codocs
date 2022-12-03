import { CRDT } from "./crdt/crdt";

interface Template {
  [key: string] : string
}

interface TestType {
  [key: string] : Function
}

const testType: TestType = {
  "BEST" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc(index*funcParams[0].length, ...funcParams);
  },
  "WORST" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc(0, ...funcParams);
  },
  "RANDOM" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc(Math.floor(Math.random() * (index + 1)) * funcParams[0].length, ...funcParams);
  }
}

const calcTimeDiff = (testFunc : any, funcParams: any[], time: number, type : string) : string => {
  const startTime = performance.now();
  for (let i = 0; i < time ; i++) {
    testType[type](i, testFunc, funcParams);
  }
  const endTime = performance.now();
  return `${endTime - startTime}ms`;
}

const localInsertRangeBenchmark = (type : string) => {
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
    template[operationTime.toString()] = calcTimeDiff(crdt.localInsertRange.bind(crdt), ["012"], operationTime, type);
  }
  
  console.table(template);
}

export { localInsertRangeBenchmark };