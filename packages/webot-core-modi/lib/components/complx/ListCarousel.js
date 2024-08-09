import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Image from "../base/Image.js";
import Array from "../base/Array.js";
export const ListCarousel = (props) => {
    const { arr, listRender, picRender: _picRender } = props;
    const [picShow, setPicShow] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const picRender = _picRender ||
        ((props) => (_jsx(Image, { ...props, className: "w-full h-full object-cover ml-auto" })));
    // 默认使用第一个元素
    useEffect(() => {
        try {
            setPicShow(arr[0][0]);
        }
        catch (e) {
            console.error(e);
        }
    }, []);
    return (_jsxs("div", { className: "flex w-full", children: [_jsx("div", { className: "w-1/2", children: _jsx(Array, { arr: arr, children: ({ item, index }) => {
                        const [image, ...rest] = item;
                        return (_jsx("div", { onMouseEnter: () => {
                                setActiveIndex(index);
                                setPicShow(image);
                            }, children: listRender({
                                list: rest,
                                hover: activeIndex === index,
                            }) }, index));
                    } }) }), _jsx("div", { className: "w-1/2", children: picShow && picRender(picShow) })] }));
};
export default ListCarousel;
