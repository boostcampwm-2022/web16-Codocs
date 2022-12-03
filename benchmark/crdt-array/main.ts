import { localInsertBenchmark } from "./localInsert";

console.log("**1. LocalInsert 벤치마크**");
console.log("1) 모든 입력이 Best하게 들어갈 경우");
localInsertBenchmark("BEST");

console.log("2) 모든 입력이 Worst하게 들어갈 경우");
localInsertBenchmark("WORST");

console.log("3) 모든 입력이 랜덤하게 들어갈 경우");
localInsertBenchmark("RANDOM");