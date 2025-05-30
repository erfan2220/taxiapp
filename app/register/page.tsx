'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('passenger'); // 'driver' or 'passenger'
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ذخیره کاربر در localStorage (ساده)
        localStorage.setItem('user', JSON.stringify({ name, role }));
        router.push('/profile');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6">ثبت‌نام</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    type="text"
                    placeholder="نام"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="passenger">مسافر</option>
                    <option value="driver">راننده</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    ثبت‌نام
                </button>
            </form>
        </div>
    );
}
