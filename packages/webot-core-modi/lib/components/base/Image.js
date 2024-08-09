import { jsx as _jsx } from "react/jsx-runtime";
import "./style/Image.css";
const Image = (props) => {
    const { id, className, src, alt } = props;
    return (_jsx("img", { id: id, className: "we-image " + className, src: src, alt: alt }));
};
export default Image;
