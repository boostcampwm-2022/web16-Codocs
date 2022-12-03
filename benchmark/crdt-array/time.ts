import { CRDT } from "./crdt/crdt";

const localInsertTest = (times: number) => {
  const template = {
    op_10 : "",
    op_100 : "",
    op_1000 : "",
    op_10000 : "",
    op_100000 : "",
  };
  
  console.log("*** LocalInsert() Test ***");
  console.log("*** 1. 모든 입력이 Best하게 들어갈 경우 ***");
  let crdt = new CRDT();
  let startTime = performance.now()
  for (let i = 0; i < times; i++) {
    crdt.localInsert(i, `a`);
  }
  let endTime = performance.now()
  template.op_10 = `${endTime - startTime}ms`; 

  crdt = new CRDT();
  startTime = performance.now()
  for (let i = 0; i < times*10; i++) {
    crdt.localInsert(i, `a`);
  }
  endTime = performance.now()
  template.op_100 = `${endTime - startTime}ms`; 

  crdt = new CRDT();
  startTime = performance.now()
  for (let i = 0; i < times*100; i++) {
    crdt.localInsert(i, `a`);
  }
  endTime = performance.now()
  template.op_1000 = `${endTime - startTime}ms`; 

  crdt = new CRDT();
  startTime = performance.now()
  for (let i = 0; i < times*1000; i++) {
    crdt.localInsert(i, `a`);
  }
  endTime = performance.now()
  template.op_10000 = `${endTime - startTime}ms`;

  crdt = new CRDT();
  startTime = performance.now()
  for (let i = 0; i < times*10000; i++) {
    crdt.localInsert(i, `a`);
  }
  endTime = performance.now()
  template.op_100000 = `${endTime - startTime}ms`; 
  
  console.table(template);
}

localInsertTest(10);
