import { v1 as uuidv1 } from 'uuid';

const createUserProfile = (counts: number): UserProfile[] => {
  return Array(counts)
    .fill(null)
    .map((_) => {
      return {
        profileURL: 'https://picsum.photos/200',
        name: uuidv1().slice(0, 8)
      };
    });
};

export default createUserProfile;
