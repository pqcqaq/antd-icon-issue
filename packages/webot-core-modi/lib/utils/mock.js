import { createProxyArray } from "./function.js";
export function genId() {
    return Math.random().toString(36).slice(2);
}
export function getHeight(width, ratio) {
    return Math.round(width / ratio);
}
export function caclRatio(width, height) {
    return width / height;
}
const canvasInfo = {
    canvas: document.createElement("canvas"),
    width: 0,
    height: 0,
};
export function generateMockImageUrl(width, height) {
    const { canvas } = canvasInfo;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Unable to get 2D context");
    }
    //clear
    ctx.clearRect(0, 0, width, height);
    // 设置背景色
    ctx.fillStyle = "#E0E0E0"; // 淡灰色
    ctx.fillRect(0, 0, width, height);
    // 设置文字
    const text = `${width}x${height}`;
    ctx.fillStyle = "#000000"; // 黑色文字
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // 动态调整字体大小
    const fontSize = Math.min(width, height) / 10; // 可以根据需要调整这个比例
    ctx.font = `bold ${fontSize}px Arial`;
    // 绘制文字
    ctx.fillText(text, width / 2, height / 2);
    // 转换为 base64
    return canvas.toDataURL("image/png");
}
export function generateMockText(maxl, c) {
    const CaseTextDict = {
        title: "标题",
        subtitle: "副标题",
        body: "正文",
        label: "标签",
        tip: "提示",
    };
    let value = CaseTextDict[c || "body"];
    let value2 = value;
    if (maxl) {
        while (value2.length < maxl) {
            value2 += value;
        }
    }
    return value2;
}
export function generateButtonProps(size, c) {
    const CaseTextDict = {
        primary: "主要",
        warning: "警告",
        ghost: "幽灵",
        text: "文本",
    };
    const SizeTextDict = {
        huge: "巨大",
        large: "大",
        middle: "中",
        small: "小",
        tiny: "微",
    };
    return {
        id: genId(),
        text: `${SizeTextDict[size]}${CaseTextDict[c || "primary"]}按钮`,
        actionDef: {
            action: "open",
            url: "http://www.baidu.com",
        },
        case: c,
        size: size,
    };
}
export function generateTextProps(_maxLength, minLength, c) {
    // 初始大小为最小长度
    return {
        id: genId(),
        value: generateMockText(minLength, c),
    };
}
export function generateImageProps(minRatio, maxRatio, minWidth, maxWidth) {
    const ratio = (minRatio + maxRatio) / 2;
    const width = (minWidth + maxWidth) / 2;
    const height = getHeight(width, ratio);
    return {
        id: genId(),
        src: generateMockImageUrl(width, height),
        width,
        height,
    };
}
export function generateMenuProps(level, maxTextLength, maxTitleLength) {
    const generateChildren = (currentLevel) => {
        if (currentLevel > 1) {
            return Array.from({ length: 1 }).map(() => {
                return {
                    id: genId(),
                    level: (currentLevel - 1),
                    text: generateMockText(maxTitleLength, "title"),
                    childs: generateChildren(currentLevel - 1),
                };
            });
        }
        else {
            return Array.from({ length: 1 }).map(() => {
                return {
                    id: genId(),
                    text: generateMockText(maxTextLength, "label"),
                    type: "nav",
                    url: "http://www.baidu.com",
                };
            });
        }
    };
    return {
        id: genId(),
        level,
        text: generateMockText(maxTextLength, "title"),
        childs: generateChildren(level),
    };
}
export function generateIconProps(name, maxTextLength) {
    return {
        id: genId(),
        name,
        text: maxTextLength == 0 ? "" : generateMockText(maxTextLength, "label"),
    };
}
export function generateBackgroundProps(minRatio, minWidth, color = "#dcdcdc", fit = "cover") {
    const ratio = minRatio;
    const width = minWidth;
    return {
        id: genId(),
        color,
        fit,
        src: generateMockImageUrl(width, ratio),
        width,
        height: getHeight(width, ratio),
    };
}
export function generateDefaultData(elements) {
    return elements.map((ele) => {
        const { type } = ele;
        switch (type) {
            case "text": {
                const { minLength, case: c } = ele;
                return generateTextProps(minLength, minLength, c);
            }
            case "image": {
                const { minRatio, minWidth } = ele;
                return generateImageProps(minRatio, minRatio, minWidth, minWidth);
            }
            case "button": {
                const { size, case: c } = ele;
                return generateButtonProps(size, c);
            }
            case "array": {
                const { item, maxItem } = ele;
                return createProxyArray(generateDefaultData(item), maxItem);
            }
            case "menu": {
                const { level, maxTextLength, maxTitleLength } = ele;
                return generateMenuProps(level, maxTextLength, maxTitleLength);
            }
            case "icon": {
                const { name, maxTextLength } = ele;
                return generateIconProps(name, maxTextLength);
            }
            case "background": {
                const { minRatio, minWidth } = ele;
                return generateBackgroundProps(minRatio, minWidth, "#dcdcdc", "cover");
            }
            default: {
                throw new Error("尚未实现");
            }
        }
    });
}
export function generateDefaultProps(props) {
    const result = {};
    for (const [key, prop] of Object.entries(props)) {
        switch (prop.type) {
            case "boolean":
                result[key] = Math.random() < 0.5;
                break;
            case "radio":
                if (prop.options.length > 0) {
                    const randomIndex = Math.floor(Math.random() * prop.options.length);
                    result[key] = [
                        getOption(prop.options[randomIndex]),
                    ];
                }
                else {
                    result[key] = [];
                }
                break;
            case "checkbox":
                result[key] = prop.options
                    .filter(() => Math.random() < 0.5)
                    .map((option) => getOption(option));
                break;
            case "text":
                result[key] =
                    prop.defaultValue || generateRandomString();
                break;
            case "color":
                result[key] = generateRandomColor();
                break;
            case "date":
                result[key] = generateRandomDate();
                break;
        }
    }
    return result;
}
// 辅助函数
function getOption(option) {
    return typeof option === "string"
        ? { label: option, value: option }
        : option;
}
function generateRandomString(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}
function generateRandomColor() {
    return ("#" +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0"));
}
function generateRandomDate() {
    const start = new Date(2000, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split("T")[0]; // 返回 YYYY-MM-DD 格式
}
