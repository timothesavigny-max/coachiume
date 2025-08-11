import Card from '@/components/ui/Card';
export default function Contact(){
  return (
    <main className="py-12">
      <h1 className="text-3xl font-display text-glow-white">Contact</h1>
      <Card className="mt-6">
        <p className="text-white/80">Pour toute question : <a href="mailto:contact@coachium.app" className="underline">contact@coachium.app</a></p>
      </Card>
    </main>
  )
}
