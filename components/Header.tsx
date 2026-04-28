import Link from 'next/link'
import { Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f] text-white h-16 flex items-center justify-between px-6 shadow-lg">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#0d9488] rounded-lg flex items-center justify-center font-bold text-white text-sm">C</div>
        <span className="text-xl font-bold tracking-tight">Confía</span>
      </Link>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
          <User size={16} />
          <span className="text-sm font-medium">Casa Familia González</span>
        </div>
      </div>
    </header>
  )
}
