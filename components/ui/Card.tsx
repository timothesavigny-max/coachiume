export default function Card({ children, className='' }:{children: React.ReactNode; className?: string;}){
  return <div className={`bg-panel border border-white/10 rounded-xl2 p-6 ${className}`}>{children}</div>;
}
