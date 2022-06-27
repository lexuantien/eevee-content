export declare const changeTypes: {
    M: string;
    A: string;
    D: string;
    R: string;
};
export declare type Change = 'M' | 'A' | 'D' | 'R' | undefined;
export declare type ChangedFile = {
    changeType: Change;
    filename: string;
};
