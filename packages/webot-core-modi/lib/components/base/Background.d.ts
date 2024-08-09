import React from "react";
interface PropsBackground {
    id: string;
    color?: string;
    src?: string;
    fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}
declare const Background: React.FC<React.PropsWithChildren<{
    className?: string;
} & PropsBackground>>;
export default Background;
