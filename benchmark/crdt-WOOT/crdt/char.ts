import { v4 as uuidv4 } from 'uuid';

class Char {
  id: string;
  
  leftId: string;
  
  rightId: string;
  
  siteId: string;
  
  value: string;
  
  tombstone: boolean;
  
  constructor(leftId: string, rightId: string, siteId: string, value: string, id: string = uuidv4()) {
    this.id = id;
    this.leftId = leftId;
    this.rightId = rightId;
    this.siteId = siteId;
    this.value = value;
    this.tombstone = false;
  }
}
  
export default Char;