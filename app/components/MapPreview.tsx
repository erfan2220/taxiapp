'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MapPreview({
                                       pickup,
                                       destination,
                                   }: {
    pickup: [number, number];
    destination: [number, number];
}) {
    return (
        <MapContainer
            center={pickup}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={pickup} icon={markerIcon} />
            <Marker position={destination} icon={markerIcon} />
        </MapContainer>
    );
}
