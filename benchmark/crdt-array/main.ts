import { localInsertBenchmark } from "./localInsertTest";
import { localInsertRangeBenchmark } from "./localInsertRangeTest";
import { localDeleteBenchmark } from './localDeleteTest';
import { remoteInsertBenchmark } from './remoteInsertTest';

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

console.log("**3. LocalDelete 벤치마크**");
console.log("3-1) 하나씩 삭제할 경우");
console.log("* 여러 개 삭제하는 경우는 하나씩 삭제하는 경우와 동작이 같아 테스트하지 않는다.");
console.log("* index는 존재하는 문자의 갯수와도 같음");
localDeleteBenchmark("DELETE");

console.log("**4. remoteInsert 벤치마크**");
console.log("* 현재 양 쪽 모두 OperationCount만큼 인덱스가 존재하고 있음");
console.log("4-1) 모든 remote 요청이 Best하게 들어갈 경우");
remoteInsertBenchmark("BEST");

console.log("4-2) 모든 remote 요청이 Worst하게 들어갈 경우");
remoteInsertBenchmark("WORST");

console.log("4-3) 모든 remote 요청이 랜덤하게 들어갈 경우");
remoteInsertBenchmark("RANDOM");