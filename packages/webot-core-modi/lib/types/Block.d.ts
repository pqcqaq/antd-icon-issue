import React from "react";
import { WbElement } from "./Element";
export type FindConfig = {
    id: string;
};
/**
 * 编辑器中Block的元数据，在编辑器中起作用
 */
export type BlockMeta = {
    name?: string;
    description?: string;
    version?: string;
    style?: React.CSSProperties;
};
export type BlockDef = {
    elements: WbElement[];
    Block: (props: any) => React.ReactElement;
    name: string;
    meta?: BlockMeta;
    blockPropsDef?: BlockProps;
};
/**
 * 某一个prop的数据类型
 */
export type PropsDataType = "boolean" | "checkbox" | "color" | "date" | "text" | "radio";
export type Options = {
    value: string;
    label: string;
};
export type BlockPropsBase = {
    /**
     * 这个props的名称
     */
    name: string;
    /**
     * 这个props的描述
     */
    description?: string;
};
export type BlockPropsBoolean = BlockPropsBase & {
    type: "boolean";
    trueValue: string;
    falseValue: string;
};
export type BlockPropsCheckbox = BlockPropsBase & {
    type: "checkbox";
    options: string[] | Options[];
};
export type BlockPropsRadio = BlockPropsBase & {
    type: "radio";
    options: string[] | Options[];
};
export type BlockPropsColor = BlockPropsBase & {
    type: "color";
    defaultValue: string;
};
export type BlockPropsDate = BlockPropsBase & {
    type: "date";
    defaultValue: string;
};
export type BlockPropsText = BlockPropsBase & {
    type: "text";
    defaultValue: string;
};
export type PropsDef = BlockPropsBoolean | BlockPropsCheckbox | BlockPropsRadio | BlockPropsColor | BlockPropsDate | BlockPropsText;
/**
 * 自定义Blocks属性
 */
export type BlockProps = {
    [key: string]: PropsDef;
};
/**
 * 根据BlockProps生成PropsData
 */
export type PropsData<P extends BlockProps> = {
    [K in keyof P]: P[K] extends BlockPropsBoolean ? boolean : P[K] extends BlockPropsCheckbox | BlockPropsRadio ? Options[] : P[K] extends BlockPropsColor | BlockPropsDate | BlockPropsText ? string : never;
};
