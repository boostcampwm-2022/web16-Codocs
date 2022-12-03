import { CRDT } from "./crdt/crdt";

interface Template {
  [key: string] : string
}

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

const localInsertBestCase = () => {
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
    template[operationTime.toString()] = calcTimeDiff(crdt.localInsert.bind(crdt), ["a"], operationTime, true);
  }
  
  console.table(template);
}

const localInsertWorstCase = () => {
  const template: Template = {
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
    template[operationTime.toString()] = calcTimeDiff(crdt.localInsert.bind(crdt), [0, "a"], operationTime, false)
  }
  
  console.table(template);
}

const localInsertTestCase  = {
  "BEST": () => {
    localInsertBestCase();
  },
  "WORST" : () => {
    localInsertWorstCase();
  },
  "RANDOM" : () => {
    // localInsertRandomCase();
  }
}

console.log("**1. LocalInsert 벤치마크**");
console.log("1) 모든 입력이 Best하게 들어갈 경우");
localInsertTestCase["BEST"]();

console.log("2) 모든 입력이 Worst하게 들어갈 경우");
localInsertTestCase["WORST"]();

// console.log("3) 모든 입력이 랜덤하게 들어갈 경우");
// localInsertTestCase["RANDOM"]();
