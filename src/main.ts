import { MarkdownPostProcessorContext, Notice, Plugin } from "obsidian";

import "./main.css";

export default class ObsidianAdmonition extends Plugin {
    async onload(): Promise<void> {
        console.log("Links in Code Blocks loaded");

        this.registerMarkdownCodeBlockProcessor(
            "links",
            this.postprocessor.bind(this)
        );
        
    }
    async postprocessor(
        src: string,
        el: HTMLElement,
        ctx: MarkdownPostProcessorContext
    ) {
        let code = createEl("pre").createEl("code");
        if (/\[\[([\s\S]+?)\]\]/g.test(src)) {
            src = src.replace(/\[\[([\s\S]+?)\]\]/g, (match, link) => {
                const fileLink = this.app.metadataCache.getFirstLinkpathDest(
                    link,
                    link
                );
                let div = createDiv();
                if (fileLink && fileLink.path) {
                    let linkNode = div.createEl("a", {
                        attr: {
                            "data-href": fileLink.path,
                            href: fileLink.path,
                            target: "_blank",
                            rel: "noopener"
                        },
                        cls: "internal-link",
                        text: fileLink.name
                    });
                    console.log(
                        "🚀 ~ file: main.ts ~ line 36 ~ ObsidianAdmonition ~ src.replace ~ linkNode",
                        div.innerHTML
                    );
                    return div.innerHTML;
                }
                return match;
            });

            code.innerHTML = src;
            el.replaceWith(code.parentElement);
        }
    }
    onunload() {
        console.log("Links in Code Blocks loaded");
    }
}
