import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AppStateProvider } from '@/src/state/AppState'

export const metadata = {
  title: 'Coachium — Coach IA Sport & Nutrition',
  description: 'Programmes sportifs + suivi nutritionnel personnalisés avec un design premium.',
}

export default function RootLayout({ children }:{children: React.ReactNode}){
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background text-white">
        <AppStateProvider>
          <Navbar />
          <div className="max-w-7xl mx-auto px-6">{children}</div>
          <Footer />
        </AppStateProvider>
      </body>
    </html>
  )
}
