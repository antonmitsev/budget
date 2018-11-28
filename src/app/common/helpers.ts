export const getKey = (k: string): string => {
    const d = new Date();
    const yyyymm = d.getFullYear() * 100 + d.getMonth() + 1;
    const key = yyyymm + '_' + k;
    return key;
}

export const initLocalStorage = (key: string, value: string = '0'): void => {
    localStorage.setItem(key, value);
}
