
export const isExceedRateLimit = async (ip: string, token: string | undefined) => {

    const response = await fetch(`${process.env.BASE_URL}/api/ratelimit`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip, token })
    });

    const data = await response.json();
    
    return {
        status: response.status,
        ...data
    }
}