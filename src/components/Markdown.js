import React from 'react';
import marked from 'marked';
import Prism from 'prismjs';

const prettify = markdown =>
  markdown.replace(/```(?:javascript|jsx?)([\s\S]+?)```/g, (match, code) => {
    return `<pre class="language-js"><code class="language-js">${Prism.highlight(
      code,
      Prism.languages.js
    )}</code></pre>`;
  });

const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
  const id = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `<h${level} id="${id}">${text} <a href="#${id}">#</a></h${level}>`;
};

const Markdown = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(prettify(content), { renderer })
      }}
    />
  );
};

export default Markdown;
