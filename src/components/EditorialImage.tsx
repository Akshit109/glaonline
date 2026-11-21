import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackTitle?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackTitle = 'GLA Online University',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#F1F1F1] text-[#454545] p-8 text-center ${className}`}
      >
        <GraduationCap className="w-8 h-8 mb-3 text-[#186534]" strokeWidth={1.5} />
        <span className="font-editorial text-lg text-black">{fallbackTitle}</span>
        <span className="text-xs text-[#666666] mt-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
