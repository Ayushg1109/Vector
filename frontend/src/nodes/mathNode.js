// mathNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            label="Math"
            handles={[
                { type: 'target', position: Position.Left, id: 'a', style: { top: '30%' } },
                { type: 'target', position: Position.Left, id: 'b', style: { top: '60%' } },
                { type: 'source', position: Position.Right, id: 'result' }
            ]}
        >
            <div>
                <span>Operation: Add</span>
            </div>
        </BaseNode>
    );
};
