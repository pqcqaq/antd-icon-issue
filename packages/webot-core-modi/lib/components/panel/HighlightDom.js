import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const defaultHighlightStyle = {
    position: "fixed", // Changed from 'absolute' to 'fixed'
    border: "2px solid green",
    backgroundColor: "rgba(0, 255, 0, 0.1)",
    pointerEvents: "none",
    zIndex: 9999,
};
const HighlightDom = ({ selector, containerSelector = ".main-container", highlightStyle = {}, }) => {
    const [highlightRects, setHighlightRects] = useState([]);
    const [containerRect, setContainerRect] = useState(null);
    const [viewportRect, setViewportRect] = useState(null);
    const highlightRef = useRef(null);
    useEffect(() => {
        const getElements = () => {
            if (typeof selector === "string") {
                return Array.from(document.querySelectorAll(selector));
            }
            else if (selector && "id" in selector) {
                const escapedId = CSS.escape(selector.id);
                return Array.from(document.querySelectorAll(`[id="${escapedId}"]`));
            }
            return [];
        };
        const isIntersecting = (rect, containerRect, viewportRect) => {
            const intersectRect = {
                left: Math.max(rect.left, containerRect.left, viewportRect.left),
                top: Math.max(rect.top, containerRect.top, viewportRect.top),
                right: Math.min(rect.right, containerRect.right, viewportRect.right),
                bottom: Math.min(rect.bottom, containerRect.bottom, viewportRect.bottom),
            };
            return (intersectRect.left < intersectRect.right &&
                intersectRect.top < intersectRect.bottom);
        };
        const updateRects = () => {
            const elements = getElements();
            const container = containerSelector
                ? document.querySelector(containerSelector)
                : null;
            if (!container) {
                setContainerRect(null);
                setHighlightRects([]);
                return;
            }
            const newContainerRect = container.getBoundingClientRect();
            setContainerRect(newContainerRect);
            const newViewportRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
            setViewportRect(newViewportRect);
            const filteredRects = elements
                .map((el) => el.getBoundingClientRect())
                .filter((rect) => isIntersecting(rect, newContainerRect, newViewportRect));
            setHighlightRects(filteredRects);
        };
        updateRects();
        window.addEventListener("resize", updateRects);
        window.addEventListener("scroll", updateRects);
        return () => {
            window.removeEventListener("resize", updateRects);
            window.removeEventListener("scroll", updateRects);
        };
    }, [selector, containerSelector]);
    if (!containerRect || !viewportRect || highlightRects.length === 0)
        return null;
    return createPortal(_jsx(_Fragment, { children: highlightRects.map((rect, index) => {
            const intersect = {
                left: Math.max(rect.left, containerRect.left, viewportRect.left),
                top: Math.max(rect.top, containerRect.top, viewportRect.top),
                right: Math.min(rect.right, containerRect.right, viewportRect.right),
                bottom: Math.min(rect.bottom, containerRect.bottom, viewportRect.bottom),
            };
            if (intersect.left >= intersect.right ||
                intersect.top >= intersect.bottom) {
                return null;
            }
            const style = {
                ...defaultHighlightStyle,
                ...highlightStyle,
                left: `${intersect.left}px`,
                top: `${intersect.top}px`,
                width: `${intersect.right - intersect.left}px`,
                height: `${intersect.bottom - intersect.top}px`,
            };
            return _jsx("div", { ref: highlightRef, style: style }, index);
        }) }), document.body);
};
export default HighlightDom;
