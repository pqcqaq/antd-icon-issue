import React from "react";
import * as icons from "@ant-design/icons";
const createIconCpn = (props) => {
    const name = props.name;
    if (!name) {
        return null;
    }
    const antIcon = icons;
    return React.createElement(antIcon[name]);
};
export default createIconCpn;
