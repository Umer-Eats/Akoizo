'use client';
import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Circle, CircleMarker } from 'leaflet';
import { MapPin, Search, LocateFixed, X } from 'lucide-react';
import { useAuth, authMessage } from './auth-context';
import { ATTENDANCE_RADIUS_METERS } from '@/lib/attendance';
import 'leaflet/dist/leaflet.css';

export type WorkshopLocation = { name: string; latitude: number; longitude: number };
export function AttendanceMap({
  initial,
  onSelect,
  onClose,
}: {
  initial: WorkshopLocation | null;
  onSelect: (location: WorkshopLocation) => void;
  onClose: () => void;
}) {
  const { request } = useAuth();
  const dialog = useRef<HTMLDialogElement>(null),
    container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null),
    ring = useRef<Circle | null>(null),
    marker = useRef<CircleMarker | null>(null);
  const [selected, setSelected] = useState<WorkshopLocation | null>(initial);
  const [query, setQuery] = useState(''),
    [results, setResults] = useState<WorkshopLocation[]>([]);
  const [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  const choose = (location: WorkshopLocation) => {
    setSelected(location);
    setResults([]);
  };
  useEffect(() => {
    dialog.current?.showModal();
    let disposed = false;
    void import('leaflet')
      .then((L) => {
        if (disposed || !container.current) return;
        const center: [number, number] = initial
          ? [initial.latitude, initial.longitude]
          : [39.5, -98.35];
        const instance = L.map(container.current).setView(center, initial ? 14 : 4);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(instance);
        ring.current = L.circle(center, {
          radius: ATTENDANCE_RADIUS_METERS,
          color: '#6366f1',
          fillOpacity: 0.13,
          weight: 2,
        }).addTo(instance);
        marker.current = L.circleMarker(center, {
          radius: 7,
          color: '#fff',
          weight: 3,
          fillColor: '#6366f1',
          fillOpacity: 1,
        }).addTo(instance);
        if (!initial) {
          ring.current.setStyle({ opacity: 0, fillOpacity: 0 });
          marker.current.setStyle({ opacity: 0, fillOpacity: 0 });
        }
        instance.on('click', (e) =>
          choose({
            name: `Workshop location (${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)})`,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          }),
        );
        map.current = instance;
        instance.invalidateSize();
      })
      .catch(() => setError('The map could not load. Close and try again.'));
    return () => {
      disposed = true;
      map.current?.remove();
      map.current = null;
    };
    // The map is initialized once for this popup; selection updates below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!selected || !map.current) return;
    const point: [number, number] = [selected.latitude, selected.longitude];
    ring.current?.setLatLng(point).setStyle({ opacity: 1, fillOpacity: 0.13 });
    marker.current?.setLatLng(point).setStyle({ opacity: 1, fillOpacity: 1 });
    map.current.setView(point, Math.max(map.current.getZoom(), 14));
  }, [selected]);
  async function search() {
    setError('');
    setBusy(true);
    try {
      const data = await request<{ results: WorkshopLocation[] }>(
        `/api/attendance/locations?q=${encodeURIComponent(query)}`,
      );
      setResults(data.results);
      if (!data.results.length)
        setError('No matching addresses. Try a city, school name, or full address.');
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setBusy(false);
    }
  }
  function locate() {
    if (!navigator.geolocation) {
      setError('This browser does not support location. Select a point on the map.');
      return;
    }
    setBusy(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (p) => {
        choose({
          name: 'Workshop at my current location',
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
        });
        setBusy(false);
      },
      () => {
        setError(
          'Location unavailable. Allow browser location access or select a point on the map.',
        );
        setBusy(false);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 },
    );
  }
  return (
    <dialog
      ref={dialog}
      className="att-dialog att-map-dialog"
      aria-labelledby="map-title"
      onCancel={onClose}
    >
      <div className="att-dialog-head">
        <div>
          <span className="att-eyebrow">WORKSHOP LOCATION</span>
          <h2 id="map-title">Put your workshop on the map.</h2>
        </div>
        <button className="att-icon" aria-label="Close map" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <form
        className="att-address-search"
        onSubmit={(e) => {
          e.preventDefault();
          void search();
        }}
      >
        <Search size={18} />
        <input
          aria-label="Search workshop address"
          placeholder="Search a school, building, or address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          minLength={3}
          maxLength={200}
        />
        <button
          className="button button-primary button-small"
          disabled={busy || query.trim().length < 3}
        >
          Search
        </button>
      </form>
      {error && (
        <p className="att-error" role="alert">
          {error}
        </p>
      )}
      {results.length > 0 && (
        <ul className="att-map-results">
          {results.map((r, i) => (
            <li key={i}>
              <button onClick={() => choose(r)}>
                <MapPin size={16} />
                {r.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div
        ref={container}
        className="att-map"
        aria-label="Workshop map: select a point to set the location"
      />
      <div className="att-map-caption">
        <span>Click the map to place a pin. The circle shows the 0.5-mile check-in area.</span>
        <button type="button" className="text-link" onClick={locate} disabled={busy}>
          <LocateFixed size={15} /> Use my location
        </button>
      </div>
      <label className="att-label">
        Location name
        <input
          value={selected?.name ?? ''}
          placeholder="Select a point or search above"
          disabled={!selected}
          maxLength={500}
          onChange={(e) => selected && setSelected({ ...selected, name: e.target.value })}
        />
      </label>
      <div className="att-dialog-foot">
        <small>
          Address search powered by{' '}
          <a href="https://www.geoapify.com/" target="_blank" rel="noreferrer">
            Geoapify
          </a>
        </small>
        <button
          className="button button-primary"
          disabled={!selected?.name.trim()}
          onClick={() => selected && onSelect(selected)}
        >
          Use this location <MapPin size={16} />
        </button>
      </div>
    </dialog>
  );
}
