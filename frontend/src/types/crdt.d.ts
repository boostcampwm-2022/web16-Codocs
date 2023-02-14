declare type CRDTIndex = number[];

declare type Char = {
  id: string,
  leftId: string,
  rightId: string,
  siteId: string,
  value: string,
  tombstone: boolean,
}

declare type CharMap = {
  [key: string]: Char,
}

declare type CRDT = {
  siteId: string,
  head: Char,
  tail: Char,
  charMap: CharMap,
}
