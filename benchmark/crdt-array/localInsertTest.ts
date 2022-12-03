import { CRDT } from "./crdt/crdt";

interface Template {
  [key: string] : string
}

interface TestType {
  [key: string] : Function
}


const testType: TestType = {
  "BEST" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc(index, ...funcParams);
  },
  "WORST" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc(0, ...funcParams);
  },
  "RANDOM" : (index: number, testFunc : any, funcParams: any[]) => {
    testFunc(Math.floor(Math.random() * (index + 1)), ...funcParams);
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

const localInsertBenchmark = (type : string) => {
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
    template[operationTime.toString()] = calcTimeDiff(crdt.localInsert.bind(crdt), ["a"], operationTime, type);
  }
  
  console.table(template);
}

export { localInsertBenchmark };
