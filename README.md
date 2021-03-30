# Links in Code Blocks

Use the \`\`\`links language to allow internal Obsidian links.

````markdown
```links
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. [[Path/To/Note.md]]
```
````

If you tell the plugin what language you're writing, it will run Obsidian's language highlighter:

````markdown
```links|java
#include

int main(int argc, char** argv)
{
/* add your codes here */
	printf("hello world ! \n");
	return 0;
	[[Path\To\Note]]
}
```
````

Currently supports all [languages supported by Prism.js](https://prismjs.com/#supported-languages).

## Installation

### From GitHub

-   Download the Latest Release from the Releases section of the GitHub Repository
-   Copy the `main.js` and `manifest.json` files from the release to your vault's plugins folder: `<vault>/.obsidian/plugins/`  
    Note: On some machines the `.obsidian` folder may be hidden. On MacOS you should be able to press `Command+Shift+Dot` to show the folder in Finder.
-   Reload Obsidian
-   If prompted about Safe Mode, you can disable safe mode and enable the plugin.
    Otherwise head to Settings, third-party plugins, make sure safe mode is off and
    enable the plugin from there.

## Warning

This plugin comes with no guarantee of stability and bugs may delete data.
Please ensure you have automated backups.
