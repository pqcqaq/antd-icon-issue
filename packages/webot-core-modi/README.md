# webot-core

webot核心组件库及数据结构定义



## WbElement基本组件(base)的定义及使用

### WbText组件

- 用法：

    1. 定义WbText参数：

        ```ts
        {
          type: "text",
          maxLength: 50,
          minLength: 25,
          case: "body",
          tags: [],
        }
        ```

    2. 在组件中使用：

        ```tsx
        const { width, data } = props;
        const [content] = data;
        
        <Text {...content} />
        ```

    **可以提供给用户调整的props信息：**

    - text: 文本内容
        - 限制条件：maxLength（最大长度），minLength（最小长度）

- 组件获得的props定义：

    ```ts
    export interface PropsText extends PropsWbElement {
        value: string;
    }
    ```

    

### WbButton组件

- 用法：

    1. 定义WbButton参数：

        ```ts
        {
            type: "button",
            size: "small",
            case: "primary",
            tags: [],
        },
        ```

    2. 在组件中使用：

        ```tsx
        const { width, data } = props;
        const [buttonContent] = data;
        
        <Button {...buttonContent} />
        ```

    **可以提供给用户调整的props信息：**

    - text: 按钮上显示的文本
    - actionDef: 定义按钮点击行为
        - action: "open" (在新窗口打开URL) 或 "nav" (在当前窗口导航到URL)
        - url: 目标URL

- 组件获得的props定义

    ```ts
    export interface PropsWbButton extends PropsWbElement {
        text: string;
        actionDef: {
            action: "open" | "nav";
            url: string;
        };
        size: WbButton["size"];
        case: WbButton["case"];
    }
    ```

    

### WbImage组件

- 用法：

    1. 定义WbImage参数：

        ```ts
        {
            type: "image",
            maxRatio: 1.2,
            minRatio: 0.8,
            minWidth: 160,
            maxWidth: 300,
            tags: [],
        },
        ```

    2. 在组件中使用：

        ```tsx
        const { width, data } = props;
        const [imageContent] = data;
        
        <Image {...imageContent} />
        ```

    **可以提供给用户调整的props信息：**

    - src: 图片的URL源地址（必填）(用户使用时提供上传方式)
    - alt: 图片的替代文本（可选）

- 组件获得的props定义

    ```ts
    export interface PropsImage extends PropsWbElement {
        src: string;
        alt?: string;
    }
    ```

    

### WbMenu组件

- 用法：

    1. 定义WbMenu参数：

        ```ts
        {
            type: "menu",
            maxTextLength: 15,
            maxTitleLength: 5,
            level: 2,
            tags: [],
        },
        ```

    2. 在组件中使用：

        ```tsx
        const { width, data } = props;
        const [menuContent] = data;
        
        <Menu {...menuContent} />
        ```

    **可以提供给用户调整的props信息：**

    - level: 菜单层级，可选值为 1, 2, 或 3
    - text: 菜单标题（可选）
    - childs: 子菜单项数组，可以是PropsMenu（有子菜单）或PropsMenuLeaf（叶子节点）
    - orientation: 菜单方向，可选值为 "horizontal" 或 "vertical"（默认）

    **对于菜单项（PropsMenuLeaf）：**

    - text: 菜单项文本
    - type: 点击行为，"open"（在新窗口打开）或 "nav"（在当前窗口导航）
    - url: 目标URL

- 组件获得的props定义

    ```ts
    export interface PropsMenuLeaf extends PropsWbElement {
        text: string;
        type: "open" | "nav";
        url: string;
    }
    
    export interface PropsMenu extends PropsWbElement {
        level: 3 | 2 | 1;
        text?: string;
        childs: PropsMenu[] | PropsMenuLeaf[];
    }
    ```

    

> 注意：Menu组件的适用范围小，建议设计师拿到props数据后自己进行设计，例如
>
> ```tsx
> <div className="hidden md:flex items-center space-x-1">
>     {menu.childs &&
>         menu.childs.map((item) => (
>             <NavItem key={item.id} {...item} />
>         ))}
> </div>
> ```



### WbIcon组件

- 用法：

    1. 定义WbIcon参数：

        ```ts
        {
            type: "icon",
            tags: [],
            name: "FacebookOutlined",
            maxTextLength: 5,
        },
        ```

    2. 在组件中使用：

        ```tsx
        const { width, data } = props;
        const [iconContent] = data;
        
        <Icon {...iconContent} />
        ```

    **可以提供给用户调整的props信息：**

    - name: 图标名称（必填，类型为IconName）(用户使用时应该显示一个选择的面板，可以从中选择一个预定的icon)
    - text: 图标旁边显示的文本（可选）

- 组件获得的props定义

    ```ts
    export interface PropsIcon extends PropsWbElement {
        name: IconName;
        text: string;
    }
    ```

    

### WbArray组件

- 用法：

    1. 定义WbArray参数：

        ```ts
        {
          type: "array",
          maxItem: 5,
          minItem: 2,
          item: [
            // 定义数组项的结构，例如：
            {
              type: "image",
              maxRatio: 1.2,
              minRatio: 0.8,
              minWidth: 160,
              maxWidth: 300,
              tags: ["avatar"],
            },
            {
              type: "text",
              maxLength: 12,
              minLength: 6,
              case: "title",
              tags: [],
            },
            // ... 其他元素
          ]
        }
        ```

    2. 在组件中使用：

        ```tsx
        const { width, data } = props;
        const [arr, btn] = data;
        
        <Array arr={arr} className="flex space-x-8">
          {({ item, index }) => {
            const [img, title, desc] = item;
            return (
              // 渲染每个数组项的内容
            );
          }}
        </Array>
        ```

    **可以提供给用户调整的props信息：**

    - arr: 包含数组项数据的数组
        - 用户可以对这个Array的数据源进行调整，控制每一个元素的信息

- 组件获得的props定义

    ```ts
    /**
     * Array是一系列的Blocks
     */
    export interface PropsArray<Item extends WbBlock>
        extends Array<PropsBlock<Item>> {}
    ```

    



### WbBackground组件

- 用法：

1. 定义WbBackground参数（与图片定义相似）：

    ```ts
    {
      type: "background",
      maxRatio: 2,
      minRatio: 0.5,
      minWidth: 300,
      maxWidth: 1200,
    }
    ```

2. 在组件中使用：

    ```tsx
    const { width, data } = props;
    const [backgroundContent] = data;
    
    <Background {...backgroundContent} >
      {/* 子内容 */}
    </Background>
    ```

**可以提供给用户调整的props信息：**

- color: 背景颜色（可选）
- src: 背景图片的URL（可选）
- fit: 背景图片的填充方式，可选值包括 "cover", "contain", "fill", "none", "scale-down"（默认为"cover"）
    - 对用户操作来说，会提供一个调色盘和是否使用背景图的选项，如果使用背景图，则提供上传图片的方式

嵌套：在Background中可以嵌套另一个Background，以实现更加复杂的效果（需要Block设计师的才华）

- 组件获得的props定义

    ```ts
    export interface PropsBackground extends PropsWbElement {
        color: string;
        src: string;
        fit: ImageFit;
    }
    ```

    

