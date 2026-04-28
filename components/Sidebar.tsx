'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, CreditCard, CheckSquare, FileText } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/trabajadora', label: 'Trabajadora', icon: User },
  { href: '/pago', label: 'Pagos', icon: CreditCard },
  { href: '/tareas', label: 'Tareas', icon: CheckSquare },
  { href: '/documentos', label: 'Documentos', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 shadow-sm z-40">
      <nav className="p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-[#1e3a5f] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-[#1e3a5f]'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-xl p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Plan Activo</p>
          <p className="text-sm font-bold mt-1">Confía Pro</p>
          <p className="text-xs opacity-70 mt-1">Renovación: 15 mayo 2026</p>
        </div>
      </div>
    </aside>
  )
}
