import React, { useState } from 'react';

export function getInitials(name: string): string {
  if (!name || !name.trim()) return 'SC';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  shape?: 'rounded' | 'circle' | 'square';
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const shapeClasses = {
  rounded: 'rounded-xl',
  circle: 'rounded-full',
  square: 'rounded-lg',
};

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  className = '',
  shape = 'rounded',
}) => {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);

  const hasValidImage = Boolean(src && src.trim() && !imageError);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 overflow-hidden font-bold transition-all shadow-xs ${
        sizeClasses[size]
      } ${shapeClasses[shape]} ${
        hasValidImage
          ? 'bg-slate-100 border border-slate-200'
          : 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border border-blue-400/30'
      } ${className}`}
      title={name || 'Citizen Profile'}
    >
      {hasValidImage ? (
        <img
          src={src}
          alt={name || 'Citizen Avatar'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="tracking-wider uppercase drop-shadow-xs font-extrabold">{initials}</span>
      )}
    </div>
  );
};
