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
    // Regex to match {{ variable }}
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(variableRegex)];
    const variables = matches.map(match => match[1]);

    // Use Set to get unique variable names
    const uniqueVariables = [...new Set(variables)];

    const newHandles = uniqueVariables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable,
      // Dynamic positioning: spread them out evenly or stack them
      // Starting from a bit lower to avoid the header
      style: { top: `${(index + 1) * 30 + 40}px`, background: '#6366f1' }
    }));

    // Add the default output handle
    newHandles.push({
      type: 'source',
      position: Position.Right,
      id: 'output',
      style: { background: '#6366f1' }
    });

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
      style={{ height: 'auto', minHeight: '150px' }} // Allow node to grow
    >
      <label style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            minHeight: '60px',
            fontFamily: 'inherit',
            marginTop: '5px',
            boxSizing: 'border-box'
          }}
          rows={1}
        />
      </label>
    </BaseNode>
  );
}
