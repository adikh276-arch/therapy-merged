export async function validateToken(token: string): Promise<number | null> {
    try {
        const response = await fetch("https://api.mantracare.com/user/user-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.user_id;
    } catch (error) {
        console.error("Auth error:", error);
        return null;
    }
}

export function getSessionUserId(): string | null {
    return sessionStorage.getItem("user_id");
}

export function setSessionUserId(userId: number) {
    sessionStorage.setItem("user_id", userId.toString());
}

export function logout() {
    sessionStorage.removeItem("user_id");
    window.location.href = "/token";
}
