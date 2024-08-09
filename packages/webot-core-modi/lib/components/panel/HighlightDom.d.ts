import React from "react";
interface SelectorConfig {
    id: string;
}
interface HighlightDomProps {
    selector: string | SelectorConfig;
    containerSelector?: string;
    highlightStyle?: React.CSSProperties;
}
declare const HighlightDom: React.FC<HighlightDomProps>;
export default HighlightDom;
