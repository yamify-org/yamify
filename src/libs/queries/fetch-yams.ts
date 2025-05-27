
import { SelectYam } from "@/types/server";

async function fetchYams({ workspaceId }: { workspaceId: string }) {
    const response = await fetch(`/api/yams/${workspaceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch yams');
    }
    const data: SelectYam[] = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
    }
    return data;
}

export default fetchYams;