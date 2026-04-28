'use client'

import { useState } from 'react'
import {
  AlertTriangle, CheckCircle2, Zap, Shield, Heart,
  FileText, CreditCard, User, Building2, Sparkles,
  ChevronDown, ArrowRight
} from 'lucide-react'

const fmt = (n: number) => '$' + n.toLocaleString('es-CL')

// ─── Sección wrapper ──────────────────────────────────────────────────────────
function Seccion({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`px-5 py-12 ${className}`}>
      {children}
    </section>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[#0d9488] text-xs font-bold uppercase tracking-widest mb-3">
      {children}
    </span>
  )
}

// ─── 1. Hero / Problema ───────────────────────────────────────────────────────
function SeccionProblema() {
  return (
    <Seccion className="bg-[#0f2540] text-white text-center">
      <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-5">
        <AlertTriangle size={28} className="text-amber-400" />
      </div>
      <Tag>El problema</Tag>
      <h1 className="text-3xl font-black leading-tight mb-4">
        El <span className="text-amber-400">70%</span> de los empleadores domésticos en Chile incumple la ley sin saberlo.
      </h1>
      <p className="text-white/60 text-base leading-relaxed mb-8">
        Contratar a una trabajadora del hogar implica obligaciones legales que la mayoría desconoce — y las consecuencias pueden ser muy costosas.
      </p>
      <div className="space-y-3">
        {[
          { n: '$1.000.000+',  t: 'en multas por no pagar cotizaciones' },
          { n: '450.000',      t: 'trabajadoras de hogar en Chile'       },
          { n: '1 de cada 2',  t: 'empleadores nunca firmó un contrato'  },
        ].map(({ n, t }) => (
          <div key={n} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
            <p className="text-2xl font-black text-amber-400">{n}</p>
            <p className="text-white/60 text-sm mt-1">{t}</p>
          </div>
        ))}
      </div>
    </Seccion>
  )
}

// ─── 2. Qué es Confía ─────────────────────────────────────────────────────────
function SeccionQueEs() {
  return (
    <Seccion className="bg-white text-center">
      <Tag>La solución</Tag>
      <div className="w-20 h-20 bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
        <span className="text-white text-4xl font-black">C</span>
      </div>
      <h2 className="text-3xl font-black text-[#1e3a5f] mb-3">Conoce Confía</h2>
      <p className="text-gray-600 text-base leading-relaxed mb-5">
        La primera plataforma chilena que convierte el cumplimiento laboral doméstico en algo <strong>simple, automático y sin errores</strong>.
      </p>
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 inline-flex items-center gap-2">
        <CheckCircle2 size={16} className="text-emerald-600" />
        <span className="text-emerald-700 text-sm font-semibold">100% legal y automatizado</span>
      </div>
    </Seccion>
  )
}

// ─── 3. Cómo funciona ─────────────────────────────────────────────────────────
function SeccionComo() {
  return (
    <Seccion className="bg-gray-50">
      <Tag>Cómo funciona</Tag>
      <h2 className="text-2xl font-black text-[#1e3a5f] mb-2">Tres pasos. Cero dolores de cabeza.</h2>
      <p className="text-gray-500 text-sm mb-7">Todo lo que necesitas para ser un empleador impecable.</p>
      <div className="space-y-4">
        {[
          { n: '1', color: 'bg-[#1e3a5f]', icon: User,      t: 'Registra',  d: 'Ingresa los datos de tu trabajadora y genera el contrato digital en minutos.' },
          { n: '2', color: 'bg-[#0d9488]', icon: FileText,  t: 'Gestiona',  d: 'Controla tareas, asistencia, documentos y cotizaciones desde un solo lugar.'  },
          { n: '3', color: 'bg-violet-600', icon: Zap,       t: 'Paga',      d: 'Con un click, distribuimos el pago a la trabajadora, AFP, Fonasa y la Mutual.' },
        ].map(({ n, color, icon: Icon, t, d }) => (
          <div key={n} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
            <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow`}>
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold mb-0.5">Paso {n}</p>
              <p className="font-black text-[#1e3a5f] text-lg">{t}</p>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </Seccion>
  )
}

// ─── 4. Propuesta de valor ────────────────────────────────────────────────────
function SeccionPropuesta() {
  return (
    <Seccion className="bg-[#0f2540]">
      <Tag>Por qué Confía</Tag>
      <h2 className="text-2xl font-black text-white mb-2">Diferente a todo lo que conoces</h2>
      <p className="text-white/50 text-sm mb-7">Todo lo que un empleador responsable necesita en una sola plataforma.</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: FileText,  color: 'bg-[#1e3a5f]', t: 'Contrato digital',    d: 'Genera contratos al instante'          },
          { icon: Zap,       color: 'bg-[#0d9488]', t: 'Pago integrado',       d: 'Un click, cuatro destinos'             },
          { icon: Shield,    color: 'bg-violet-600', t: 'Cobertura legal',     d: 'Alertas y soporte ante conflictos'     },
          { icon: Heart,     color: 'bg-rose-500',   t: 'Bienestar',           d: 'Seguro de vida y telemedicina'         },
        ].map(({ icon: Icon, color, t, d }) => (
          <div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-white font-bold text-sm">{t}</p>
            <p className="text-white/50 text-xs mt-1 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 bg-[#0d9488]/20 border border-[#0d9488]/30 rounded-2xl p-4 text-center">
        <p className="text-white font-semibold text-sm">
          <span className="text-[#0d9488]">Un solo click</span> para cumplir con todo lo que la ley exige.
        </p>
      </div>
    </Seccion>
  )
}

// ─── 5-8. Tour de la app ──────────────────────────────────────────────────────
function SeccionTour() {
  const pantallas = [
    {
      num: '1 / 4', color: 'bg-[#1e3a5f]', titulo: 'Tu centro de control',
      desc: 'Ve el estado del mes, próximo pago y alertas en un solo vistazo.',
      puntos: ['Alerta cuando un pago está por vencer', 'Resumen financiero y laboral al día', 'Acceso a las 4 funciones en 1 click'],
    },
    {
      num: '2 / 4', color: 'bg-[#0d9488]', titulo: 'Todo sobre tu trabajadora',
      desc: 'Perfil completo con datos, cotizaciones y documentos siempre disponibles.',
      puntos: ['RUT, AFP, salud y banco en un lugar', 'Historial de cotizaciones mes a mes', 'Contrato y liquidaciones descargables'],
    },
    {
      num: '3 / 4', color: 'bg-violet-600', titulo: 'Un click. Cuatro pagos.',
      desc: 'Autorizas un monto y Confía distribuye todo automáticamente.',
      puntos: ['Sueldo directo a la cuenta bancaria', 'Cotización AFP y Fonasa automática', 'Mutual de Seguridad al día, siempre'],
    },
    {
      num: '4 / 4', color: 'bg-rose-500', titulo: 'Organiza el trabajo del hogar',
      desc: 'Checklist semanal con estado por día para mantener todo en orden.',
      puntos: ['Vista día a día de lunes a viernes', 'Estados: pendiente, completada, saltada', 'Progreso semanal en tiempo real'],
    },
  ]

  return (
    <Seccion className="bg-white">
      <Tag>La plataforma</Tag>
      <h2 className="text-2xl font-black text-[#1e3a5f] mb-7">Así se ve Confía por dentro</h2>
      <div className="space-y-5">
        {pantallas.map(({ num, color, titulo, desc, puntos }) => (
          <div key={titulo} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className={`${color} px-5 py-4`}>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wide">{num}</p>
              <p className="text-white text-xl font-black mt-1">{titulo}</p>
            </div>
            <div className="p-5">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
              <div className="space-y-2">
                {puntos.map(p => (
                  <div key={p} className="flex items-center gap-2">
                    <div className={`${color} w-1.5 h-1.5 rounded-full flex-shrink-0`} />
                    <p className="text-sm text-gray-700">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Seccion>
  )
}

// ─── 9. Precios ───────────────────────────────────────────────────────────────
function SeccionPrecios() {
  const [seleccion, setSeleccion] = useState<number | null>(null)
  const [guardado,  setGuardado]  = useState(false)

  const elegir = async (value: number, label: string) => {
    if (guardado) return
    setSeleccion(value)
    try {
      await fetch('/api/respuesta', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ opcion: label }),
      })
      setGuardado(true)
    } catch { /* silencioso */ }
  }

  const planes = [
    {
      nombre: 'Básico', precio: 14990,
      color: 'border-gray-200', header: 'bg-gray-50', textHeader: 'text-gray-800',
      badge: '',
      features: ['Contrato digital', 'Liquidación mensual', 'Alertas legales', '1 trabajadora'],
    },
    {
      nombre: 'Estándar', precio: 27990,
      color: 'border-[#0d9488]', header: 'bg-[#0d9488]', textHeader: 'text-white',
      badge: 'Más popular',
      features: ['Todo el plan Básico', 'Pago integrado automático', 'Seguro de vida', '2 trabajadoras'],
    },
    {
      nombre: 'Premium', precio: 36990,
      color: 'border-[#1e3a5f]', header: 'bg-[#1e3a5f]', textHeader: 'text-white',
      badge: '',
      features: ['Todo el plan Estándar', 'Soporte legal ante conflictos', 'Gestión de reemplazos', 'Telemedicina', '3 trabajadoras'],
    },
  ]

  const rangos = [
    { label: 'Menos de $10.000', value: 0 },
    { label: '$10.000 – $20.000', value: 1 },
    { label: '$20.000 – $30.000', value: 2 },
    { label: 'Más de $30.000',    value: 3 },
  ]

  return (
    <Seccion className="bg-gray-50">
      <Tag>Planes y precios</Tag>
      <h2 className="text-2xl font-black text-[#1e3a5f] mb-1">Elige tu plan</h2>
      <p className="text-gray-500 text-sm mb-7">30 días gratis. Sin tarjeta de crédito.</p>

      <div className="space-y-4 mb-8">
        {planes.map(({ nombre, precio, color, header, textHeader, badge, features }) => (
          <div key={nombre} className={`bg-white rounded-2xl border-2 ${color} shadow-sm overflow-hidden`}>
            <div className={`${header} px-5 py-4 relative`}>
              {badge && (
                <span className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">{badge}</span>
              )}
              <p className={`font-black text-lg ${textHeader}`}>{nombre}</p>
              <p className={`text-2xl font-black mt-1 ${textHeader}`}>
                {fmt(precio)}<span className={`text-sm font-normal ml-1 ${header === 'bg-gray-50' ? 'text-gray-400' : 'text-white/70'}`}>/mes</span>
              </p>
            </div>
            <div className="px-5 py-4 space-y-2.5">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Disposición a pagar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-amber-500" />
          <p className="font-bold text-gray-800 text-sm">¿Cuánto pagarías por Confía?</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {rangos.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => elegir(value, label)}
              disabled={guardado}
              className={`py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all text-center leading-tight ${
                seleccion === value
                  ? 'border-[#0d9488] bg-teal-50 text-[#0d9488]'
                  : 'border-gray-200 text-gray-600 active:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {guardado && (
          <p className="text-sm text-[#0d9488] font-semibold mt-4 text-center">
            ✓ ¡Gracias! Tu respuesta quedó registrada.
          </p>
        )}
      </div>
    </Seccion>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="bg-[#0f2540] px-5 py-10 text-center">
      <div className="w-12 h-12 bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
        <span className="text-white text-2xl font-black">C</span>
      </div>
      <p className="text-white font-bold text-xl">Confía</p>
      <p className="text-white/50 text-sm mt-1">Gestión laboral doméstica</p>
      <p className="text-white/30 text-xs mt-6">Hecho en Chile 🇨🇱 · Prototipo 2026</p>
    </div>
  )
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function MovilPage() {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header fijo */}
      <div className="sticky top-0 z-50 bg-[#1e3a5f] px-5 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0d9488] rounded-lg flex items-center justify-center font-black text-white text-sm">C</div>
          <span className="text-white font-black text-lg">Confía</span>
        </div>
        <span className="text-white/50 text-xs">Presentación</span>
      </div>

      {/* Índice rápido */}
      <div className="bg-white border-b border-gray-100 px-5 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {['Problema', 'Qué es', 'Cómo', 'Valor', 'App', 'Precios'].map((label, i) => (
          <a
            key={label}
            href={`#s${i}`}
            className="flex-shrink-0 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </div>

      <div id="s0"><SeccionProblema /></div>
      <div id="s1"><SeccionQueEs /></div>
      <div id="s2"><SeccionComo /></div>
      <div id="s3"><SeccionPropuesta /></div>
      <div id="s4"><SeccionTour /></div>
      <div id="s5"><SeccionPrecios /></div>
      <Footer />
    </div>
  )
}
