import { useSite } from '../../context/SiteContext';

interface AvatarProps {
  workerId?: string;
  initials: string;
  /** sizing + shape classes, e.g. "w-10 h-10 rounded-full text-sm" */
  className?: string;
  bgClass?: string;
  textClass?: string;
}

// Shows a worker's uploaded profile photo when available, else an initials tile.
export default function Avatar({ workerId, initials, className = '', bgClass = 'bg-indigo-600', textClass = 'text-white' }: AvatarProps) {
  const { profilePhotos } = useSite();
  const photo = workerId ? profilePhotos[workerId] : undefined;

  if (photo) {
    return <img src={photo} alt={initials} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`flex items-center justify-center font-bold ${bgClass} ${textClass} ${className}`}>
      {initials}
    </div>
  );
}
