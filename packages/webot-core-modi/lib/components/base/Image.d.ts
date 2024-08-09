import React from "react";
import { PropsImage } from "../../types/Element";
import "./style/Image.css";
declare const Image: (props: React.PropsWithChildren<{
    className?: string;
} & PropsImage>) => import("react/jsx-runtime").JSX.Element;
export default Image;
