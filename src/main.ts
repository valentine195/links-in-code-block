import {
    MarkdownPostProcessorContext,
    MarkdownRenderer,
    Plugin
} from "obsidian";

//import "./main.css";

export default class LinksInCodeBlock extends Plugin {
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
        MarkdownRenderer.renderMarkdown(
            src,
            el,
            ctx.sourcePath,
            this.app.workspace.activeLeaf.view
        );
    }
    onunload() {
        console.log("Links in Code Blocks unloaded");
    }
}
