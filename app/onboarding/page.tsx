'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/src/state/AppState';
import { generateProgramme, generateNutrition } from '@/src/lib/generate';

export default function Onboarding(){
  const router = useRouter();
  const { onboarding, setOnboarding, setProgramme, setNutrition } = useAppState();
  const [step, setStep] = useState(1);
  const [local, setLocal] = useState({ ...onboarding });

  const next = ()=> setStep(s=> s+1);
  const prev = ()=> setStep(s=> Math.max(1, s-1));

  const finish = ()=> {
    setOnboarding(local as any);
    const prog = generateProgramme(local as any);
    const nutri = generateNutrition(local as any);
    setProgramme(prog);
    setNutrition(nutri);
    router.push('/programme');
  };

  return (
    <main className="py-12">
      <div className="max-w-2xl mx-auto grid gap-6">
        <h1 className="text-3xl font-display text-glow-white text-center">Onboarding</h1>
        <div className="bg-panel border border-white/10 rounded-xl2 p-6">
          {step===1 && (
            <div className="grid md:grid-cols-2 gap-4">
              <Select label="Objectif" value={local.objectif||''} onChange={e=> setLocal({...local, objectif: e.target.value as any})}>
                <option value="">Choisir...</option>
                <option value="perte">Perte de poids</option>
                <option value="prise">Prise de muscle</option>
                <option value="endurance">Endurance</option>
              </Select>
              <Select label="Niveau" value={local.niveau||''} onChange={e=> setLocal({...local, niveau: e.target.value as any})}>
                <option value="">Choisir...</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </Select>
              <Input type="number" label="Âge" value={local.age||''} onChange={e=> setLocal({...local, age: parseInt(e.target.value)})} />
              <Select label="Sexe" value={local.sexe||''} onChange={e=> setLocal({...local, sexe: e.target.value as any})}>
                <option value="">Choisir...</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </Select>
              <Input type="number" label="Taille (cm)" value={local.taille||''} onChange={e=> setLocal({...local, taille: parseInt(e.target.value)})} />
              <Input type="number" label="Poids (kg)" value={local.poids||''} onChange={e=> setLocal({...local, poids: parseInt(e.target.value)})} />
            </div>
          )}
          {step===2 && (
            <div className="grid md:grid-cols-2 gap-4">
              <Select label="Nombre de séances / semaine" value={String(local.joursParSemaine||3)} onChange={e=> setLocal({...local, joursParSemaine: parseInt(e.target.value)})}>
                {[2,3,4,5,6].map(n=> <option key={n} value={n}>{n}</option>)}
              </Select>
              <Select label="Équipement" value={local.equipement||'maison'} onChange={e=> setLocal({...local, equipement: e.target.value as any})}>
                <option value="aucun">Aucun</option>
                <option value="maison">Maison (haltères/élastiques)</option>
                <option value="salle">Salle de sport</option>
              </Select>
              <Select label="Préférences alimentaires" value={local.preferences||''} onChange={e=> setLocal({...local, preferences: e.target.value as any})}>
                <option value="">Omnivore</option>
                <option value="vegetarien">Végétarien</option>
                <option value="halal">Halal</option>
                <option value="autre">Autre</option>
              </Select>
              <Input label="Allergies (facultatif)" value={local.allergies||''} onChange={e=> setLocal({...local, allergies: e.target.value})} />
            </div>
          )}
          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={prev}>← Retour</Button>
            {step<2 ? <Button onClick={next}>Suivant →</Button> : <Button onClick={finish}>Générer mon plan →</Button>}
          </div>
        </div>
      </div>
    </main>
  )
}
