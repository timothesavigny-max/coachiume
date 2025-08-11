export default function Badge({ children }:{children: React.ReactNode}){
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/90">
      <span className="size-1.5 rounded-full bg-[var(--red)] drop-shadow-[0_0_6px_rgba(255,43,43,.8)]"></span>
      {children}
    </span>
  )
}
