'use client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAppState } from '@/src/state/AppState';

export default function Nutrition(){
  const { nutrition, onboarding } = useAppState();
  const { calories, macros, repas } = nutrition;
  return (
    <main className="py-12">
      <h1 className="text-3xl font-display text-glow-white">Nutrition</h1>
      <p className="text-white/70 mt-1">Ciblage pour {onboarding.objectif || 'objectif'} — {calories} kcal • P {macros.prot}g • G {macros.lip}g • Glu {macros.glu}g</p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {repas.map((r,idx)=>(
          <Card key={idx}>
            <h3 className="text-xl">{r.nom}</h3>
            <ul className="mt-3 list-disc list-inside text-white/80">
              {r.items.map(it => <li key={it}>{it}</li>)}
            </ul>
          </Card>
        ))}
        <Card>
          <h3 className="text-xl">Liste de courses</h3>
          <ul className="mt-3 list-disc list-inside text-white/80">
            <li>Oats, Skyr, Fruits rouges</li>
            <li>Poulet/Saumon ou Lentilles</li>
            <li>Riz/Patates douces</li>
            <li>Légumes verts, Amandes, Yaourts</li>
          </ul>
          <Button className="mt-4">Télécharger en PDF (à brancher)</Button>
        </Card>
      </div>
    </main>
  )
}
