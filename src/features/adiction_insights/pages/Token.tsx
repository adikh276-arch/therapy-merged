const TokenPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
            <div className="max-w-md space-y-4">
                <h1 className="text-2xl font-bold">Access Token Required</h1>
                <p className="text-muted-foreground">
                    Please provide a valid token in the URL to access Quit Mantra.
                </p>
                <div className="rounded-lg bg-card p-4 shadow-sm">
                    <code className="text-sm">?token=YOUR_UUID</code>
                </div>
            </div>
        </div>
    );
};

export default TokenPage;
