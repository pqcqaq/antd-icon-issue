import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const Counter = ({ title, start, end, duration, prefix = "", suffix = "", numberStyle = {}, titleStyle = {}, showSeparator = false, ease = false, easeRatio = 2, // 默认值为2，保持原有的easeOutQuad效果
render: _render, }) => {
    const [count, setCount] = useState(start);
    const render = _render ||
        ((count) => {
            return (_jsxs("div", { className: "text-3xl font-bold", style: numberStyle, children: [prefix, formatNumber(count), suffix] }));
        });
    useEffect(() => {
        if (start === end)
            return;
        const range = end - start;
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = ease ? easeOutCustom(progress, easeRatio) : progress;
            const currentCount = start + Math.round(range * easeProgress);
            setCount(currentCount);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [start, end, duration, ease, easeRatio]);
    // 自定义缓动函数
    const easeOutCustom = (t, ratio) => 1 - Math.pow(1 - t, ratio);
    const formatNumber = (num) => {
        if (showSeparator) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return num.toString();
    };
    return (_jsxs("div", { className: "counter p-4 rounded shadow-lg bg-white", children: [title && (_jsx("h2", { className: "text-2xl font-semibold mb-2", style: titleStyle, children: title })), render(count)] }));
};
export default Counter;
