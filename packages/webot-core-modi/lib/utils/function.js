/**
 *  防抖函数
 * @param fn  需要防抖的函数
 * @param delay  防抖时间
 * @returns  返回一个防抖函数
 */
export const useDebounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};
/**
 * 节流函数
 * @param fn  需要节流的函数
 * @param delay  节流时间
 * @returns  返回一个节流函数
 */
export const useThrottle = (fn, delay) => {
    let flag = true;
    return (...args) => {
        if (!flag)
            return;
        flag = false;
        setTimeout(() => {
            fn(...args);
            flag = true;
        }, delay);
    };
};
/**
 *  获取对象比较的结果
 * @param obj1  原始对象
 * @param obj2  目标对象
 * @returns  返回修改的key
 */
export function compareObjects(obj1, obj2) {
    const changes = [];
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (!obj2.hasOwnProperty(key)) {
                changes.push({ key, type: "remove" });
            }
            else if (obj1[key] !== obj2[key]) {
                changes.push({ key, type: "update" });
            }
        }
    }
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
            changes.push({ key, type: "add" });
        }
    }
    return changes;
}
/**
 *  柯里化函数
 * @param fn  需要柯里化的函数
 * @returns  返回一个柯里化函数
 */
export function curry(fn) {
    function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        else {
            return (...moreArgs) => curried(...args, ...moreArgs);
        }
    }
    return curried;
}
/**
 *  创建一个代理数组
 * @param obj  代理对象
 * @returns  返回一个代理数组
 */
export function createProxyArray(obj, maxLenght) {
    let length = maxLenght;
    return new Proxy(obj, {
        get(target, prop) {
            if (typeof prop === "string" && !isNaN(Number(prop))) {
                const index = Number(prop);
                if (index > length) {
                    throw new Error("Index out of range");
                }
                return obj;
            }
            if (prop === "length") {
                return length;
            }
            if (prop === "map") {
                return (fn) => {
                    const result = [];
                    for (let i = 0; i < length; i++) {
                        result.push(fn(obj, i, [obj]));
                    }
                    return result;
                };
            }
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            if (typeof prop === "string" && prop === "set-length") {
                if (typeof value !== "number") {
                    throw new Error("Length must be a number");
                }
                length = value;
                return true;
            }
            return Reflect.set(target, prop, value);
        },
    });
}
