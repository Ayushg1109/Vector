// submit.js

// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({
        nodes: state.nodes,
        edges: state.edges
    }));

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('nodes', JSON.stringify(nodes));
            formData.append('edges', JSON.stringify(edges));

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            alert(`Number of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit pipeline. Check console for details.');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
