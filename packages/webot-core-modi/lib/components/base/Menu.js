import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Menu = ({ className, orientation = "vertical", showLogo = false, logo, id, text, childs, }) => {
    const renderMenuItem = (item) => {
        if ("childs" in item) {
            return (_jsxs("div", { id: item.id, className: "menu-item", children: [_jsx("div", { className: "menu-item-text font-bold", children: item.text }), _jsx("div", { className: "menu-item-children ml-4", children: item.childs.map(renderMenuItem) })] }, item.id));
        }
        return (_jsx("div", { id: item.id, className: "menu-leaf", children: _jsx("a", { href: item.url, className: "menu-leaf-text", children: item.text }) }, item.id));
    };
    return (_jsxs("div", { id: id, className: `menu ${orientation === "horizontal" ? "flex" : "block"} ${className || ""}`, children: [showLogo && _jsx("div", { className: "menu-logo", children: logo }), _jsxs("div", { className: "menu-root", children: [text && (_jsx("div", { className: "menu-root-text font-bold text-lg", children: text })), childs && childs.map(renderMenuItem)] })] }));
};
export default Menu;
