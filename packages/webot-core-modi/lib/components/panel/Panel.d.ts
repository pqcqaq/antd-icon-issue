import { PropsBlock, WbElement } from "../../types/Element";
import "rc-slider/assets/index.css";
export default function Panel<WE extends WbElement[]>(props: {
    elements: WE;
    onDataChanged: (data: PropsBlock<WE>) => void;
    onHover?: (id: string) => void;
}): import("react/jsx-runtime").JSX.Element | null;
