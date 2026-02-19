// dateNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DateNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            label="Date"
            handles={[{ type: 'source', position: Position.Right, id: 'date' }]}
        >
            <div>
                <span>{new Date().toLocaleDateString()}</span>
            </div>
        </BaseNode>
    );
};
