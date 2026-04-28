import { AlertTriangle, CreditCard, Calendar, CheckCircle2, User, FileText, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    label: 'Estado del Mes',
    value: 'Al día',
    sub: 'Abril 2026',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    label: 'Próximo Pago',
    value: '$580.000',
    sub: 'Vence el 28 de abril',
    icon: CreditCard,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
  {
    label: 'Días Trabajados',
    value: '18 / 23',
    sub: 'Este mes',
    icon: Calendar,
    color: 'text-blue-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    label: 'Alertas Activas',
    value: '2',
    sub: 'Requieren atención',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
]

const quickAccess = [
  { href: '/trabajadora', label: 'Perfil Trabajadora', icon: User, desc: 'Datos personales y contrato', color: 'bg-[#1e3a5f]' },
  { href: '/pago', label: 'Realizar Pago', icon: CreditCard, desc: 'Liquidación y transferencia', color: 'bg-[#0d9488]' },
  { href: '/tareas', label: 'Tareas del Hogar', icon: CheckCircle2, desc: 'Checklist semanal', color: 'bg-violet-600' },
  { href: '/documentos', label: 'Documentos', icon: FileText, desc: 'Contratos y liquidaciones', color: 'bg-rose-600' },
]

const recentActivity = [
  { icon: CheckCircle2, text: 'Tarea "Limpieza de cocina" marcada como completada', time: 'Hace 2 horas', color: 'text-emerald-500' },
  { icon: FileText, text: 'Liquidación de marzo 2026 generada y descargada', time: 'Hace 1 día', color: 'text-blue-500' },
  { icon: CreditCard, text: 'Pago de marzo por $580.000 registrado exitosamente', time: 'Hace 3 días', color: 'text-teal-600' },
]

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Miércoles, 23 de abril de 2026</p>
      </div>

      {/* Warning Alert */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-amber-400 rounded-lg p-2 flex-shrink-0">
          <AlertTriangle size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-amber-800">Pago de este mes vence en 5 días</p>
          <p className="text-amber-700 text-sm mt-0.5">
            El pago de abril por <strong>$580.000</strong> debe realizarse antes del{' '}
            <strong>28 de abril</strong>. Evita multas por atraso.
          </p>
        </div>
        <Link
          href="/pago"
          className="flex-shrink-0 bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Pagar ahora
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, color, bg, border }) => (
          <div key={label} className={`bg-white rounded-xl border ${border} p-5 shadow-sm`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
              <div className={`${bg} p-2 rounded-lg`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-bold text-[#1e3a5f] mb-3">Acceso Rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccess.map(({ href, label, icon: Icon, desc, color }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div
                className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon size={22} className="text-white" />
              </div>
              <p className="font-semibold text-gray-800">{label}</p>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
              <div className="flex items-center gap-1 mt-3 text-[#0d9488] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Ver más <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-bold text-[#1e3a5f] mb-3">Actividad Reciente</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {recentActivity.map(({ icon: Icon, text, time, color }, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="bg-gray-50 rounded-xl p-2.5 flex-shrink-0">
                <Icon size={18} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{text}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
                <Clock size={12} />
                {time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
