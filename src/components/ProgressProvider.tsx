'use client';

import { AppProgressProvider } from '@bprogress/next';

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppProgressProvider
            height="4px"
            color="bg-gold"
            options={{ showSpinner: false }}
            shallowRouting
        >
            {children}
        </AppProgressProvider>
    );
};
