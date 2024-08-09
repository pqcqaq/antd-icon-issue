import { jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo, memo } from "react";
const Array = (props) => {
    const { className, children, arr } = props;
    const renderedItems = useMemo(() => arr.map((item, index) => {
        return React.createElement(children, {
            item,
            index,
            key: index,
        });
    }), [arr, children]);
    return _jsx("div", { className: className, children: renderedItems });
};
export default memo(Array);
