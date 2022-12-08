type CRDTIndex = number[];

export default class Char {
  index: CRDTIndex;

  siteId: string;

  value: string;

  constructor(index: CRDTIndex, siteId: string, value: string) {
    this.index = index;
    this.siteId = siteId;
    this.value = value;
  }
}