// timeNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TimeNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            label="Time"
            handles={[{ type: 'source', position: Position.Right, id: 'time' }]}
        >
            <div>
                <span>{new Date().toLocaleTimeString()}</span>
            </div>
        </BaseNode>
    );
};
