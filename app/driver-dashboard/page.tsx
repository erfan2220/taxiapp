'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapPreview = dynamic(() => import('@/app/components/MapPreview'), {
    ssr: false,
});

type TripStatus = 'pending' | 'accepted' | 'on-the-way' | 'completed';

type Trip = {
    pickup: [number, number];
    destination: [number, number];
    distance: number;
    estimatedPrice: number;
    status: TripStatus;
};

export default function DriverDashboard() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedTrips = localStorage.getItem('trips');

        if (storedUser) setCurrentUser(JSON.parse(storedUser));
        if (storedTrips) setTrips(JSON.parse(storedTrips));
    }, []);

    const handleStatusChange = (index: number, newStatus: TripStatus) => {
        const updated = [...trips];
        updated[index].status = newStatus;
        localStorage.setItem('trips', JSON.stringify(updated));
        setTrips(updated);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">داشبورد راننده</h1>

            {trips.length === 0 && <p>درخواستی برای نمایش وجود ندارد.</p>}

            <ul className="space-y-4">
                {trips.map((trip, index) => (
                    <li key={index} className="border p-4 rounded shadow">
                        <p>فاصله: <b>{trip.distance} کیلومتر</b></p>
                        <p>قیمت: <b>{trip.estimatedPrice.toFixed(0)} تومان</b></p>
                        <p>وضعیت:
                            <b className={
                                trip.status === 'pending' ? 'text-red-600' :
                                    trip.status === 'accepted' ? 'text-blue-600' :
                                        trip.status === 'on-the-way' ? 'text-yellow-600' :
                                            'text-green-600'
                            }>
                                {
                                    trip.status === 'pending' ? 'در انتظار' :
                                        trip.status === 'accepted' ? 'پذیرفته‌شده' :
                                            trip.status === 'on-the-way' ? 'در حال حرکت' :
                                                'انجام‌شده ✅'
                                }
                            </b>
                        </p>

                        <div className="h-52 w-full my-2 rounded overflow-hidden">
                            <MapPreview pickup={trip.pickup} destination={trip.destination} />
                        </div>

                        {trip.status === 'pending' && (
                            <button
                                onClick={() => handleStatusChange(index, 'accepted')}
                                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                قبول سفر
                            </button>
                        )}

                        {trip.status === 'accepted' && (
                            <button
                                onClick={() => handleStatusChange(index, 'on-the-way')}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                شروع سفر
                            </button>
                        )}

                        {trip.status === 'on-the-way' && (
                            <button
                                onClick={() => handleStatusChange(index, 'completed')}
                                className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                            >
                                پایان سفر
                            </button>
                        )}

                        {trip.status === 'completed' && (
                            <p className="text-green-700 font-bold mt-2">سفر انجام شده ✅</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
