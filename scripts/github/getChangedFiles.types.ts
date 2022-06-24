export const changeTypes = {
  M: 'modified',
  A: 'added',
  D: 'deleted',
  R: 'moved',
};

export type Change = 'M' | 'A' | 'D' | 'R' | undefined;

export type ChangedFile = {
  // changeType: 'modified' | 'added' | 'deleted' | 'moved';
  changeType: Change;
  filename: string;
};
