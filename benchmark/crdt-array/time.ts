import {crdt} from "./crdt/crdt";

const operation10 = () => {
  console.log("Case 1 : LocalInsert 10 times");
  console.time("Case 1 result : ");
  for (let i=0; i<10; i++) {
    crdt.localInsert(i, `${i}`);
  }
  console.timeEnd("Case 1 result : ");
}

operation10();
