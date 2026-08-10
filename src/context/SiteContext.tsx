import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AttendanceStatus, ApprovalStatus } from '../data/attendance';

// A live check-in made by a labourer (selfie + GPS + time). Same shape as a
// seed AttendanceRecord plus the captured selfie, so admin/engineer screens can
// render it exactly like the mock records.
export interface LiveCheckIn {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: number;
  gps: { lat: number; lng: number; onSite: boolean } | null;
  selfie: string | null;
  status: AttendanceStatus;
  approval: ApprovalStatus;
}

interface SiteContextValue {
  profilePhotos: Record<string, string>;
  setProfilePhoto: (workerId: string, url: string) => void;
  checkIns: LiveCheckIn[];
  addCheckIn: (c: LiveCheckIn) => void;
  setApproval: (id: string, approval: ApprovalStatus) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const PHOTOS_KEY = 'brickme-profile-photos';
const CHECKINS_KEY = 'brickme-checkins';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded (large photos) — keep in memory only
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [profilePhotos, setPhotos] = useState<Record<string, string>>(() => load(PHOTOS_KEY, {}));
  const [checkIns, setCheckIns] = useState<LiveCheckIn[]>(() => load(CHECKINS_KEY, []));

  function setProfilePhoto(workerId: string, url: string) {
    setPhotos(prev => {
      const next = { ...prev, [workerId]: url };
      save(PHOTOS_KEY, next);
      return next;
    });
  }

  function addCheckIn(c: LiveCheckIn) {
    setCheckIns(prev => {
      // one live check-in per worker per day — replace any existing
      const next = [c, ...prev.filter(x => !(x.employeeId === c.employeeId && x.date === c.date))];
      save(CHECKINS_KEY, next);
      return next;
    });
  }

  function setApproval(id: string, approval: ApprovalStatus) {
    setCheckIns(prev => {
      const next = prev.map(x => (x.id === id ? { ...x, approval } : x));
      save(CHECKINS_KEY, next);
      return next;
    });
  }

  return (
    <SiteContext.Provider value={{ profilePhotos, setProfilePhoto, checkIns, addCheckIn, setApproval }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
