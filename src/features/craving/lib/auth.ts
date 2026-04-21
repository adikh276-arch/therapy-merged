const USER_ID_KEY = 'eap_user_id';

export async function resolveUser(): Promise<number | null> {
    // 1. Check sessionStorage
    const stored = sessionStorage.getItem(USER_ID_KEY);
    if (stored) return parseInt(stored, 10);

    // 2. Check URL for token
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
        console.warn('No token found in URL. Tracker requires a session token.');
        return null;
    }

    // 3. Validate with external API
    try {
        const response = await fetch('https://api.mantracare.com/user/user-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) throw new Error('Token validation failed');

        const data = await response.json();
        const userId: number = data.user_id;

        if (!userId) throw new Error('Invalid user ID received');

        // 4. Store and clean URL
        sessionStorage.setItem(USER_ID_KEY, String(userId));
        window.history.replaceState({}, document.title, window.location.pathname);

        return userId;
    } catch (err) {
        console.error('Authentication error:', err);
        return null;
    }
}

export function getUserId(): number | null {
    const stored = sessionStorage.getItem(USER_ID_KEY);
    return stored ? parseInt(stored, 10) : null;
}

export function clearSession(): void {
    sessionStorage.removeItem(USER_ID_KEY);
}
