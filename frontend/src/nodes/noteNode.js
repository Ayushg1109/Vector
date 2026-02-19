// noteNode.js
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            label="Note"
            // Notes typically don't have handles, or maybe just one for connection
            handles={[]}
            style={{ backgroundColor: '#fffec8' }}
        >
            <div style={{ padding: '5px' }}>
                <textarea
                    style={{ width: '100%', height: '60px', border: 'none', background: 'transparent', resize: 'none' }}
                    placeholder="Type a note..."
                />
            </div>
        </BaseNode>
    );
};
