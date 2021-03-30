import {
    MarkdownPostProcessorContext,
    MarkdownRenderer,
    Plugin
} from "obsidian";

import * as Prism from "./prism.js";
export default class LinksInCodeBlock extends Plugin {
    async onload(): Promise<void> {
        console.log("Links in Code Blocks loaded");

        this.registerMarkdownPostProcessor(this.postprocessor.bind(this));
    }
    async postprocessor(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        if (!el.querySelector('code[class*="language-links"]')) return;

        let blocks = el.querySelectorAll(`code[class*="language-links"]`);

        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const pre = block.parentElement;
            pre.removeChild(block);
            let newBlock = pre.createEl("code");

            let larr = Array.prototype.join
                .call(block.classList, "::")
                .match(/language-links\|(\w+)(?:\:\:)?/);

            let innerHTML = block.innerHTML.split(/(\[\[[\s\S]+?\]\])/g);

            for (const htmlBlock of innerHTML) {
                let code = createEl("code");
                code.addClasses(Array.prototype.slice.call(block.classList));
                console.log(htmlBlock);
                if (/\[\[([\s\S]+)\]\]/.test(htmlBlock)) {
                    const tempLinkElement = createDiv();

                    await MarkdownRenderer.renderMarkdown(
                        htmlBlock,
                        tempLinkElement,
                        "",
                        this.app.workspace.activeLeaf.view
                    );
                    code.innerHTML = tempLinkElement.getElementsByTagName(
                        "a"
                    )[0].outerHTML;
                } else {
                    code.innerHTML = htmlBlock;
                    if (larr && larr.length && Prism) {
                        code.removeClass(`language-links|${larr[1]}`);
                        code.addClass(`language-${larr[1]}`);
                        console.log(code);
                        Prism.highlightElement(code);

                        if (!newBlock.hasClass(`language-${larr[1]}`)) {
                            newBlock.addClass(`language-${larr[1]}`);
                        }
                    }
                }
                code.addClass("is-loaded");
                newBlock.innerHTML += code.innerHTML;
            }
        }
    }
    onunload() {
        console.log("Links in Code Blocks unloaded");
    }
}
