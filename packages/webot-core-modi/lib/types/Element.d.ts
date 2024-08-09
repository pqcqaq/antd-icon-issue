import * as icons from "@ant-design/icons";
import { BlockProps, PropsData } from "./Block";
export type IconName = keyof typeof icons;
type Tag = string;
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
interface WbElementBase {
    tags: Tag[];
}
export interface WbButton extends WbElementBase {
    type: "button";
    size: "huge" | "large" | "middle" | "small" | "tiny";
    case?: "primary" | "warning" | "ghost" | "text";
}
export interface WbText extends WbElementBase {
    type: "text";
    maxLength: number;
    minLength: number;
    case?: "title" | "subtitle" | "body" | "label" | "tip";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
    weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
}
export interface WbImage extends WbElementBase {
    type: "image";
    maxRatio: number;
    minRatio: number;
    minWidth: number;
    maxWidth: number;
}
export interface WbBackground extends WbElementBase {
    type: "background";
    maxRatio: number;
    minRatio: number;
    minWidth: number;
    maxWidth: number;
}
export interface WbMenu extends WbElementBase {
    type: "menu";
    maxTextLength: number;
    maxTitleLength: number;
    level: 1 | 2 | 3;
}
export interface WbIcon extends WbElementBase {
    type: "icon";
    name: IconName;
    maxTextLength: number;
}
export type WbElement = WbButton | WbText | WbImage | WbArray<any> | WbMenu | WbIcon | WbBackground;
type WbBlock = WbElement[];
export type WbArray<D extends WbBlock> = {
    type: "array";
    maxItem: number;
    minItem: number;
    item: D;
};
export interface PropsWbElement {
    id: string;
}
export interface PropsWbButton extends PropsWbElement {
    text: string;
    actionDef: {
        action: "open" | "nav";
        url: string;
    };
    size: WbButton["size"];
    case: WbButton["case"];
}
export interface PropsImage extends PropsWbElement {
    src: string;
    alt?: string;
    width: number;
    height: number;
}
export interface PropsText extends PropsWbElement {
    value: string;
}
export interface PropsMenuLeaf extends PropsWbElement {
    text: string;
    type: "open" | "nav";
    url: string;
}
export interface PropsMenu extends PropsWbElement {
    level: 3 | 2 | 1;
    text?: string;
    childs: PropsMenu[] | PropsMenuLeaf[];
}
export interface PropsIcon extends PropsWbElement {
    name: IconName;
    text: string;
}
export interface PropsBackground extends PropsWbElement {
    color: string;
    src: string;
    fit: ImageFit;
    width: number;
    height: number;
}
/**
 * Array是一系列的Blocks
 */
export interface PropsArray<Item extends WbBlock> extends Array<PropsBlock<Item>> {
}
/**
 * 根据Element的类型，推导出Props的类型
 */
export type PropsElement<El extends WbElement> = El extends WbButton ? PropsWbButton : El extends WbImage ? PropsImage : El extends WbText ? PropsText : El extends WbArray<infer Item> ? PropsArray<Item> : El extends WbMenu ? PropsMenu : El extends WbIcon ? PropsIcon : El extends WbBackground ? PropsBackground : never;
/**
 * 根据Block的类型，推导出Props的类型
 */
export type PropsBlock<ED extends WbBlock> = {
    [K in keyof ED]: PropsElement<ED[K]>;
};
/**
 * WbProps是一个Block的Props
 */
export type WbProps<ED extends WbBlock, P extends BlockProps = any> = {
    data: PropsBlock<ED>;
    blockProps: PropsData<P>;
    width: "lg" | "sm";
};
export {};
