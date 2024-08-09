import React from "react";
interface Image {
    src: string;
    alt: string;
}
interface DotStyles {
    active: string;
    inactive: string;
}
/**
 * 轮播图组件的Props类型
 */
interface CarouselProps {
    /**
     * 图片数组
     */
    images: Image[];
    /**
     * 轮播间隔时间
     */
    gap?: number;
    /**
     * 按钮样式
     */
    buttonClass?: string;
    /**
     * 圆点样式
     */
    dotClass?: DotStyles;
    /**
     * 轮播图的图片样式
     */
    className?: string;
    /**
     * 是否自动播放
     */
    autoPlay?: boolean;
    /**
     * 是否显示圆点
     */
    showDots?: boolean;
    /**
     * 是否显示箭头
     */
    showArrows?: boolean;
    /**
     * 渲染内部组件的函数
     */
    itemRender?: (props: {
        image: Image;
        index: number;
    }) => React.ReactNode | null;
    /**
     * 一次显示几个图片
     */
    displayCount?: number;
    /**
     * 轮播图的宽度
     */
    width?: string | number;
    /**
     * 容器附加样式
     */
    containerStyle?: React.CSSProperties;
}
/**
 *  轮播图组件
 * @param param0  images: 图片数组，gap: 轮播间隔时间，buttonStyles: 按钮样式，dotStyles: 圆点样式，autoPlay: 是否自动播放
 * @returns  返回一个轮播图组件
 */
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
