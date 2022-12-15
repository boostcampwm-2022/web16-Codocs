const charMap = {
  HEAD: {
    id: 'HEAD',
    leftId: 'START',
    rightId: 'fcb8b86b-6790-4c5f-af5c-77198f5c9941',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '',
    tombstone: true
  },
  TAIL: {
    id: 'TAIL',
    leftId: '4fb92c15-50c6-473b-becf-5e2a6212b43b',
    rightId: 'END',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '',
    tombstone: true
  },
  '4fb92c15-50c6-473b-becf-5e2a6212b43b': {
    id: '4fb92c15-50c6-473b-becf-5e2a6212b43b',
    leftId: '6d4df3e4-de94-4d48-b668-5866fe42883b',
    rightId: 'TAIL',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: 'ㅇ',
    tombstone: true
  },
  '6d4df3e4-de94-4d48-b668-5866fe42883b': {
    id: '6d4df3e4-de94-4d48-b668-5866fe42883b',
    leftId: 'd54eecfc-073c-403d-ac2a-8a5b3f88fb57',
    rightId: '4fb92c15-50c6-473b-becf-5e2a6212b43b',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '아',
    tombstone: true
  },
  'fcb8b86b-6790-4c5f-af5c-77198f5c9941': {
    id: 'fcb8b86b-6790-4c5f-af5c-77198f5c9941',
    leftId: 'HEAD',
    rightId: '72e976d6-f2b4-4165-bbb3-8e49633f7e5b',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '안',
    tombstone: false
  },
  'd54eecfc-073c-403d-ac2a-8a5b3f88fb57': {
    id: 'd54eecfc-073c-403d-ac2a-8a5b3f88fb57',
    leftId: '86cf042e-6314-4ff4-8280-88726c743390',
    rightId: '6d4df3e4-de94-4d48-b668-5866fe42883b',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: 'ㄴ',
    tombstone: true
  },
  '86cf042e-6314-4ff4-8280-88726c743390': {
    id: '86cf042e-6314-4ff4-8280-88726c743390',
    leftId: '14722d62-5543-4b55-a786-1af647b35ace',
    rightId: 'd54eecfc-073c-403d-ac2a-8a5b3f88fb57',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '녀',
    tombstone: true
  },
  '72e976d6-f2b4-4165-bbb3-8e49633f7e5b': {
    id: '72e976d6-f2b4-4165-bbb3-8e49633f7e5b',
    leftId: 'fcb8b86b-6790-4c5f-af5c-77198f5c9941',
    rightId: 'd34c4e6f-e1ee-4d9b-91dd-1a30c11f3ea8',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '녕',
    tombstone: false
  },
  '14722d62-5543-4b55-a786-1af647b35ace': {
    id: '14722d62-5543-4b55-a786-1af647b35ace',
    leftId: '8e16baa0-b3ff-4dc4-9995-588998d7405d',
    rightId: '86cf042e-6314-4ff4-8280-88726c743390',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: 'ㅎ',
    tombstone: true
  },
  '8e16baa0-b3ff-4dc4-9995-588998d7405d': {
    id: '8e16baa0-b3ff-4dc4-9995-588998d7405d',
    leftId: 'b5961dd9-4274-4d27-9da7-09ddcf8e416b',
    rightId: '14722d62-5543-4b55-a786-1af647b35ace',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '하',
    tombstone: true
  },
  'b5961dd9-4274-4d27-9da7-09ddcf8e416b': {
    id: 'b5961dd9-4274-4d27-9da7-09ddcf8e416b',
    leftId: 'e59ddbe1-57ff-4b7b-b667-ea6218534ff2',
    rightId: '8e16baa0-b3ff-4dc4-9995-588998d7405d',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '핫',
    tombstone: true
  },
  'd34c4e6f-e1ee-4d9b-91dd-1a30c11f3ea8': {
    id: 'd34c4e6f-e1ee-4d9b-91dd-1a30c11f3ea8',
    leftId: '72e976d6-f2b4-4165-bbb3-8e49633f7e5b',
    rightId: 'f5d3f880-bb1c-479c-8623-5857ab7e70d3',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '하',
    tombstone: false
  },
  'e59ddbe1-57ff-4b7b-b667-ea6218534ff2': {
    id: 'e59ddbe1-57ff-4b7b-b667-ea6218534ff2',
    leftId: '6724fb58-4753-4f9b-9542-a2a1537002ad',
    rightId: 'b5961dd9-4274-4d27-9da7-09ddcf8e416b',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '세',
    tombstone: true
  },
  '6724fb58-4753-4f9b-9542-a2a1537002ad': {
    id: '6724fb58-4753-4f9b-9542-a2a1537002ad',
    leftId: '25f3cb46-f138-4ffe-9d29-04fe56559bb1',
    rightId: 'e59ddbe1-57ff-4b7b-b667-ea6218534ff2',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '셍',
    tombstone: true
  },
  'f5d3f880-bb1c-479c-8623-5857ab7e70d3': {
    id: 'f5d3f880-bb1c-479c-8623-5857ab7e70d3',
    leftId: 'd34c4e6f-e1ee-4d9b-91dd-1a30c11f3ea8',
    rightId: '25f3cb46-f138-4ffe-9d29-04fe56559bb1',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '세',
    tombstone: false
  },
  '25f3cb46-f138-4ffe-9d29-04fe56559bb1': {
    id: '25f3cb46-f138-4ffe-9d29-04fe56559bb1',
    leftId: 'f5d3f880-bb1c-479c-8623-5857ab7e70d3',
    rightId: '6724fb58-4753-4f9b-9542-a2a1537002ad',
    siteId: '8fbc2ca6-38a7-4ad7-a67b-bdd160ad2d08',
    value: '요',
    tombstone: false
  }
};

export default charMap;
