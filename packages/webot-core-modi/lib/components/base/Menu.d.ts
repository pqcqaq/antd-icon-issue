import React, { ReactNode } from "react";
import { PropsMenu } from "../../types/Element";
interface MenuProps {
    className?: string;
    orientation?: "horizontal" | "vertical";
    showLogo?: boolean;
    logo?: ReactNode;
}
declare const Menu: React.FC<MenuProps & PropsMenu>;
export default Menu;
