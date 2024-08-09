import { PropsArray, PropsBlock, WbElement } from "../../types/Element";
import React from "react";
type ArrayItem<WE extends WbElement[]> = (props: {
    item: PropsBlock<WE>;
    index: number;
}) => React.ReactNode | null;
type ArrayProps<WE extends WbElement[]> = {
    className?: string;
    arr: PropsArray<WE>;
    children: ArrayItem<WE>;
};
declare const Array: <WE extends WbElement[]>(props: ArrayProps<WE>) => import("react/jsx-runtime").JSX.Element;
declare const _default: typeof Array;
export default _default;
