import { jsx as _jsx } from "react/jsx-runtime";
import "./style/Button.css";
const Button = (props) => {
    const { id, className, text, actionDef, case: buttonCase, size } = props;
    // Create classes based on the size and case
    const sizeClass = size ? `btn-${size}` : "";
    const caseClass = buttonCase ? `btn-${buttonCase}` : "";
    return (_jsx("button", { id: id, className: `we-button ${sizeClass} ${caseClass} ${className}`, onClick: () => {
            if (actionDef.action === "open") {
                window.open(actionDef.url);
            }
            else if (actionDef.action === "nav") {
                window.location.href = actionDef.url || "#";
            }
        }, children: text }));
};
export default Button;
