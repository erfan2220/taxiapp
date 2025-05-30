'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleLogin = () => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) {
            alert('کاربری ثبت‌نام نکرده است.');
            return;
        }

        const user = JSON.parse(savedUser);
        if (user.name !== name) {
            alert('نام وارد شده نادرست است.');
            return;
        }

        if (user.role === 'passenger') router.push('/book');
        else if (user.role === 'driver') router.push('/driver-dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6">ورود</h1>
            <input
                type="text"
                placeholder="نام"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-sm border p-2 rounded"
            />
            <button
                onClick={handleLogin}
                className="mt-4 w-full max-w-sm bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                ورود
            </button>
        </div>
    );
}
