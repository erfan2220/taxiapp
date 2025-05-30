'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);
    const [trips, setTrips] = useState<any[]>([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedTrips = localStorage.getItem('trips');


        if (storedUser && storedTrips) {
            const currentUser = JSON.parse(storedUser);
            const allTrips = JSON.parse(storedTrips);
            const userTrips = allTrips.filter((t: any) => t.owner === currentUser.name);

            setUser(currentUser);
            setTrips(userTrips);
        }


        if (!storedUser) {
            router.push('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
        if (storedTrips) setTrips(JSON.parse(storedTrips));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (!user) return null;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">پروفایل کاربر</h1>
            <p><b>نام:</b> {user.name}</p>
            <p><b>نقش:</b> {user.role === 'passenger' ? 'مسافر' : 'راننده'}</p>

            <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                خروج از حساب
            </button>

            <hr className="my-6" />
            <h2 className="text-xl font-semibold mb-2">تاریخچه سفرها</h2>
            <ul className="space-y-3">
                {trips.length === 0 && <p>هیچ سفری ثبت نشده است.</p>}
                {trips.map((trip, index) => (
                    <li key={index} className="border rounded p-3">
                        <p>فاصله: <b>{trip.distance} کیلومتر</b></p>
                        <p>قیمت: <b>{trip.estimatedPrice} تومان</b></p>
                        <p>وضعیت: <b>{trip.status === 'pending' ? 'در انتظار' : 'پذیرفته‌شده'}</b></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
