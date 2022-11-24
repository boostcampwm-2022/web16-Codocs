export default class Char {
  index: number[];

  siteId: string;

  value: string;

  constructor(index: number[], siteId: string, value: string) {
    this.index = index;
    this.siteId = siteId;
    this.value = value;
  }
}