'use client';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAppState } from '@/src/state/AppState';

function LineChart({ data }:{data: number[]}){
  const w=500, h=160, pad=24;
  const maxV = Math.max(...data, 1);
  const minV = Math.min(...data, 0);
  const range = Math.max(1, maxV - minV);
  const pts = data.map((v,i)=>{
    const x = pad + (i*(w-2*pad))/(data.length-1||1);
    const y = h - pad - ((v-minV)*(h-2*pad))/range;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      <polyline fill="none" stroke="rgba(255,43,43,.9)" strokeWidth="2.5" points={pts} />
    </svg>
  )
}

export default function Suivi(){
  const { progress, addProgress } = useAppState();
  const [poids, setPoids] = useState('');
  const add = ()=>{
    if(!poids) return;
    addProgress({ date: new Date().toISOString().slice(0,10), poids: parseFloat(poids), seancesFaites: 0 });
    setPoids('');
  };
  const series = progress.filter(p=> typeof p.poids==='number').map(p=> p.poids as number);

  return (
    <main className="py-12">
      <h1 className="text-3xl font-display text-glow-white">Suivi</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card>
          <h3 className="text-xl">Poids</h3>
          {series.length>=2 ? <LineChart data={series} /> : <p className="text-white/60 mt-2">Ajoute au moins 2 entrées pour voir la courbe.</p>}
          <div className="flex gap-2 mt-3">
            <Input type="number" placeholder="Poids (kg)" value={poids} onChange={e=> setPoids(e.target.value)} />
            <Button onClick={add}>Ajouter</Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl">Historique</h3>
          <ul className="mt-3 text-white/80 text-sm">
            {progress.slice().reverse().map((p,i)=> (
              <li key={i} className="flex justify-between border-b border-white/5 py-2">
                <span>{p.date}</span>
                <span>{p.poids? `${p.poids} kg` : ''}</span>
              </li>
            ))}
            {progress.length===0 && <li>Aucune donnée pour l’instant.</li>}
          </ul>
        </Card>
      </div>
    </main>
  )
}
