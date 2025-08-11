import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
};

const sizes = { sm:'h-9 px-4 text-sm', md:'h-11 px-5 text-base', lg:'h-12 px-6 text-lg' };

export default function Button({ variant='primary', size='md', className='', ...props }: Props){
  const base = 'rounded-2xl font-medium hover-neon focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)] transition-all';
  const v = {
    primary: 'bg-[var(--red)] text-black shadow-neon-red',
    ghost: 'bg-panel text-white/90 border border-white/10 hover:border-white/20',
    white: 'bg-white text-black shadow-neon-white',
  }[variant];
  return <button className={`${base} ${v} ${sizes[size]} ${className}`} {...props} />;
}
