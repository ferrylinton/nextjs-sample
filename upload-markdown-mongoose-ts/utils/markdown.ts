import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import "highlight.js/styles/github.css";

const md = MarkdownIt()
    .use(highlightjs, {
        register: {
            cypher: require('highlightjs-cypher')
        }
    });

export const render = (str: string) : string => {
    return md.render(str)
}