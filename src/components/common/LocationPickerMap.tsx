import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Crosshair,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Compass,
  Navigation
} from 'lucide-react';

interface NominatimSearchResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    road?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    city_district?: string;
    state?: string;
    postcode?: string;
  };
}

export interface LocationPickerChange {
  lat: number;
  lng: number;
  address: string;
  wardHint?: string;
  accuracyMeters?: number;
}

interface LocationPickerMapProps {
  latitude: number | null;
  longitude: number | null;
  formattedAddress: string;
  onLocationChange: (loc: LocationPickerChange) => void;
  className?: string;
}

// Custom modern SVG Marker Icon to avoid Leaflet broken asset paths in bundlers
const createCustomMarkerIcon = () => {
  const svg = `
    <div style="position: relative; width: 36px; height: 44px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); cursor: grab;">
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 0C8.05887 0 0 8.05887 0 18C0 29.5 18 44 18 44C18 44 36 29.5 36 18C36 8.05887 27.9411 0 18 0Z" fill="#2563EB"/>
        <path d="M18 2C9.16344 2 2 9.16344 2 18C2 28.2 17 41.2 18 42C19 41.2 34 28.2 34 18C34 9.16344 26.8366 2 18 2Z" fill="#1D4ED8"/>
        <circle cx="18" cy="18" r="8" fill="white"/>
        <circle cx="18" cy="18" r="4" fill="#2563EB"/>
      </svg>
      <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 3px; background: rgba(0,0,0,0.25); border-radius: 50%; filter: blur(1px);"></div>
    </div>
  `;
  return L.divIcon({
    html: svg,
    className: 'smartcitizen-custom-marker',
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
  });
};

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  latitude,
  longitude,
  formattedAddress,
  onLocationChange,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Default coordinate (Pune Civic Municipal Area as standard demo default)
  const defaultLat = 18.5204;
  const defaultLng = 73.8567;

  // Active coordinates
  const currentLat = latitude ?? defaultLat;
  const currentLng = longitude ?? defaultLng;

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NominatimSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Status & GPS state
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsSuccessAccuracy, setGpsSuccessAccuracy] = useState<number | null>(null);

  // Reverse geocode helper (rate-limit safe Nominatim query)
  const performReverseGeocode = useCallback(
    async (lat: number, lng: number, accuracyMeters?: number) => {
      setIsReverseGeocoding(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Reverse geocoding service unavailable');
        }

        const data = await response.json();
        const fullAddress = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        // Extract ward/zone hint if available in Nominatim metadata
        const addr = data.address || {};
        const wardHint =
          addr.suburb || addr.neighbourhood || addr.city_district || addr.county || undefined;

        onLocationChange({
          lat,
          lng,
          address: fullAddress,
          wardHint,
          accuracyMeters,
        });
      } catch {
        // Fallback to formatted coordinates string if Nominatim fails or user is offline
        const fallbackAddress = `Pin at ${lat.toFixed(6)}° N, ${lng.toFixed(6)}° E (Manual Pin)`;
        onLocationChange({
          lat,
          lng,
          address: fallbackAddress,
          accuracyMeters,
        });
      } finally {
        setIsReverseGeocoding(false);
      }
    },
    [onLocationChange]
  );

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: [currentLat, currentLng],
      zoom: latitude && longitude ? 16 : 14,
      zoomControl: false,
    });

    // Add OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Zoom Controls top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Create Draggable Marker
    const marker = L.marker([currentLat, currentLng], {
      icon: createCustomMarkerIcon(),
      draggable: true,
      autoPan: true,
    }).addTo(map);

    // Marker drag end event
    marker.on('dragend', () => {
      const position = marker.getLatLng();
      setGpsSuccessAccuracy(null);
      setGpsError(null);
      performReverseGeocode(position.lat, position.lng);
    });

    // Map click event
    map.on('click', (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      setGpsSuccessAccuracy(null);
      setGpsError(null);
      performReverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Invalidate map size to prevent tile clipping
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []); // Run once on mount

  // Sync external coordinates when changed externally (e.g. from GPS)
  useEffect(() => {
    if (latitude && longitude && mapInstanceRef.current && markerRef.current) {
      const cur = markerRef.current.getLatLng();
      const dist = Math.hypot(cur.lat - latitude, cur.lng - longitude);
      if (dist > 0.0001) {
        markerRef.current.setLatLng([latitude, longitude]);
        mapInstanceRef.current.flyTo([latitude, longitude], 16, { animate: true, duration: 1 });
      }
    }
  }, [latitude, longitude]);

  // Handle GPS detection using HTML5 Geolocation API
  const handleDetectGPS = () => {
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your current browser.');
      return;
    }

    setIsDetectingGPS(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingGPS(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const acc = Math.round(position.coords.accuracy);

        setGpsSuccessAccuracy(acc);

        if (markerRef.current && mapInstanceRef.current) {
          markerRef.current.setLatLng([lat, lng]);
          mapInstanceRef.current.flyTo([lat, lng], 17, { animate: true, duration: 1.2 });
        }

        performReverseGeocode(lat, lng, acc);
      },
      (error) => {
        setIsDetectingGPS(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError('Location permission denied. Please allow location access in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError('Location information is currently unavailable. Please click on the map to pin manually.');
            break;
          case error.TIMEOUT:
            setGpsError('The request to detect your location timed out. Please try again or pin on the map.');
            break;
          default:
            setGpsError('An unknown error occurred while retrieving your location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim() || query.trim().length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en',
            },
          }
        );
        if (res.ok) {
          const results: NominatimSearchResult[] = await res.json();
          setSearchResults(results);
          setShowDropdown(results.length > 0);
        }
      } catch {
        // ignore
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  // Select Search result
  const handleSelectSearchResult = (result: NominatimSearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    setSearchQuery(result.display_name.split(',')[0] || result.display_name);
    setShowDropdown(false);
    setGpsError(null);
    setGpsSuccessAccuracy(null);

    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      mapInstanceRef.current.flyTo([lat, lng], 17, { animate: true, duration: 1 });
    }

    const addr = result.address || {};
    const wardHint = addr.suburb || addr.neighbourhood || addr.city_district || addr.county;

    onLocationChange({
      lat,
      lng,
      address: result.display_name,
      wardHint,
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Top Controls: Search Bar & GPS Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 relative z-20">
        {/* Search Autocomplete Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Search className="w-4 h-4" />}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (searchResults.length > 0) setShowDropdown(true);
            }}
            placeholder="Search road, landmark, sector, or colony..."
            className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setShowDropdown(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden max-h-56 overflow-y-auto z-30">
              {searchResults.map((item) => (
                <button
                  key={item.place_id}
                  type="button"
                  onClick={() => handleSelectSearchResult(item)}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50 text-xs border-b border-slate-100 last:border-b-0 flex items-start gap-2.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 truncate">
                      {item.display_name.split(',')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {item.display_name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Real GPS "Pin My Location" Button */}
        <button
          type="button"
          onClick={handleDetectGPS}
          disabled={isDetectingGPS}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDetectingGPS ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Detecting GPS...</span>
            </>
          ) : (
            <>
              <Crosshair className="w-4 h-4" />
              <span>Use My Current Location</span>
            </>
          )}
        </button>
      </div>

      {/* GPS Error Notification */}
      {gpsError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Location Error: </span>
            <span>{gpsError}</span>
          </div>
          <button
            type="button"
            onClick={() => setGpsError(null)}
            className="text-rose-400 hover:text-rose-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-100">
        <div
          ref={mapContainerRef}
          className="w-full h-[280px] sm:h-[340px] z-0 focus:outline-none"
        />

        {/* Floating Instruction Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium shadow-md border border-white/10">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>Click map or drag pin to position grievance</span>
          </div>
        </div>

        {/* Floating Quick Locate Button (bottom right on map) */}
        <div className="absolute bottom-3 right-3 z-10">
          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={isDetectingGPS}
            title="Locate my position"
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 shadow-md border border-slate-200 transition-transform active:scale-95 cursor-pointer disabled:opacity-60 flex items-center justify-center"
          >
            {isDetectingGPS ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <Navigation className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>

        {/* Reverse Geocoding Loading Indicator on Map */}
        {isReverseGeocoding && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-2xs flex items-center justify-center z-10 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/85 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>Fetching street address details...</span>
            </div>
          </div>
        )}
      </div>

      {/* Selected Location Details Card */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Pinned Location Coordinates:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
              {latitude ? `${latitude.toFixed(6)}° N, ${longitude?.toFixed(6)}° E` : 'No coordinates pinned'}
            </span>
            {gpsSuccessAccuracy && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Accuracy: ±{gpsSuccessAccuracy}m</span>
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Verified Address / Reverse Geocode:
          </p>
          <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
            {isReverseGeocoding ? (
              <span className="text-slate-400 italic">Updating address from satellite map...</span>
            ) : formattedAddress ? (
              formattedAddress
            ) : (
              <span className="text-slate-400 italic">Click map or use GPS to fetch verified street address</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
