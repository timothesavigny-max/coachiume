'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
export type Onboarding = {
  objectif: 'perte'|'prise'|'endurance'|'';
  niveau: 'debutant'|'intermediaire'|'avance'|'';
  joursParSemaine: number;
  equipement: 'aucun'|'maison'|'salle';
  poids?: number;
  taille?: number;
  age?: number;
  sexe?: 'homme'|'femme'|'';
  preferences: 'omnivore'|'vegetarien'|'halal'|'autre'|'';
  allergies?: string;
};
export type Programme = { semaine: number; sessions: { jour: string; titre: string; details: string; dureeMin: number; intensite: 'faible'|'moderee'|'elevee' }[] }[];
export type Nutrition = { calories: number; macros: { prot: number; lip: number; glu: number }; repas: { nom: string; items: string[] }[] };
export type Progress = { date: string; poids?: number; seancesFaites: number };
type State = {
  onboarding: Onboarding;
  programme: Programme;
  nutrition: Nutrition;
  progress: Progress[];
  setOnboarding: (o: Onboarding)=>void;
  setProgramme: (p: Programme)=>void;
  setNutrition: (n: Nutrition)=>void;
  addProgress: (p: Progress)=>void;
  reset: ()=>void;
};
const Ctx = createContext<State | undefined>(undefined);
const LS_KEY = 'coachium_state_v1';

export function AppStateProvider({ children }:{children: React.ReactNode}){
  const [onboarding, setOnboardingState] = useState<Onboarding>({ objectif:'', niveau:'', joursParSemaine:3, equipement:'maison', sexe:'', preferences:'' });
  const [programme, setProgrammeState] = useState<Programme>([]);
  const [nutrition, setNutritionState] = useState<Nutrition>({ calories: 2000, macros:{prot:150, lip:70, glu:220}, repas: []});
  const [progress, setProgress] = useState<Progress[]>([]);

  useEffect(()=>{
    const raw = localStorage.getItem(LS_KEY);
    if(raw){
      try { const parsed = JSON.parse(raw);
        setOnboardingState(parsed.onboarding || onboarding);
        setProgrammeState(parsed.programme || []);
        setNutritionState(parsed.nutrition || nutrition);
        setProgress(parsed.progress || []);
      } catch(e){ console.warn('state parse', e) }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    const payload = { onboarding, programme, nutrition, progress };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  },[onboarding, programme, nutrition, progress]);

  const api: State = useMemo(()=> ({
    onboarding,
    programme,
    nutrition,
    progress,
    setOnboarding: setOnboardingState,
    setProgramme: setProgrammeState,
    setNutrition: setNutritionState,
    addProgress: (p)=> setProgress(prev => [...prev, p]),
    reset: ()=> { localStorage.removeItem(LS_KEY); location.reload(); }
  }), [onboarding, programme, nutrition, progress]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useAppState(){
  const ctx = useContext(Ctx);
  if(!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
