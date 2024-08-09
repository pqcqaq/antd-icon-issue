import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import createIconCpn from "../utils/Icon.js";
const Icon = (props) => {
    const { className, id, name, size, text } = props;
    return (_jsxs("div", { id: id, className: `icon ${className}`, style: { fontSize: size || "32px" }, children: [React.createElement(() => createIconCpn({ name })), text && _jsx("span", { className: "ml-2", children: text })] }));
};
export default Icon;
