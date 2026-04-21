import React from 'react';
const Token: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground text-center p-4">
            <div>
                <h1 className="text-2xl font-bold text-destructive mb-2">Authentication Failed</h1>
                <p className="text-muted-foreground">Please access the application using a valid token.</p>
            </div>
        </div>
    );
};
export default Token;
