// BaseNode.js
import { Handle } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({ id, label, children, handles = [], style = {} }) => {
    return (
        <div className="base-node" style={{ ...style }}>
            {/* Render handles dynamically */}
            {handles.map((handle, index) => (
                <Handle
                    key={`${id}-${handle.id}-${index}`}
                    type={handle.type}
                    position={handle.position}
                    id={`${id}-${handle.id}`}
                    style={handle.style}
                    className="node-handle"
                />
            ))}

            <div className="node-header">
                <span>{label}</span>
            </div>

            <div className="node-content">
                {children}
            </div>
        </div>
    );
};
