import React from "react";
import { PropsMenu, PropsMenuLeaf } from "../../types/Element";
interface SideBarProps {
    className?: string;
    alignment?: "left" | "center" | "right";
    itemRender?: (item: PropsMenu | PropsMenuLeaf) => React.ReactNode;
}
declare const SideBar: React.FC<SideBarProps & PropsMenu>;
export default SideBar;
