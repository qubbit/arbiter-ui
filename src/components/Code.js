import React from 'react';
import Markdown from './Markdown';
import 'prismjs/themes/prism.css';

const Code = ({ source, language }) => (
  <Markdown content={'```' + language + source + '```'} />
);

Code.defaultProps = {
  language: 'js'
};

export default Code;
