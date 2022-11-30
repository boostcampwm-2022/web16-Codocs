export default class Char {
  index: CRDTIndex;

  siteId: string;

  counter: number;

  value: string;

  constructor(index: CRDTIndex, siteId: string, value: string, counter: number) {
    this.index = index;
    this.siteId = siteId;
    this.counter = counter;
    this.value = value;
  }
}