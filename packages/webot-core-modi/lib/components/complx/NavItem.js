import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const NavItem = (item) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);
    const itemRef = useRef(null);
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // 300ms delay before closing
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (itemRef.current &&
                !itemRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    if ("childs" in item) {
        return (_jsxs("div", { ref: itemRef, className: "relative group", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [_jsx("button", { className: "px-4 py-2 text-gray-700 hover:text-red-500", children: item.text }), isOpen && item.childs && (_jsx("div", { className: "absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50", children: item.childs.map((child) => (_jsx(NavItem, { ...child }, child.id))) }))] }));
    }
    return (_jsx("a", { href: item.url, className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: item.text }));
};
export default NavItem;
