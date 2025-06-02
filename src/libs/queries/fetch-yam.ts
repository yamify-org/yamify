
import { SelectYam } from "@/types/server";

async function fetchYams({ name }: { name: string }) {
    const response = await fetch(`/api/yams/get/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch yam');
    }
    const data: SelectYam = await response.json();

    return data;
}

export default fetchYams;