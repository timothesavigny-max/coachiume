import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const tiers = [
  { name:'Start', price:'9€', features:['Plan personnalisé', 'Rappels basiques', 'Historique 30j'] },
  { name:'Pro', price:'19€', featured:true, features:['Ajustements auto', 'Plan nutrition hebdo', 'Export PDF'] },
  { name:'Elite', price:'49€', features:['Coach humain 1x/sem', 'WhatsApp Premium', 'Priorité support'] },
];

export default function Pricing(){
  return (
    <main className="py-12">
      <h1 className="text-3xl font-display text-glow-white text-center">Tarifs</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {tiers.map(t=> (
          <Card key={t.name} className={`${t.featured? 'shadow-neon-red ring-neon-red' : ''}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl">{t.name}</h3>
              <div className="text-3xl">{t.price}<span className="text-sm text-white/60">/mo</span></div>
            </div>
            <ul className="mt-3 text-white/80 text-sm space-y-2">
              {t.features.map(f=> <li key={f} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[var(--red)] drop-shadow-[0_0_6px_rgba(255,43,43,.8)]"></span>{f}</li>)}
            </ul>
            <Button className="mt-5 w-full">{t.featured? 'Choisir Pro' : 'Choisir'}</Button>
          </Card>
        ))}
      </div>
    </main>
  )
}
