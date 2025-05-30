'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L from 'leaflet';

// آیکون ساده‌تر برای جلوگیری از ارور leaflet
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function BookPage() {
    const [pickup, setPickup] = useState<[number, number] | null>(null);
    const [destination, setDestination] = useState<[number, number] | null>(null);

    function LocationPicker() {
        useMapEvents({
            click(e) {
                if (!pickup) {
                    setPickup([e.latlng.lat, e.latlng.lng]);
                } else if (!destination) {
                    setDestination([e.latlng.lat, e.latlng.lng]);
                }
            },
        });
        return null;
    }

    function getDistanceKm() {
        if (!pickup || !destination) return 0;
        const [lat1, lon1] = pickup;
        const [lat2, lon2] = destination;
        const R = 6371; // شعاع زمین (کیلومتر)
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return +(R * c).toFixed(2);
    }

    const distance = getDistanceKm();
    const estimatedPrice = distance * 7; // قیمت فرضی هر کیلومتر ۷ واحد

    const handleConfirm = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const trip = {
            pickup,
            destination,
            distance,
            estimatedPrice,
            status: 'pending',
            owner: user.name || 'ناشناس'
        };

        const trips = JSON.parse(localStorage.getItem('trips') || '[]');
        trips.push(trip);
        localStorage.setItem('trips', JSON.stringify(trips));
        alert('درخواست سفر ثبت شد!');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">درخواست سفر</h1>
            <div className="h-96 w-full mb-4">
                <MapContainer center={[35.6892, 51.389]} zoom={13} className="h-full w-full z-0">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationPicker />
                    {pickup && <Marker position={pickup} icon={markerIcon} />}
                    {destination && <Marker position={destination} icon={markerIcon} />}
                </MapContainer>
            </div>

            {pickup && destination && (
                <div className="mb-4">
                    <p>فاصله تقریبی: <b>{distance} کیلومتر</b></p>
                    <p>قیمت تخمینی: <b>{estimatedPrice.toFixed(0)} تومان</b></p>
                    <button
                        onClick={handleConfirm}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        تایید و ارسال درخواست
                    </button>
                </div>
            )}

            {!pickup && <p>ابتدا روی نقشه برای انتخاب مبدا کلیک کنید.</p>}
            {pickup && !destination && <p>اکنون روی مقصد کلیک کنید.</p>}
        </div>
    );
}
