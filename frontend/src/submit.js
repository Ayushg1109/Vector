// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Modal } from './components/Modal';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', message: '', type: 'info' });
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => setModalInfo(prev => ({ ...prev, isOpen: false }));

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('nodes', JSON.stringify(nodes));
            formData.append('edges', JSON.stringify(edges));

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.statusText}`);
            }

            const data = await response.json();

            setModalInfo({
                isOpen: true,
                title: 'Pipeline Analysis',
                type: 'success',
                message: (
                    <div>
                        <p><strong>Number of Nodes:</strong> {data.num_nodes}</p>
                        <p><strong>Number of Edges:</strong> {data.num_edges}</p>
                        <p><strong>Is DAG:</strong> {data.is_dag ? 'Yes' : 'No'}</p>
                    </div>
                )
            });

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setModalInfo({
                isOpen: true,
                title: 'Error',
                type: 'error',
                message: 'Failed to submit pipeline. Please ensure the backend server is running and try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button type="submit" onClick={handleSubmit} disabled={isLoading} style={{
                    padding: '8px 16px',
                    backgroundColor: isLoading ? '#94a3b8' : '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontWeight: 500,
                    fontSize: '14px',
                    transition: 'background-color 0.2s',
                    marginTop: '10px'
                }}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            <Modal
                isOpen={modalInfo.isOpen}
                onClose={closeModal}
                title={modalInfo.title}
                type={modalInfo.type}
            >
                {modalInfo.message}
            </Modal>
        </>
    );
}
