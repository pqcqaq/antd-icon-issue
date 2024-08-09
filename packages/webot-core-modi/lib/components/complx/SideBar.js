import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const alignmentClassMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};
const SideBar = ({ className, alignment = "left", id, text, childs, itemRender, }) => {
    const renderMenuItem = (item) => {
        if ("childs" in item) {
            return (_jsxs("div", { id: item.id, className: "mb-2", children: [_jsx("div", { className: `mb-1 font-bold ${alignmentClassMap[alignment]}`, children: item.text }), _jsx("div", { className: "pl-4 ml-4", children: item.childs.map(renderMenuItem) })] }, item.id));
        }
        return (_jsx("div", { id: item.id, className: "mb-2", children: itemRender ? (itemRender(item)) : (_jsx("a", { href: item.url, className: `text-blue-500 hover:text-blue-700 ${alignmentClassMap[alignment]}`, children: item.text })) }, item.id));
    };
    return (_jsxs("div", { id: id, className: `p-4 bg-gray-100 rounded-lg shadow-md ${className || ""}`, children: [text && (_jsx("div", { className: `mb-4 font-bold text-lg ${alignmentClassMap[alignment]}`, children: text })), childs && childs.map(renderMenuItem)] }));
};
export default SideBar;
