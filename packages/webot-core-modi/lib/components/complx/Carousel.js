import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
/**
 *  轮播图组件
 * @param param0  images: 图片数组，gap: 轮播间隔时间，buttonStyles: 按钮样式，dotStyles: 圆点样式，autoPlay: 是否自动播放
 * @returns  返回一个轮播图组件
 */
const Carousel = ({ images, gap = 3000, buttonClass: buttonStyles = "bg-gray-700 text-white", dotClass: dotStyles = { active: "bg-gray-800", inactive: "bg-gray-400" }, className, autoPlay = true, showDots = true, showArrows = true, itemRender: _itemRender, displayCount = 1, width, containerStyle, }) => {
    const itemRender = _itemRender ||
        (({ image, index }) => {
            return (_jsx("div", { style: { width: "100%", height: "100%" }, children: !loadedImages[index] ? (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-gray-200", children: _jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" }) })) : (_jsx("img", { src: image.src, alt: image.alt, className: className
                        ? className
                        : "w-full h-full object-cover", onError: (e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                        e.currentTarget.alt = image.alt;
                    } })) }, index));
        });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadedImages, setLoadedImages] = useState(new Array(images.length).fill(false));
    const intervalRef = useRef(null);
    const touchStartX = useRef(null);
    const touchDeltaX = useRef(null);
    const [isTouching, setIsTouching] = useState(false);
    useEffect(() => {
        const loadImage = (index) => {
            const img = new Image();
            img.src = images[index].src;
            img.onload = () => {
                setLoadedImages((prev) => {
                    const newLoadedImages = [...prev];
                    newLoadedImages[index] = true;
                    return newLoadedImages;
                });
            };
            img.onerror = () => {
                setLoadedImages((prev) => {
                    const newLoadedImages = [...prev];
                    newLoadedImages[index] = false;
                    return newLoadedImages;
                });
            };
        };
        images.forEach((_, index) => loadImage(index));
    }, [images]);
    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (autoPlay) {
            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % images.length);
            }, gap);
        }
    };
    useEffect(() => {
        resetInterval();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [gap, images.length, autoPlay]);
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        resetInterval();
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
        resetInterval();
    };
    const setSlide = (index) => {
        setCurrentSlide(index);
        resetInterval();
    };
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
        setIsTouching(true);
    };
    const handleTouchMove = (e) => {
        if (touchStartX.current !== null) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        }
    };
    const handleTouchEnd = () => {
        if (touchDeltaX.current !== null) {
            if (touchDeltaX.current > 50) {
                prevSlide();
            }
            else if (touchDeltaX.current < -50) {
                nextSlide();
            }
        }
        touchStartX.current = null;
        touchDeltaX.current = null;
        setIsTouching(false);
    };
    return (_jsxs("div", { className: "relative mx-auto overflow-hidden", style: { width: width || "100%", maxWidth: "100%" }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: [_jsx("div", { className: `flex transition-transform duration-300 ease-in-out ${isTouching ? "" : "transform"}`, style: {
                    ...containerStyle,
                    transform: isTouching
                        ? `translateX(calc(-${(currentSlide * 100) / displayCount}% + ${touchDeltaX.current}px))`
                        : `translateX(-${(currentSlide * 100) / displayCount}%)`,
                }, children: images.map((image, index) => {
                    return (_jsx("div", { className: "flex-shrink-0", style: {
                            minWidth: `calc(100% / ${displayCount})`,
                            height: "100%",
                        }, children: itemRender({ image, index }) }, index));
                }) }), showArrows && (_jsxs(_Fragment, { children: [_jsx("button", { className: `absolute top-1/2 left-4 transform -translate-y-1/2 ${buttonStyles} p-2 rounded-full`, onClick: prevSlide, children: "<" }), _jsx("button", { className: `absolute top-1/2 right-4 transform -translate-y-1/2 ${buttonStyles} p-2 rounded-full`, onClick: nextSlide, children: ">" })] })), showDots && (_jsx("div", { className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2", children: images.map((_, index) => (_jsx("button", { className: `w-3 h-3 rounded-full ${currentSlide === index
                        ? dotStyles.active
                        : dotStyles.inactive}`, onClick: () => setSlide(index) }, index))) }))] }));
};
export default Carousel;
