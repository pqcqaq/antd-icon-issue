import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
const AccordionItem = ({ title, children, isOpen, toggleOpen, icon, className, }) => {
    const contentRef = useRef(null);
    return (_jsxs("div", { className: className ? className : "border-b", children: [_jsxs("button", { className: "flex items-center justify-between w-full p-4 focus:outline-none", onClick: toggleOpen, children: [_jsxs("div", { className: "flex items-center", children: [icon ? icon : _jsx(PencilIcon, { className: "w-5 h-5 mr-2" }), _jsx("span", { children: title })] }), _jsx(ChevronDownIcon, { className: `w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}` })] }), _jsx("div", { ref: contentRef, className: "overflow-hidden transition-max-height duration-500 ease-in-out", style: {
                    maxHeight: isOpen && contentRef.current
                        ? `${contentRef.current.scrollHeight}px`
                        : "0",
                }, children: _jsx("div", { className: "p-4", children: children }) })] }));
};
const Accordion = ({ items, className, itemsClassName, }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (_jsx("div", { className: className ? className : "max-w-md mx-auto mt-10", children: items.map((item, index) => (_jsx(AccordionItem, { title: item.title, isOpen: openIndex === index, toggleOpen: () => handleToggle(index), icon: item.icon, className: itemsClassName, children: item.content }, index))) }));
};
export default Accordion;
