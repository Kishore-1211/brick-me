import { useState, useRef, useEffect } from 'react';
import { MapPin, Camera, CheckCircle2, AlertCircle, Loader2, RefreshCw, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';

// Hardcoded construction site coordinates (Mumbai example)
const SITE_LOCATION = { lat: 19.0760, lng: 72.8777 };
const SITE_RADIUS_METERS = 100;

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type GpsStatus = 'idle' | 'loading' | 'success' | 'error';

export default function CheckIn() {
  const { auth } = useAuth();
  const { t } = useLang();

  const [gpsStatus, setGpsStatus] = useState<GpsStatus>('idle');
  const [location, setLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [isOnSite, setIsOnSite] = useState(false);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [gpsError, setGpsError] = useState('');

  const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  function requestGps() {
    setGpsStatus('loading');
    setGpsError('');
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by this browser.');
      setGpsStatus('error');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const dist = haversineDistance(latitude, longitude, SITE_LOCATION.lat, SITE_LOCATION.lng);
        setLocation({ lat: latitude, lng: longitude, accuracy });
        setDistanceMeters(Math.round(dist));
        setIsOnSite(dist <= SITE_RADIUS_METERS);
        setGpsStatus('success');
      },
      (err) => {
        setGpsError(err.message || 'Location access denied.');
        setGpsStatus('error');
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  async function startCamera() {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      setCameraError(t('cameraError'));
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    setSelfieUrl(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((tk) => tk.stop());
    streamRef.current = null;
    setCameraActive(false);
  }

  function retakeSelfie() {
    setSelfieUrl(null);
    startCamera();
  }

  useEffect(() => () => stopCamera(), []);

  function handleCheckIn() {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' });
    setCheckInTime(now);
    setCheckedIn(true);
  }

  function reset() {
    setCheckedIn(false);
    setSelfieUrl(null);
    setGpsStatus('idle');
    setLocation(null);
  }

  const canCheckIn = gpsStatus === 'success' && selfieUrl !== null;

  if (checkedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center space-y-5 max-w-sm mx-auto">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={44} className="text-green-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t('attendanceMarked')}</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
            <Clock size={13} /> {checkInTime}
          </p>
        </div>
        {selfieUrl && (
          <img src={selfieUrl} alt="Check-in selfie" className="w-28 h-28 rounded-full object-cover border-4 border-green-200" />
        )}
        <div className="text-xs text-gray-400 space-y-0.5">
          {location && <p>GPS: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>}
          <p className={isOnSite ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
            {isOnSite ? t('verifiedOnSite') : t('outsidePerimeter')}
          </p>
        </div>
        <p className="text-sm text-gray-700 font-medium">{auth.employee?.name}</p>
        <Button variant="outline" size="sm" onClick={reset}>{t('checkInAgain')}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-lg">
      <p className="text-sm text-gray-500">{t('attendanceIntro')}</p>

      {/* GPS Card */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <MapPin size={16} className="text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">{t('gpsLocation')}</h3>
          </div>
          {gpsStatus === 'success' && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={13} /> {t('verified')}
            </span>
          )}
        </div>

        {gpsStatus === 'idle' && (
          <Button onClick={requestGps} variant="outline">
            <MapPin size={15} /> {t('getMyLocation')}
          </Button>
        )}

        {gpsStatus === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 size={16} className="animate-spin text-indigo-500" />
            {t('fetchingLocation')}
          </div>
        )}

        {gpsStatus === 'success' && location && (
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono text-gray-600 space-y-0.5">
              <p>Lat: {location.lat.toFixed(6)}</p>
              <p>Lng: {location.lng.toFixed(6)}</p>
              <p className="text-xs text-gray-400 mt-1">{t('accuracy')}: ±{location.accuracy.toFixed(0)} m</p>
            </div>

            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
              isOnSite ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}>
              {isOnSite
                ? <><CheckCircle2 size={15} /> {t('onSiteWithin', { radius: SITE_RADIUS_METERS })}</>
                : <><AlertCircle size={15} /> {t('offSiteFrom', { distance: distanceMeters })}</>
              }
            </div>

            <button onClick={requestGps} className="flex items-center gap-1 text-xs text-indigo-600 hover:underline">
              <RefreshCw size={11} /> {t('refreshLocation')}
            </button>
          </div>
        )}

        {gpsStatus === 'error' && (
          <div className="space-y-3">
            <p className="text-sm text-red-500 flex items-center gap-2">
              <AlertCircle size={15} /> {gpsError}
            </p>
            <Button onClick={requestGps} variant="outline" size="sm">{t('tryAgain')}</Button>
          </div>
        )}
      </Card>

      {/* Selfie Card */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Camera size={16} className="text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">{t('selfieVerification')}</h3>
          </div>
          {selfieUrl && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={13} /> {t('captured')}
            </span>
          )}
        </div>

        {!selfieUrl && !cameraActive && (
          <div className="space-y-4">
            <Button onClick={startCamera} variant="outline">
              <Camera size={15} /> {t('openCamera')}
            </Button>
            {cameraError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {cameraError}
              </p>
            )}
          </div>
        )}

        {cameraActive && (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full max-h-64 object-cover" />
              <div className="absolute inset-0 border-4 border-indigo-400/30 rounded-xl pointer-events-none" />
            </div>
            <div className="flex gap-2">
              <Button onClick={capturePhoto}>
                <Camera size={15} /> {t('capture')}
              </Button>
              <Button variant="outline" onClick={stopCamera}>{t('cancel')}</Button>
            </div>
          </div>
        )}

        {selfieUrl && (
          <div className="flex flex-col items-center gap-3">
            <img src={selfieUrl} alt="Selfie preview" className="w-36 h-36 rounded-full object-cover border-4 border-indigo-100" />
            <Button variant="outline" size="sm" onClick={retakeSelfie}>
              <RefreshCw size={14} /> {t('retake')}
            </Button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </Card>

      <Button className="w-full justify-center py-3" disabled={!canCheckIn} onClick={handleCheckIn}>
        <CheckCircle2 size={17} />
        {canCheckIn ? t('markMyAttendance') : t('completeToCheckIn')}
      </Button>

      {!canCheckIn && (
        <p className="text-center text-xs text-gray-400">
          {gpsStatus !== 'success' && !selfieUrl && t('stepHintBoth')}
          {gpsStatus === 'success' && !selfieUrl && t('stepHintSelfie')}
          {gpsStatus !== 'success' && selfieUrl && t('stepHintGps')}
        </p>
      )}
    </div>
  );
}
