export type ChangeType = "update" | "remove" | "add";
export type Change = {
    key: string;
    type: ChangeType;
};
/**
 *  防抖函数
 * @param fn  需要防抖的函数
 * @param delay  防抖时间
 * @returns  返回一个防抖函数
 */
export declare const useDebounce: (fn: Function, delay: number) => (...args: any[]) => void;
/**
 * 节流函数
 * @param fn  需要节流的函数
 * @param delay  节流时间
 * @returns  返回一个节流函数
 */
export declare const useThrottle: (fn: Function, delay: number) => (...args: any[]) => void;
/**
 *  获取对象比较的结果
 * @param obj1  原始对象
 * @param obj2  目标对象
 * @returns  返回修改的key
 */
export declare function compareObjects(obj1: Record<string, any>, obj2: Record<string, any>): Change[];
type Curried<T extends any[], R> = T extends [] ? () => R : T extends [infer P] ? (p1: P) => R : T extends [infer P, ...infer L] ? (p1: P) => Curried<L, R> : never;
/**
 *  柯里化函数
 * @param fn  需要柯里化的函数
 * @returns  返回一个柯里化函数
 */
export declare function curry<A extends any[], P>(fn: (...args: A) => P): Curried<A, P>;
export interface ProxyArray<T> extends Array<T> {
    [index: number]: T;
    "set-length": number;
    map<U>(fn: (item: T, index: number, arr: T[]) => U): U[];
    length: number;
}
/**
 *  创建一个代理数组
 * @param obj  代理对象
 * @returns  返回一个代理数组
 */
export declare function createProxyArray<T extends object>(obj: T, maxLenght: number): ProxyArray<T>;
export {};
