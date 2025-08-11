'use client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAppState } from '@/src/state/AppState';

export default function Programme(){
  const { programme, onboarding } = useAppState();

  return (
    <main className="py-12">
      <h1 className="text-3xl font-display text-glow-white">Programme — {onboarding.objectif || 'Objectif'}</h1>
      <p className="text-white/70 mt-1">Adapté à ton niveau : <b>{onboarding.niveau || '—'}</b> • {onboarding.joursParSemaine||3} séances/sem</p>

      <div className="grid gap-6 mt-8">
        {programme.map(sem => (
          <Card key={sem.semaine}>
            <h2 className="text-xl mb-3">Semaine {sem.semaine}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sem.sessions.map((s,i)=>(
                <div key={i} className="rounded-xl2 border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white/80">{s.jour}</div>
                    <span className="text-xs px-2 py-1 rounded-full border border-white/15">{s.intensite}</span>
                  </div>
                  <div className="text-lg mt-1">{s.titre}</div>
                  <p className="text-white/70 text-sm mt-1">{s.details}</p>
                  <div className="mt-3 text-sm text-white/60">Durée : {s.dureeMin} min</div>
                  <Button className="mt-3">Marquer comme fait</Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
