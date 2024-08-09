import { jsx as _jsx } from "react/jsx-runtime";
import "./style/Text.css";
const Text = (props) => {
    const { id, value, className } = props;
    return (value && (_jsx("div", { id: id, className: "we-text " + className, children: value })));
};
export default Text;
