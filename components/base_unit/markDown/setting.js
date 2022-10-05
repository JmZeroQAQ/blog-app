const shortcutKey = [
    {
        name: "markdown-bold",
        bindKey: {win: "Ctrl-B", mac: "Command-B"},
        exec: (e) => {
            let text = e.session.getTextRange(e.getSelectionRange());
            e.insert('**' + text + '**');
        }
    },
    {
        name: "markdown-dividLine",
        bindKey: {win: "Ctrl-H"},
        exec: (e) => {
            e.insert('----');
        }
    },
    {
        name: "markdown-italic",
        bindKey: {win: "Ctrl-I"},
        exec: (e) => {
            let text = e.session.getTextRange(e.getSelectionRange());
            e.insert('*' + text + '*');
        }
    },
    {
        name: "markdown-link",
        bindKey: {win: "Ctrl-L"},
        exec: (e) => {
            let text = e.session.getTextRange(e.getSelectionRange());
            e.insert(`[${text}](https://) `);
        }
    },
    {
        name: "markdown-imageLink",
        bindKey: {win: "Ctrl-Shift-I"},
        exec: (e) => {
            let text = e.session.getTextRange(e.getSelectionRange());
            e.insert(`![${text}](https://) `);
        }
    },
    {
        name: "markdown-codesBlock",
        bindKey: {win: "Ctrl-K"},
        exec: (e) => {
            let text = e.session.getTextRange(e.getSelectionRange());
            e.insert(`\`\`\`\n${text}\n\`\`\``);
        }
    },

    {
        name: "markdown-code",
        bindKey: {win: "Ctrl-P"},
        exec: (e) => {
            let text = e.session.getTextRange(e.getSelectionRange());
            e.insert(`\`${text}\``);
        }
    },
];

const placeholder = `
请输入内容,支持markdown语法
支持直接粘贴图片

<Ctrl + Q> 预览
<Ctrl + B> 加粗
<Ctrl + H> 分割线
<Ctrl + I> 斜体
<Ctrl + L> 链接
<Ctrl + K> 插入代码块
<Ctrl + P> 插入一行代码
<Ctrl + Shift + I> 插入图片链接

`;

export {
    shortcutKey,
    placeholder,
}