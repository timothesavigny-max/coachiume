import type { Onboarding, Programme, Nutrition } from '@/src/state/AppState';

export function computeCalories(onb: Onboarding): number {
  const poids = onb.poids || 70;
  const taille = onb.taille || 175;
  const age = onb.age || 25;
  const sexeK = onb.sexe === 'femme' ? -161 : 5;
  const bmr = 10*poids + 6.25*taille - 5*age + sexeK;
  const activite = onb.joursParSemaine >= 5 ? 1.55 : onb.joursParSemaine >=3 ? 1.4 : 1.3;
  let cal = bmr * activite;
  if(onb.objectif==='perte') cal -= 400;
  if(onb.objectif==='prise') cal += 300;
  return Math.max(1500, Math.round(cal));
}

export function computeMacros(calories:number, onb: Onboarding){
  const prot = Math.round(((onb.objectif==='prise'?2.0:1.7) * (onb.poids || 70)) );
  const lip = Math.round((0.3 * calories) / 9);
  const glu = Math.max(0, Math.round((calories - prot*4 - lip*9)/4));
  return { prot, lip, glu };
}

export function generateProgramme(onb: Onboarding): Programme {
  const jours = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'] as const;
  const sessionsParSem = Math.min(6, Math.max(2, onb.joursParSemaine || 3));

  const typeBase = onb.objectif === 'endurance'
    ? ['Endurance','Fractionné','Renfo','Endurance','Renfo']
    : onb.objectif === 'prise'
    ? ['Full body','Push','Pull','Legs','Core']
    : ['Renfo','Cardio','Full body','Mobility','HIIT'];

  const semaines = 4;
  const plan: Programme = [];

  for (let s = 1; s <= semaines; s++) {
    const sessions: Programme[number]['sessions'] = [];

    for (let i = 0; i < sessionsParSem; i++) {
      const jour = jours[(i + s) % 7];

      // 👇 Force le type littéral attendu par TS
      const intensite = (
        i % 3 === 0 ? 'elevee' : i % 2 === 0 ? 'moderee' : 'faible'
      ) as 'faible' | 'moderee' | 'elevee';

      const t = typeBase[i % typeBase.length];

      sessions.push({
        jour,
        titre: t,
        dureeMin: 45,
        intensite, // ✅ a bien le type union
        details: detailsFor(t, onb),
      });
    }

    plan.push({ semaine: s, sessions });
  }

  return plan;
}

function detailsFor(type:string, onb: Onboarding){
  const eq = onb.equipement;
  if(type==='Endurance') return 'Footing 45 min à allure facile. Étirements 10 min.';
  if(type==='Fractionné') return '10 min échauffement + 6×(2 min vite / 2 min lent) + 10 min retour au calme.';
  if(type==='Renfo') return eq==='salle' ? 'Presse, Row, Développé couché, 3×10 à charge modérée.' : 'Pompes, Squats, Fentes, Gainage 3×12.';
  if(type==='Full body') return eq==='salle' ? 'Squat, Bench, Row, OHP 3×8–10.' : 'Pompes, Squats, Tractions/Rows, Dips 3×10.';
  if(type==='Push') return 'Développé couché, Dips, Épaules, Triceps 3×8–12.';
  if(type==='Pull') return 'Tractions/Lat pulldown, Row, Biceps 3×8–12.';
  if(type==='Legs') return 'Squat/Presse, Fentes, Soulevé de terre jambes tendues, Mollets 3×10.';
  if(type==='Core') return 'Planche, Side plank, Hollow, relevés de jambes 3×30–45s.';
  if(type==='Mobility') return 'Épaules/hanches/chevilles 20 min + respiration 5 min.';
  if(type==='HIIT') return '10×(40s effort / 20s repos) corde à sauter ou vélo.';
  return 'Séance mixte 45 min.';
}

export function generateNutrition(onb: Onboarding): Nutrition {
  const calories = computeCalories(onb);
  const macros = computeMacros(calories, onb);
  const repas = [
    { nom: 'Petit-déjeuner', items: ['Flocons d’avoine 80g', 'Skyr 200g', 'Fruits rouges', 'Amandes 15g'] },
    { nom: 'Déjeuner', items: ['Poulet 150g', 'Riz basmati 120g cuit', 'Légumes verts', 'Huile d’olive 1 càs'] },
    { nom: 'Collation', items: ['Banane', 'Fromage blanc 150g'] },
    { nom: 'Dîner', items: [ onb.preferences==='vegetarien' ? 'Lentilles 150g' : 'Saumon 150g', 'Patate douce 200g', 'Salade', 'Yaourt nature'] },
  ];
  return { calories, macros, repas };
}
