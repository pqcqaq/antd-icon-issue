import React from "react";
import { WbArray, WbIcon, WbProps } from "webot-core/lib/types/Element";
import Array from "webot-core/lib/components/base/Array";
import Icon from "webot-core/lib/components/base/Icon";
import { BlockPropsText } from "webot-core/lib/types/Block";

// Elements definition
export const elements: [WbArray<[WbIcon]>, WbArray<[WbIcon]>] = [
    // Social Media Icons
    {
        type: "array",
        maxItem: 3,
        minItem: 1,
        item: [
            {
                type: "icon",
                tags: [],
                name: "FacebookOutlined",
                maxTextLength: 5,
            },
        ],
    },
    // Sponsor Logos
    {
        type: "array",
        maxItem: 5,
        minItem: 1,
        item: [
            {
                type: "icon",
                tags: [],
                name: "TaobaoCircleFilled",
                maxTextLength: 0,
            },
        ],
    },
];

export const blockPropsDef: {
    companyName: BlockPropsText;
} = {
    companyName: {
        name: "公司名称",
        description: "公司名称",
        type: "text",
        defaultValue: "公司名称",
    },
};

export const Block: React.FC<WbProps<typeof elements, typeof blockPropsDef>> = (
    props,
) => {
    const { width, data, blockProps } = props;
    const { companyName } = blockProps;
    const [socialIcons, sponsorLogos] = data;

    if (width === "lg") {
        return (
            <div className="w-full">
                <div className=" text-black">
                    <div className="flex justify-center gap-5">
                        <Array
                            arr={socialIcons}
                            className="flex flex-row w-full items-center h-full"
                        >
                            {({ item }) => {
                                return (
                                    <div className="h-full flex w-full justify-center border py-5">
                                        <Icon {...item[0]} size="30px" />
                                    </div>
                                );
                            }}
                        </Array>
                    </div>
                </div>
                <div className="bg-black text-white py-5">
                    <p className="text-center text-3xl">{companyName}</p>
                </div>
                <div className="bg-gray-900 text-white py-5">
                    <div className="flex flex-row">
                        <div className="ml-5">赞助商</div>
                        <div className="ml-auto mr-5">版权所有</div>
                    </div>
                    <div className="flex flex-row">
                        <Array
                            arr={sponsorLogos}
                            className="flex flex-row gap-5 ml-5"
                        >
                            {({ item }) => <Icon {...item[0]} />}
                        </Array>
                        <div className="flex ml-auto text-sm text-center items-center mr-5">
                            <p>
                                Copyright 2024, {companyName}. All Rights
                                Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (width === "sm") {
        // 纵向排列
        return (
            <div className="w-full">
                <div className=" text-black">
                    <div className="flex justify-center">
                        <Array
                            arr={socialIcons}
                            className="flex flex-col w-full items-center h-full"
                        >
                            {({ item }) => (
                                <div className="flex w-full justify-center border py-5 h-20">
                                    <Icon {...item[0]} size="30px" />
                                </div>
                            )}
                        </Array>
                    </div>
                </div>
                <div className="bg-black text-white py-5">
                    <p className="text-center text-3xl">{companyName}</p>
                </div>
                <div className="bg-gray-900 text-white py-5">
                    <div className="flex flex-col gap-1">
                        <div className="ml-5">赞助商</div>

                        <Array
                            arr={sponsorLogos}
                            className="flex flex-row gap-5 ml-5"
                        >
                            {({ item }) => <Icon {...item[0]} />}
                        </Array>
                        <div className="ml-auto mr-5">版权所有</div>

                        <div className="flex ml-auto text-sm text-center items-center mr-5">
                            <p>
                                Copyright 2024, {companyName}. All Rights
                                Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export const name = "社交媒体和赞助商";
