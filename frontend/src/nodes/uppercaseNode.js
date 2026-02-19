// uppercaseNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const UppercaseNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            label="Uppercase"
            handles={[
                { type: 'target', position: Position.Left, id: 'input' },
                { type: 'source', position: Position.Right, id: 'output' }
            ]}
        >
            <div>
                <span>Transforms text to UPPERCASE</span>
            </div>
        </BaseNode>
    );
};
