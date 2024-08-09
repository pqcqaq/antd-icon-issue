import { PropsArray, PropsBlock, PropsImage, WbElement, WbImage } from "webot-core/src/types/Element";
type ListCarouselProps<R extends WbElement[]> = {
    arr: PropsArray<[WbImage, ...R]>;
    listRender: (props: {
        list: [...PropsBlock<R>];
        hover: boolean;
    }) => JSX.Element;
    picRender?: (props: PropsImage) => JSX.Element;
};
export declare const ListCarousel: <R extends WbElement[]>(props: ListCarouselProps<R>) => import("react/jsx-runtime").JSX.Element;
export default ListCarousel;
