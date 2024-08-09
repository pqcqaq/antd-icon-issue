import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import NavItem from "./NavItem.js";
import Image from "../base/Image.js";
import { MenuFoldOutlined } from "@ant-design/icons";
const SideMenu = ({ menu, image, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    // 点击外部关闭
    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target;
            if (isOpen && !target.closest(".menu")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    return (_jsxs("div", { children: [isOpen || (_jsx("button", { onClick: toggleMenu, className: "fixed top-1 right-4 z-50 p-2 bg-white rounded-md", children: _jsx(MenuFoldOutlined, {}) })), _jsx("div", { className: `fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-40`, children: _jsxs("div", { className: "p-4 bg-white shadow-lg h-screen", children: [_jsx(Image, { ...image, className: "h-12 w-auto mb-4" }), menu.childs &&
                            menu.childs.map((item) => (_jsx(NavItem, { ...item }, item.id)))] }) })] }));
};
export default SideMenu;
