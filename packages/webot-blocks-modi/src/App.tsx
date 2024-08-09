/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
    TabList,
    TabGroup,
    Tab,
    TabPanels,
    TabPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PropsBlock, WbElement, WbProps } from "webot-core/lib/types/Element";
import { groups } from "./blocks";
import Panel from "webot-core/lib/components/panel/Panel";
import {
    BlockMeta,
    BlockProps,
    Options,
    PropsData,
    PropsDef,
} from "webot-core/lib/types/Block";
import ResizableWrapper from "webot-core/lib/components/utils/ResizableWrapper";
import { Resizable } from "re-resizable";
import { generateDefaultProps } from "webot-core/lib/utils/mock";
import HighlightDom from "webot-core/lib/components/panel/HighlightDom";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return <input {...props} className="border" />;
};

type BlockRender<Elements extends WbElement[]> = (props: {
    data?: PropsBlock<Elements>;
    Render: (props: WbProps<Elements>) => React.ReactElement;
    blockMetaInfo?: BlockMeta;
    blockPropsData?: PropsData<any>;
}) => React.ReactElement;

type Category = {
    key: string;
    name: string;
    cpn: BlockRender<any>;
};

const Wide = <Elements extends WbElement[]>(props: {
    data?: PropsBlock<Elements>;
    Render: (props: WbProps<Elements>) => React.ReactElement;
    blockMetaInfo?: BlockMeta;
    blockPropsData?: PropsData<any>;
}) => {
    const minPageWidth = 768;
    const maxPageWidth = 1440;
    const { data, Render, blockMetaInfo, blockPropsData } = props;
    const [screenWidth, setScreenWidth] = useState(1280);

    return (
        <div
            className="flex flex-col items-center bg-gray-100 min-w-full p-4"
            style={{
                height: "calc(100vh - 100px)",
            }}
        >
            <div className="overflow-y-scroll w-full flex-1 bg-gray-50 shadow-lg rounded-lg flex flex-col p-4">
                <div className="mx-auto" style={{ width: screenWidth }}>
                    {data && (
                        <div className="border-2 border-gray-400 border-dashed rounded-lg main-container">
                            <ResizableWrapper
                                breakpointWidth={1280}
                                style={
                                    blockMetaInfo && {
                                        ...blockMetaInfo.style,
                                    }
                                }
                            >
                                <Render
                                    width="lg"
                                    data={data}
                                    blockProps={blockPropsData || {}}
                                />
                            </ResizableWrapper>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 flex flex-col items-center w-full max-w-sm gap-4 mt-4 bg-white shadow-md rounded-lg">
                <Slider
                    min={minPageWidth}
                    max={maxPageWidth}
                    value={screenWidth}
                    onChange={(value) => setScreenWidth(value as number)}
                    className="w-full"
                />
                <div className="text-center">
                    <span className="text-gray-700">屏幕宽度：</span>
                    <span className="text-gray-900 font-bold">
                        {screenWidth}
                    </span>
                </div>
            </div>
        </div>
    );
};

const Narrow = <Elements extends WbElement[]>(props: {
    data?: PropsBlock<Elements>;
    Render: (props: WbProps<Elements>) => React.ReactElement;
    blockMetaInfo?: BlockMeta;
    blockPropsData?: PropsData<any>;
}) => {
    const minPageWidth = 360;
    const maxPageWidth = 768;
    const { data, Render, blockMetaInfo, blockPropsData } = props;
    const [screenWidth, setScreenWidth] = useState(480);

    return (
        <div
            className="flex flex-col items-center bg-gray-100 min-w-full p-4"
            style={{
                height: "calc(100vh - 100px)",
            }}
        >
            <div className="overflow-y-scroll w-full flex-1 bg-gray-50 shadow-lg rounded-lg flex flex-col p-4">
                <div className="mx-auto" style={{ width: screenWidth }}>
                    {data && (
                        <div className="border-2 border-gray-400 border-dashed rounded-lg main-container">
                            <ResizableWrapper
                                breakpointWidth={680}
                                style={
                                    blockMetaInfo && {
                                        ...blockMetaInfo.style,
                                    }
                                }
                            >
                                <Render
                                    width="sm"
                                    data={data}
                                    blockProps={blockPropsData || {}}
                                />
                            </ResizableWrapper>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 flex flex-col items-center w-full max-w-sm gap-4 mt-4 bg-white shadow-md rounded-lg">
                <Slider
                    min={minPageWidth}
                    max={maxPageWidth}
                    value={screenWidth}
                    onChange={(value) => setScreenWidth(value as number)}
                    className="w-full"
                />
                <div className="text-center">
                    <span className="text-gray-700">屏幕宽度：</span>
                    <span className="text-gray-900 font-bold">
                        {screenWidth}
                    </span>
                </div>
            </div>
        </div>
    );
};

const categories: Category[] = [
    {
        key: "lg",
        name: "宽屏",
        cpn: Wide,
    },
    {
        key: "sm",
        name: "窄屏",
        cpn: Narrow,
    },
];

const BlockPropsPanel: React.FC<{
    blockPropsDef: BlockProps;
    blockPropsData: PropsData<any>;
    onChange: (data: PropsData<any>) => void;
}> = (props) => {
    const { blockPropsDef, blockPropsData, onChange } = props;

    const handleChange = (key: string, value: any) => {
        console.log(blockPropsData, key, value);
        onChange({
            ...blockPropsData,
            [key]: value,
        });
    };

    const renderInput = (key: string, value: PropsDef) => {
        switch (value.type) {
            case "boolean":
                return (
                    <Input
                        type="checkbox"
                        checked={(blockPropsData[key] as boolean) || false}
                        onChange={(e) => handleChange(key, e.target.checked)}
                    />
                );
            case "checkbox":
            case "radio":
                return (
                    <div>
                        {(value.options as Options[]).map(
                            (option, optionIdx) => (
                                <label key={optionIdx}>
                                    <Input
                                        type={value.type}
                                        value={option.value || ""}
                                        checked={
                                            Array.isArray(
                                                blockPropsData[key],
                                            ) &&
                                            (
                                                blockPropsData[key] as Options[]
                                            ).some(
                                                (opt) =>
                                                    opt.value === option.value,
                                            )
                                        }
                                        onChange={(e) => {
                                            let newValue: Options[];
                                            if (value.type === "checkbox") {
                                                newValue = e.target.checked
                                                    ? [
                                                          ...(blockPropsData[
                                                              key
                                                          ] as Options[]),
                                                          option,
                                                      ]
                                                    : (
                                                          blockPropsData[
                                                              key
                                                          ] as Options[]
                                                      ).filter(
                                                          (opt) =>
                                                              opt.value !==
                                                              option.value,
                                                      );
                                            } else {
                                                // radio
                                                newValue = [option];
                                            }
                                            handleChange(key, newValue);
                                        }}
                                    />
                                    {option.label}
                                </label>
                            ),
                        )}
                    </div>
                );
            case "color":
                return (
                    <Input
                        type="color"
                        value={(blockPropsData[key] as string) || "#000000"}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                );
            case "date":
                return (
                    <Input
                        type="date"
                        value={(blockPropsData[key] as string) || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                );
            case "text":
            default:
                return (
                    <Input
                        type="text"
                        value={(blockPropsData[key] as string) || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                );
        }
    };

    return (
        <div className="flex flex-col gap-4">
            Block Props
            {Object.entries(blockPropsDef).map(([key, value], idx) => (
                <div key={idx} className="flex items-center gap-4">
                    <label>{value.name}</label>
                    {renderInput(key, value)}
                </div>
            ))}
        </div>
    );
};

const Console = <Elements extends WbElement[]>(props: {
    elements: Elements;
    Render: (props: WbProps<Elements>) => React.ReactElement;
    setOpen: (open: boolean) => void;
    blockName: string;
    blockMetaInfo?: BlockMeta;
    blockPropsDef?: BlockProps;
}) => {
    const {
        elements,
        Render,
        setOpen,
        blockName,
        blockMetaInfo,
        blockPropsDef,
    } = props;
    const [data, setData] = useState<PropsBlock<typeof elements> | undefined>(
        undefined,
    );

    const [blockProps, setBlockProps] = useState<PropsData<any>>(
        generateDefaultProps(blockPropsDef || {}),
    );

    const [hoverd, setHoverd] = useState<string>("none");

    return (
        <div className="w-screen h-screen flex flex-row justify-center bg-gray-50">
            <div className="w-full flex flex-row h-full">
                <div className="flex-1 bg-white shadow-md rounded-lg m-4">
                    <TabGroup className="h-full flex flex-col">
                        <TabList className="flex justify-around w-full border-b border-gray-200">
                            {categories.map((ele) => (
                                <Tab
                                    key={ele.key}
                                    className="bg-gray-100 flex-1 p-1 text-2xl font-semibold text-blue-500 hover:text-blue-700 focus:outline-none data-[selected]:text-blue-700 data-[selected]:bg-white data-[hover]:bg-gray-50"
                                >
                                    {ele.name}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels className="flex-1 p-4">
                            {categories.map((ele) => (
                                <TabPanel key={ele.key} className="h-full">
                                    <ele.cpn
                                        data={data}
                                        Render={Render}
                                        blockMetaInfo={blockMetaInfo}
                                        blockPropsData={blockProps}
                                    />
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                </div>
                <div className="w-96 bg-white shadow-md rounded-lg m-4 flex flex-col items-stretch border-l-2 border-gray-200 p-4">
                    <div className="p-4 text-2xl font-semibold text-orange-500 border-b border-gray-200">
                        控制台
                    </div>
                    <div className="flex justify-center p-4">
                        <button
                            className="inline-flex items-center gap-2 rounded-md bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => setOpen(true)}
                        >
                            {blockName}
                        </button>
                    </div>
                    <Resizable
                        className="overflow-y-scroll border-b-2"
                        defaultSize={{ width: "100%", height: "160px" }}
                        maxHeight={"50%"}
                        minHeight={"100px"}
                        enable={{ bottom: true }}
                    >
                        <BlockPropsPanel
                            blockPropsDef={blockPropsDef || {}}
                            blockPropsData={blockProps}
                            onChange={(data) => {
                                setBlockProps(data);
                            }}
                        />
                    </Resizable>
                    <div className="overflow-y-scroll flex-1">
                        <Panel
                            elements={elements}
                            onDataChanged={(data) => {
                                setData(data);
                            }}
                            onHover={setHoverd}
                        />
                    </div>
                </div>
            </div>
            <HighlightDom selector={{ id: hoverd }} />
        </div>
    );
};

const BlockSelector: React.FC<{
    selected:
        | {
              elements: WbElement[];
              name: string;
              Render: (props: any) => React.ReactElement;
              meta?: BlockMeta;
              blockPropsDef?: BlockProps;
          }
        | undefined;
    onSelect: (
        elements: WbElement[],
        name: string,
        Render: (props: any) => React.ReactElement,
        meta?: BlockMeta,
        blockPropsDef?: BlockProps,
    ) => void;
    defaultSelect: boolean;
}> = (props) => {
    const { selected, onSelect, defaultSelect } = props;

    const [openGroup, setOpenGroup] = useState<string | null>(null);

    useEffect(() => {
        if (defaultSelect) {
            const savedName = localStorage.getItem("selectedBlockName");
            if (savedName) {
                for (const group of groups) {
                    const block = group.blocks.find(
                        (b) => b.name === savedName,
                    );
                    if (block) {
                        onSelect(
                            block.elements,
                            block.name,
                            block.Block,
                            block.meta,
                            block.blockPropsDef,
                        );
                        return;
                    }
                }
            }
        }

        const savedOpenGroup = localStorage.getItem("openGroup");
        if (savedOpenGroup) {
            setOpenGroup(savedOpenGroup);
        }
    }, [defaultSelect, onSelect, groups]);

    const checkBlock = (
        elements: WbElement[],
        name: string,
        Render: (props: any) => React.ReactElement,
        meta: BlockMeta | undefined,
        def: BlockProps | undefined,
    ) => {
        if (selected?.name !== name || Render !== selected?.Render) {
            localStorage.setItem("selectedBlockName", name);
            onSelect(elements, name, Render, meta, def);
        }
    };

    const handleDisclosureToggle = (groupName: string) => {
        if (openGroup === groupName) {
            setOpenGroup(null);
            localStorage.removeItem("openGroup");
        } else {
            setOpenGroup(groupName);
            localStorage.setItem("openGroup", groupName);
        }
    };

    return (
        <div className="h-full w-full bg-gray-100 m-auto">
            <div className="mx-auto w-full max-w-lg divide-y divide-gray-200 rounded-xl bg-white shadow-lg">
                {groups.map(({ name: groupName, blocks }, idx) => (
                    <Disclosure
                        key={idx}
                        as="div"
                        className="p-6"
                        style={{ width: "400px" }}
                        defaultOpen={openGroup === groupName}
                    >
                        {({ open }) => (
                            <>
                                <DisclosureButton
                                    className="group flex w-full items-center justify-between text-gray-900"
                                    onClick={() =>
                                        handleDisclosureToggle(groupName)
                                    }
                                >
                                    <span className="text-lg font-bold group-hover:text-gray-700">
                                        {groupName}:
                                    </span>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 transform transition-transform duration-300 ${
                                            open ? "rotate-180" : ""
                                        } group-hover:text-gray-500`}
                                    />
                                </DisclosureButton>
                                <DisclosurePanel
                                    className={`mt-2 text-sm text-gray-700 overflow-hidden transition-all duration-500 transform ${
                                        open
                                            ? "max-h-screen opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    {blocks.length > 0 ? (
                                        <div>
                                            {blocks.map(
                                                (
                                                    {
                                                        name,
                                                        Block,
                                                        elements,
                                                        meta,
                                                        blockPropsDef,
                                                    },
                                                    idx,
                                                ) => (
                                                    <div
                                                        className="flex justify-between items-center p-2"
                                                        key={idx}
                                                    >
                                                        <span>{name}</span>
                                                        <button
                                                            onClick={() =>
                                                                checkBlock(
                                                                    elements,
                                                                    name,
                                                                    Block,
                                                                    meta,
                                                                    blockPropsDef,
                                                                )
                                                            }
                                                            className={`flex items-center px-2 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                                                selected?.name ===
                                                                name
                                                                    ? "bg-indigo-700"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <PencilIcon className="w-4 h-4 mr-1" />
                                                            编辑
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        "尚无数据"
                                    )}
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    );
};

const App: React.FC<any> = () => {
    const [selected, setSelected] = useState<
        | undefined
        | {
              elements: WbElement[];
              name: string;
              Render: (props: any) => React.ReactElement;
              meta?: BlockMeta;
              blockPropsDef?: BlockProps;
          }
    >(undefined);

    const [open, setOpen] = useState(false);

    if (!selected) {
        return (
            <div className="h-screen relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <BlockSelector
                        onSelect={(elements, name, Render, meta, def) =>
                            setSelected({
                                elements,
                                name,
                                Render,
                                meta,
                                blockPropsDef: def,
                            })
                        }
                        selected={selected}
                        defaultSelect={true}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Console
                elements={selected.elements}
                Render={selected.Render}
                setOpen={setOpen}
                blockName={selected.name}
                blockMetaInfo={selected.meta}
                blockPropsDef={selected.blockPropsDef}
            />
            <Dialog
                open={open}
                as="div"
                className="relative z-10 focus:outline-none h-screen"
                onClose={() => setOpen(false)}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 backdrop-blur">
                        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg ring-1 ring-black ring-opacity-5">
                            <DialogTitle
                                as="h3"
                                className="text-xl font-medium"
                            >
                                挑选组件
                            </DialogTitle>
                            <BlockSelector
                                onSelect={(
                                    elements,
                                    name,
                                    Render,
                                    meta,
                                    def,
                                ) => {
                                    setSelected(undefined);
                                    setTimeout(() => {
                                        setSelected({
                                            elements,
                                            name,
                                            Render,
                                            meta,
                                            blockPropsDef: def,
                                        });
                                    });
                                    setOpen(false);
                                }}
                                selected={selected}
                                defaultSelect={false}
                            />
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default App;
