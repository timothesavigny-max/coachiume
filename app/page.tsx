import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function Home(){
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-red" />
      <div className="pointer-events-none absolute inset-0 bg-radial-white" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />

      <section className="relative py-20 md:py-28 grid gap-10 text-center">
        <div className="flex justify-center"><Badge>Coachium — IA Fitness</Badge></div>
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          <span className="text-glow-red">Programmes sportifs</span> &{' '}
          <span className="text-glow-white">suivi nutritionnel automatisé</span>
        </h1>
        <p className="mx-auto max-w-2xl text-white/80 text-lg">
          Un coach intelligent qui ajuste tes séances, tes macros et tes rappels en temps réel.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/onboarding"><Button size="lg">Démarrer maintenant</Button></Link>
          <Link href="/pricing"><Button variant="ghost" size="lg" className="border-white/20">Voir les tarifs</Button></Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          <Card><h3 className="text-xl mb-2">Plans sur-mesure</h3><p className="text-white/70">Générés selon ton objectif, ton niveau et ton emploi du temps.</p></Card>
          <Card><h3 className="text-xl mb-2">Nutrition dynamique</h3><p className="text-white/70">Calories, macros et repas adaptés chaque semaine.</p></Card>
          <Card><h3 className="text-xl mb-2">Suivi & motivation</h3><p className="text-white/70">Rappels, historique et progression visibles d’un coup d’œil.</p></Card>
        </div>
      </section>
    </main>
  )
}
