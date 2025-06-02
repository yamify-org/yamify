// write a function to fetch the list of workspaces from the route handler /workspaces/list

import { SelectWorkspace } from "@/types/server";

async function fetchWorkspaceList() {
    const response = await fetch('/api/workspaces/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch workspaces');
    }
    const data: SelectWorkspace[] = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
    }
    return data;
}
export default fetchWorkspaceList;