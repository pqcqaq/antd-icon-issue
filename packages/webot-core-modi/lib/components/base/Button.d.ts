import React from "react";
import { PropsWbButton } from "../../types/Element";
import "./style/Button.css";
type Props = React.PropsWithChildren<{
    className?: string;
} & PropsWbButton>;
declare const Button: React.FC<Props>;
export default Button;
