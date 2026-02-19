// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Parse variables and update handles
  useEffect(() => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(variableRegex)];
    const variables = matches.map(match => match[1]);
    const uniqueVariables = [...new Set(variables)];

    const newHandles = uniqueVariables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable,
      style: { top: `${(index + 1) * 20 + 50}px` } // Simple dynamic positioning
    }));

    // Add the default output handle
    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });

    setHandles(newHandles);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Text"
      handles={handles}
      style={{ height: 'auto', minHeight: '100px' }}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            minHeight: '30px',
            fontFamily: 'inherit'
          }}
          rows={1}
        />
      </label>
    </BaseNode>
  );
}
