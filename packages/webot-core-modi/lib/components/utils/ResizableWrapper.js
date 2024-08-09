import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const ResizableWrapper = ({ breakpointWidth, children, style }) => {
    const wrapperRef = useRef(null);
    const childrenRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [applyTransform, setApplyTransform] = useState(false);
    const [childrenHeight, setChildrenHeight] = useState(0);
    useEffect(() => {
        const updateScale = () => {
            if (wrapperRef.current) {
                const currentWidth = wrapperRef.current.offsetWidth;
                const newScale = currentWidth / breakpointWidth;
                setScale(newScale);
                // Apply transform when currentWidth is greater than breakpointWidth
                setApplyTransform(currentWidth > breakpointWidth);
                // Set children height
                if (childrenRef.current) {
                    const childrenHeight = childrenRef.current.offsetHeight;
                    setChildrenHeight(childrenHeight * newScale);
                }
            }
        };
        const resizeObserver = new ResizeObserver(() => {
            updateScale();
        });
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }
        updateScale();
        return () => {
            if (wrapperRef.current) {
                resizeObserver.unobserve(wrapperRef.current);
            }
        };
    }, [breakpointWidth]);
    const wrapperStyle = {
        transform: applyTransform ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        overflow: "hidden",
        height: applyTransform ? childrenHeight + "px" : "auto",
    };
    return (_jsx("div", { className: "re-container", style: {
            overflow: "hidden",
        }, children: _jsx("div", { ref: wrapperRef, style: wrapperStyle, children: _jsx("div", { ref: childrenRef, className: "children", style: {
                    width: applyTransform ? `${breakpointWidth}px` : "100%",
                    ...style,
                }, children: children }) }) }));
};
export default ResizableWrapper;
