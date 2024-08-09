import React, { CSSProperties } from "react";
interface CounterProps {
    title?: string;
    start: number;
    end: number;
    duration: number;
    prefix?: string;
    suffix?: string;
    numberStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    showSeparator?: boolean;
    ease?: boolean;
    easeRatio?: number;
    render?: (count: number) => React.ReactNode;
}
declare const Counter: React.FC<CounterProps>;
export default Counter;
