# main.py
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes, edges):
    """
    Checks if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Khan's algorithm or DFS. Here, a simple DFS approach.
    """
    from collections import defaultdict

    adj_list = defaultdict(list)
    for edge in edges:
        source = edge['source']
        target = edge['target']
        adj_list[source].append(target)

    visited = set()
    recursion_stack = set()

    def dfs(node):
        visited.add(node)
        recursion_stack.add(node)

        for neighbor in adj_list[node]:
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in recursion_stack:
                return True

        recursion_stack.remove(node)
        return False

    # Check for cycles in all disconnected components
    # We iterate over all nodes to ensure we cover disconnected parts of the graph
    node_ids = {node['id'] for node in nodes}
    
    for node_id in node_ids:
        if node_id not in visited:
            if dfs(node_id):
                return False # Cycle detected

    return True

@app.post('/pipelines/parse')
def parse_pipeline(nodes: str = Form(...), edges: str = Form(...)):
    parsed_nodes = json.loads(nodes)
    parsed_edges = json.loads(edges)
    
    num_nodes = len(parsed_nodes)
    num_edges = len(parsed_edges)
    is_dag_result = is_dag(parsed_nodes, parsed_edges)

    return {
        'num_nodes': num_nodes, 
        'num_edges': num_edges, 
        'is_dag': is_dag_result
    }
