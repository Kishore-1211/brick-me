import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// A work-completion upload made by a labourer. Photos are data-URL strings
// (before / during / after). Shared so the Site Engineer / Admin can view the
// real photos on the Productivity Approval screen.
export interface WorkSubmission {
  id: string;
  workerId: string;
  workerName: string;
  activity: string;
  target: string;
  quantity: string;
  hours: string;
  issues: string;
  photos: string[];
  submittedAt: string;
}

interface WorkContextValue {
  submissions: WorkSubmission[];
  addSubmission: (sub: WorkSubmission) => void;
  latestByWorker: (workerId?: string) => WorkSubmission | undefined;
}

const WorkContext = createContext<WorkContextValue | null>(null);

const STORAGE_KEY = 'brickme-work-submissions';

function load(): WorkSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WorkSubmission[]) : [];
  } catch {
    return [];
  }
}

export function WorkProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<WorkSubmission[]>(load);

  function addSubmission(sub: WorkSubmission) {
    setSubmissions(prev => {
      const next = [sub, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage quota exceeded (large photos) — keep it in memory only.
      }
      return next;
    });
  }

  function latestByWorker(workerId?: string) {
    if (!workerId) return undefined;
    return submissions.find(s => s.workerId === workerId);
  }

  return (
    <WorkContext.Provider value={{ submissions, addSubmission, latestByWorker }}>
      {children}
    </WorkContext.Provider>
  );
}

export function useWork() {
  const ctx = useContext(WorkContext);
  if (!ctx) throw new Error('useWork must be used inside WorkProvider');
  return ctx;
}
