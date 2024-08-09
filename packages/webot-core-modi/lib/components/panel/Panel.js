import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Fieldset, Field, Label, Legend } from "@headlessui/react";
import _Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { createProxyArray, useThrottle, } from "../../utils/function.js";
import { caclRatio, generateDefaultData, generateMenuProps, generateMockImageUrl, generateMockText, genId, getHeight, } from "../../utils/mock.js";
const Slider = (props) => {
    return (_jsx(_Slider, { ...props, styles: {
            track: {
                backgroundColor: "LightSkyBlue",
            },
            rail: {
                backgroundColor: "LightGray",
            },
        } }));
};
const Input = (props) => {
    return _jsx("input", { ...props, className: "border" });
};
function Text(props) {
    const { element, data, onChange } = props;
    const { maxLength, minLength, tags, case: c } = element;
    return (_jsx("div", { className: "p-2 hover:bg-slate-100", children: _jsxs(Fieldset, { className: "m-1", children: [_jsx(Legend, { className: "text-base/7 font-semibold", children: "\u6587\u672C" }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "maxlength:" }), _jsx("div", { className: "inline", children: maxLength })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "minLength:" }), _jsx("div", { className: "inline", children: minLength })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "tags:" }), _jsx("div", { className: "inline", children: tags })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "case:" }), _jsx("div", { className: "inline", children: c })] }), _jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2", children: "length:" }), _jsx(Slider, { className: "inline w-1", max: maxLength, min: minLength, value: data?.value?.length, onChange: (length) => {
                                const value = generateMockText(length, c);
                                onChange({
                                    id: data?.id || "none",
                                    value,
                                });
                            } })] })] }) }));
}
function Image(props) {
    const { element, data, onChange } = props;
    const { minRatio, minWidth, maxRatio, maxWidth, tags } = element;
    const id = data?.id || "none";
    const [width, setWidth] = useState(minWidth);
    const [ratio, setRatio] = useState(minRatio);
    useEffect(() => {
        setWidth(data?.width || minWidth);
        const ratio = caclRatio(width, data?.height);
        setRatio(ratio);
    }, [data]);
    return (_jsx("div", { className: "p-2 hover:bg-slate-100", children: _jsxs(Fieldset, { className: "m-1", children: [_jsx(Legend, { className: "text-base/7 font-semibold", children: "\u56FE\u7247" }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "minRatio:" }), _jsx("div", { className: "inline", children: minRatio })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "maxRatio:" }), _jsx("div", { className: "inline", children: maxRatio })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "minWidth:" }), _jsx("div", { className: "inline", children: minWidth })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "maxWidth:" }), _jsx("div", { className: "inline", children: maxWidth })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "tags:" }), _jsx("div", { className: "inline", children: tags })] }), _jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2", children: "width:" }), _jsx(Slider, { className: "inline w-1", min: minWidth, max: maxWidth, value: width, onChange: (newWidth) => {
                                const height = Math.round(newWidth / ratio);
                                onChange({
                                    id,
                                    src: generateMockImageUrl(newWidth, height),
                                    width: newWidth,
                                    height,
                                });
                            } })] }), _jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2", children: "ratio:" }), _jsx(Slider, { className: "inline w-1", min: Math.round(minRatio * 1000), max: Math.round(maxRatio * 1000), value: Math.round(ratio * 1000), onChange: (newRatio) => {
                                const height = Math.round((width / newRatio) * 1000);
                                onChange({
                                    id,
                                    src: generateMockImageUrl(width, height),
                                    width,
                                    height,
                                });
                            } })] })] }) }));
}
function Button(props) {
    const { element, data, onChange } = props;
    const { size, case: c } = element;
    return (_jsx("div", { className: "p-2 hover:bg-slate-100", children: _jsxs(Fieldset, { className: "m-1", children: [_jsx(Legend, { className: "text-base/7 font-semibold", children: "\u6309\u94AE" }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "size:" }), _jsx("div", { className: "inline", children: size })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "case:" }), _jsx("div", { className: "inline", children: c })] }), _jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2", children: "text:" }), _jsx(Input, { className: "inline", value: data?.text, onChange: (e) => {
                                onChange({
                                    ...data,
                                    text: e.target.value,
                                });
                            } })] })] }) }));
}
function Menu(props) {
    const { element, data, onChange } = props;
    const { maxTextLength, level, maxTitleLength } = element;
    const [menuData, setMenuData] = useState(data);
    const [collapsed, setCollapsed] = useState({});
    const [currentLevel, _setCurrentLevel] = useState(level);
    const setCurrentLevel = (level) => {
        _setCurrentLevel(level);
        const mock = generateMenuProps(level, maxTextLength, maxTitleLength);
        setMenuData(mock);
        onChange(mock);
    };
    const handleTextChange = (id, text) => {
        const updateMenu = (menu) => {
            if (menu.id === id) {
                return { ...menu, text };
            }
            if ("childs" in menu) {
                return {
                    ...menu,
                    childs: menu.childs.map(updateMenu),
                };
            }
            return menu;
        };
        const updatedData = updateMenu(menuData);
        setMenuData(updatedData);
        onChange(updatedData);
    };
    const addMenuItem = (parentId) => {
        const newItemLeaf = {
            id: genId(),
            text: generateMockText(maxTextLength, "label"),
            type: "nav",
            url: "",
        };
        const updateMenu = (menu) => {
            if ("childs" in menu) {
                if (menu.id === parentId) {
                    return {
                        ...menu,
                        childs: [
                            ...menu.childs,
                            menu.level - 1 < 1
                                ? { ...newItemLeaf }
                                : {
                                    id: genId(),
                                    level: (menu.level -
                                        1),
                                    text: generateMockText(maxTextLength, "label"),
                                    childs: [newItemLeaf],
                                },
                        ],
                    };
                }
                return {
                    ...menu,
                    childs: menu.childs.map(updateMenu),
                };
            }
            return menu;
        };
        const updatedData = updateMenu(menuData);
        setMenuData(updatedData);
        onChange(updatedData);
    };
    const deleteMenuItem = (id) => {
        // 递归删除
        const deleteMenu = (menu) => {
            if ("childs" in menu) {
                return {
                    ...menu,
                    childs: menu.childs
                        .filter((child) => child.id !== id)
                        .map(deleteMenu),
                };
            }
            return menu;
        };
        const updatedData = deleteMenu(menuData);
        setMenuData(updatedData);
        onChange(updatedData);
    };
    const toggleCollapse = (id) => {
        setCollapsed((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    const onHover = (id) => {
        props.onHover?.(id);
    };
    const renderMenu = (menu) => {
        const isCollapsed = !!collapsed[menu?.id || "none"];
        if ("childs" in (menu || {})) {
            return (_jsxs("div", { onMouseEnter: () => onHover?.(menu?.id || "none"), className: "border p-2 mt-2", children: [_jsxs("div", { className: "font-bold flex justify-between items-center", children: [_jsxs("span", { children: ["Level ", menu?.level] }), menu?.childs.length > 0 && (_jsx("button", { onClick: () => toggleCollapse(menu?.id), className: "text-sm", children: isCollapsed ? "展开" : "折叠" }))] }), _jsx(Input, { placeholder: "Text", value: menu?.text || "", onChange: (e) => handleTextChange(menu?.id, e.target.value), className: "border p-1 mb-1" }), menu?.childs.length == 0 &&
                        menu?.level !== currentLevel && (_jsx("button", { onClick: () => deleteMenuItem(menu?.id), className: "bg-red-500 text-white p-1 ml-2", children: "\u5220\u9664" })), _jsxs("div", { className: isCollapsed
                            ? "max-h-0 overflow-hidden"
                            : "max-h-full", children: [menu?.childs.map(renderMenu), _jsx("button", { onClick: () => addMenuItem(menu?.id), className: "bg-gray-200 p-1 mt-2 w-full", children: menu?.level == 1
                                    ? "添加叶子项"
                                    : `添加${menu?.level - 1}级菜单项` })] }), isCollapsed && (_jsx("button", { onClick: () => toggleCollapse(menu?.id), className: "text-sm text-gray-500", children: "\u5DF2\u6298\u53E0" }))] }, menu?.id));
        }
        return (_jsxs("div", { onMouseEnter: () => onHover?.(menu?.id || "none"), className: "border p-2 mt-2 flex justify-between items-center", children: [_jsx(Input, { placeholder: "Text", value: menu?.text || "", onChange: (e) => handleTextChange(menu?.id || "", e.target.value), className: "border p-1 mb-1" }), _jsx("button", { onClick: () => deleteMenuItem(menu?.id || ""), className: "bg-red-500 text-white p-1 ml-2", children: "\u5220\u9664" })] }, menu?.id));
    };
    return (_jsx("div", { className: "p-2 hover:bg-slate-100", children: _jsxs(Fieldset, { className: "m-1", children: [_jsx(Legend, { className: "text-base/7 font-semibold", children: "\u83DC\u5355" }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "\u6700\u5927\u6807\u9898\u957F\u5EA6:" }), _jsx("div", { className: "inline", children: maxTitleLength })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "\u6700\u5927\u6807\u7B7E\u957F\u5EA6:" }), _jsx("div", { className: "inline", children: maxTextLength })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "\u5C42\u7EA7:" }), _jsx("div", { className: "inline", children: currentLevel }), _jsx(Slider, { min: 1, max: 3, value: currentLevel, onChange: (level) => setCurrentLevel(level) })] }), _jsx("div", { children: renderMenu(menuData) })] }) }));
}
function Icon(props) {
    const { element, data, onChange } = props;
    return (_jsxs(Fieldset, { className: "m-1", children: [_jsx(Legend, { className: "text-base/7 font-semibold", children: "\u56FE\u6807" }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "name:" }), _jsx("div", { className: "inline", children: element.name })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "maxTextLength:" }), _jsx("div", { className: "inline", children: element.maxTextLength })] }), _jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2", children: "text:" }), _jsx(Input, { className: "inline", value: data?.text, onChange: (e) => {
                            data.text = e.target.value;
                            onChange(data);
                        } })] })] }));
}
function Background(props) {
    const { element, data, onChange } = props;
    const { minRatio, maxRatio, minWidth, maxWidth } = element;
    const color = data?.color || "#ffffff";
    const src = data?.src || "";
    const fit = data?.fit || "cover";
    const [useImage, setUseImage] = useState(!!src);
    const [width, setWidth] = useState(minWidth);
    const [ratio, setRatio] = useState(minRatio);
    useEffect(() => {
        setWidth(data?.width || minWidth);
        const ratio = caclRatio(width, data?.height);
        setRatio(ratio);
    }, [data]);
    const handleColorChange = (newColor) => {
        onChange({ ...data, color: newColor });
    };
    const handleFitChange = (newFit) => {
        onChange({ ...data, fit: newFit });
    };
    const handleImageToggle = (checked) => {
        setUseImage(checked);
        if (checked) {
            const newSrc = generateMockImageUrl(width, getHeight(width, ratio));
            onChange({ ...data, src: newSrc });
        }
        else {
            onChange({ ...data, src: "" });
        }
    };
    const handleWidthChange = (newWidth) => {
        setWidth(newWidth);
        const newSrc = generateMockImageUrl(newWidth, getHeight(width, ratio));
        console.log("data", data);
        onChange({ ...data, src: newSrc, width: newWidth });
    };
    const handleRatioChange = (newRatio) => {
        setRatio(newRatio);
        const newSrc = generateMockImageUrl(width, getHeight(width, newRatio));
        console.log("data", data);
        onChange({ ...data, src: newSrc, height: getHeight(width, newRatio) });
    };
    return (_jsx("div", { className: "p-2 hover:bg-slate-100", children: _jsxs(Fieldset, { className: "m-1", children: [_jsx(Legend, { className: "text-base/7 font-semibold", children: "\u80CC\u666F" }), _jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2", children: "\u989C\u8272:" }), _jsx(Input, { type: "color", value: color, onChange: (e) => {
                                useThrottle(handleColorChange, 100)(e.target.value);
                            } }), color] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "\u9002\u914D\u65B9\u5F0F:" }), _jsx("div", { children: ["cover", "contain", "fill", "none", "scale-down"].map((f) => (_jsxs("label", { className: "inline-flex items-center mr-2", children: [_jsx("input", { type: "radio", checked: fit === f, onChange: () => handleFitChange(f), className: "form-radio" }), _jsx("span", { className: "ml-2", children: f })] }, f))) })] }), _jsxs(Field, { children: [_jsx(Label, { className: "inline mr-2", children: "\u4F7F\u7528\u56FE\u7247:" }), _jsx("input", { type: "checkbox", checked: useImage, onChange: (e) => handleImageToggle(e.target.checked) })] }), useImage && (_jsxs(_Fragment, { children: [_jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2 w-14", children: "\u5BBD\u5EA6:" }), _jsx(Slider, { className: "inline w-1", min: minWidth, max: maxWidth, value: width, onChange: (w) => handleWidthChange(w) })] }), _jsxs(Field, { className: "flex flex-row items-center", children: [_jsx(Label, { className: "inline mr-2 w-14", children: "\u6BD4\u4F8B:" }), _jsx(Slider, { className: "inline w-1", min: Math.round(minRatio * 1000), max: Math.round(maxRatio * 1000), value: Math.round(ratio * 1000), onChange: (r) => handleRatioChange(r / 1000) })] })] }))] }) }));
}
export default function Panel(props) {
    const { elements, onHover } = props;
    const [data, setData] = useState(undefined);
    const onDataChanged = (data2) => {
        setData(data2);
        props.onDataChanged(data2);
    };
    useEffect(() => {
        setData(undefined);
        const data2 = generateDefaultData(elements);
        onDataChanged(data2);
    }, [elements]);
    if (data) {
        return (_jsx("div", { className: "flex flex-col gap-2", onMouseLeave: () => onHover?.("none"), children: elements.map((ele, idx) => {
                const { type } = ele;
                switch (type) {
                    case "text":
                        return (_jsx("div", { className: "panel-text", onMouseEnter: () => onHover?.(data[idx].id), children: data[idx]
                                ?.id && (_jsx(Text, { data: data[idx], element: ele, onChange: (d) => {
                                    data.splice(idx, 1, d);
                                    const data2 = [
                                        ...data,
                                    ];
                                    onDataChanged(data2);
                                } })) }, idx));
                    case "image":
                        return (_jsx("div", { className: "panel-image", onMouseEnter: () => onHover?.(data[idx].id), children: data[idx]
                                ?.id && (_jsx(Image, { data: data[idx], element: ele, onChange: (d) => {
                                    data.splice(idx, 1, d);
                                    const data2 = [
                                        ...data,
                                    ];
                                    onDataChanged(data2);
                                } })) }, idx));
                    case "button":
                        return (_jsx("div", { className: "panel-button", onMouseEnter: () => onHover?.(data[idx].id), children: data[idx]
                                ?.id && (_jsx(Button, { data: data[idx], element: ele, onChange: (d) => {
                                    data.splice(idx, 1, d);
                                    const data2 = [
                                        ...data,
                                    ];
                                    onDataChanged(data2);
                                } })) }, idx));
                    case "menu":
                        return (_jsx("div", { className: "panel-menu", onMouseEnter: () => onHover?.(data[idx].id), children: data[idx]
                                ?.id && (_jsx(Menu, { data: data[idx], element: ele, onChange: (d) => {
                                    data.splice(idx, 1, d);
                                    const data2 = [
                                        ...data,
                                    ];
                                    onDataChanged(data2);
                                }, onHover: (id) => {
                                    onHover?.(id);
                                } })) }, idx));
                    case "icon": {
                        return (_jsx("div", { className: "panel-icon hover:bg-slate-100", onMouseEnter: () => onHover?.(data[idx].id), children: data[idx]
                                ?.id && (_jsx(Icon, { data: data[idx], element: ele, onChange: (d) => {
                                    data.splice(idx, 1, d);
                                    const data2 = [
                                        ...data,
                                    ];
                                    onDataChanged(data2);
                                } })) }, idx));
                    }
                    case "background":
                        return (_jsx("div", { className: "panel-background", onMouseEnter: () => onHover?.(data[idx].id), children: data[idx]
                                ?.id && (_jsx(Background, { data: data[idx], element: ele, onChange: (d) => {
                                    data.splice(idx, 1, d);
                                    const data2 = [
                                        ...data,
                                    ];
                                    onDataChanged(data2);
                                } })) }, idx));
                    case "array":
                        return (_jsxs("div", { className: "panel-array border border-gray-300 rounded-lg p-4 mr-2", children: [_jsx("div", { className: "text-base/7 font-semibold", children: "WbArray" }), ele.item && (_jsxs(_Fragment, { children: [_jsx(Panel, { elements: ele.item, onDataChanged: (d) => {
                                                const proxied = createProxyArray(d, ele.maxItem);
                                                let data2 = [
                                                    ...data,
                                                ];
                                                data2[idx] = proxied;
                                                onDataChanged(data2);
                                            }, onHover: (id) => {
                                                onHover?.(id);
                                            } }), "\u5143\u7D20\u6570\u91CF", _jsxs("div", { className: "infos", children: ["\u6700\u5C11\uFF1A", ele.minItem, " \u2014\u2014 \u6700\u5927\uFF1A", ele.maxItem] }), _jsx(Slider, { className: "w-1", min: ele.minItem, max: ele.maxItem, value: data[idx]?.length || 0, onChange: (length) => {
                                                data[idx]["set-length"] =
                                                    length;
                                                onDataChanged([
                                                    ...data,
                                                ]);
                                            } })] }))] }, idx));
                    default:
                        return null;
                }
            }) }));
    }
    return null;
}
