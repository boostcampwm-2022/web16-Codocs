import { localInsertBenchmark } from "./localInsert";
import { localInsertRangeBenchmark } from "./localInsertRange";

console.log("**1. LocalInsert 벤치마크**");
console.log("1-1) 모든 입력이 Best하게 들어갈 경우");
localInsertBenchmark("BEST");

console.log("1-2) 모든 입력이 Worst하게 들어갈 경우");
localInsertBenchmark("WORST");

console.log("1-3) 모든 입력이 랜덤하게 들어갈 경우");
localInsertBenchmark("RANDOM");

console.log("**2. LocalInsertRange 벤치마크**");
console.log("2-1) 모든 입력(3개를 한번에 입력)이 Best하게 들어갈 경우");
localInsertRangeBenchmark("BEST");

console.log("2-2) 모든 입력(3개를 한번에 입력)이 Worst하게 들어갈 경우");
localInsertRangeBenchmark("WORST");

console.log("2-3) 모든 입력(3개를 한번에 입력)이 랜덤하게 들어갈 경우");
localInsertRangeBenchmark("RANDOM");

