'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
    return (
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 5000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: 'green',
                        secondary: 'white',
                    },
                },
            }}
        />
    );
}
