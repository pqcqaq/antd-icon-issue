import React, { ReactNode } from "react";
interface AccordionProps {
    className?: string;
    items: {
        icon?: ReactNode;
        title: ReactNode;
        content: ReactNode;
    }[];
    itemsClassName?: string;
}
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
