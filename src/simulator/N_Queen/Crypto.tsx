export const Encrypt = (r: number, c: number): number => {
    return r*100 + c;
}

export const Decrypt = (code: number): number[] => {
    return [code/100, code%100];
}