import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Background = (props) => {
    const { children, className, id, color, src, fit } = props;
    const backgroundStyle = {
        position: "relative", // 保持不变
        backgroundColor: color || "transparent",
        overflow: "hidden", // 添加这行以确保背景图不会溢出
    };
    return (_jsxs("div", { id: id, className: className, style: backgroundStyle, children: [src && (_jsx("img", { src: src, alt: "Background", style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: fit || "cover",
                    zIndex: 1, // 将z-index设置为较低的值
                } })), _jsx("div", { className: "children", style: {
                    position: "relative", // 添加这行
                    zIndex: 10, // 确保这个值大于背景图片的z-index
                }, children: children })] }));
};
export default Background;
