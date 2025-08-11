import React from 'react';
type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };
export default function Input({ label, className='', ...props }: Props){
  return (
    <label className="grid gap-1 text-sm">
      {label && <span className="text-white/80">{label}</span>}
      <input {...props} className={`bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--red)] ${className}`} />
    </label>
  )
}
