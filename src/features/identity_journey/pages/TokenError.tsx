import { useTranslation } from "react-i18next";

const TokenError = () => {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <div className="max-w-md w-full bg-background p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">Authentication Failed</h1>
                <p className="text-muted-foreground mb-8">
                    Your session could not be verified. Please try accessing the application from the portal again.
                </p>
                <button
                    onClick={() => window.location.href = "https://platform.mantracare.com"}
                    className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                    Return to Portal
                </button>
            </div>
        </div>
    );
};

export default TokenError;
