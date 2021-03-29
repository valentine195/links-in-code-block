import {
    MarkdownPostProcessorContext,
    MarkdownRenderer,
    Plugin
} from "obsidian";

const { Prism } = window;

export default class LinksInCodeBlock extends Plugin {
    async onload(): Promise<void> {
        console.log("Links in Code Blocks loaded");

        this.registerMarkdownPostProcessor(this.postprocessor.bind(this));
    }
    async postprocessor(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        if (!el.querySelector('code[class*="language-links"]')) return;

        let blocks = el.querySelectorAll(`code[class*="language-links"]`);

        blocks.forEach((block: HTMLElement) => {
            const pre = block.parentElement;
            pre.removeChild(block);
            let newBlock = pre.createEl("code");

            let larr = Array.prototype.join
                .call(block.classList, "::")
                .match(/language-links\|(\w+)(?:\:\:)?/);

            let innerHTML = block.innerHTML.split(/(\[\[[\s\S]+?\]\])/g);

            innerHTML.forEach((htmlBlock) => {
                let code = createEl("code");
                code.addClasses(Array.prototype.slice.call(block.classList));
                if (/\[\[([\s\S]+)\]\]/.test(htmlBlock)) {
                    const [, link] = htmlBlock.match(/\[\[([\s\S]+)\]\]/);
                    const fileLink = this.app.metadataCache.getFirstLinkpathDest(
                        link,
                        link
                    );
                    const div = createDiv();
                    if (fileLink && fileLink.path) {
                        div.createEl("a", {
                            attr: {
                                "data-href": fileLink.path,
                                href: fileLink.path,
                                target: "_blank",
                                rel: "noopener"
                            },
                            cls: "internal-link",
                            text: link
                        });
                    } else {
                        div.createEl("a", {
                            attr: {
                                "data-href": link,
                                href: link,
                                target: "_blank",
                                rel: "noopener"
                            },
                            cls: "internal-link is-unresolved",
                            text: link
                        });
                    }
                    code.innerHTML = div.innerHTML;
                } else {
                    code.innerHTML = htmlBlock;
                    if (larr && larr.length && Prism) {
                        code.removeClass(`language-links|${larr[1]}`);
                        code.addClass(`language-${larr[1]}`);
                        Prism.highlightElement(code);
                    }
                }
                code.addClass("is-loaded");
                newBlock.innerHTML += code.innerHTML;
            });
        });
    }
    onunload() {
        console.log("Links in Code Blocks unloaded");
    }
}
