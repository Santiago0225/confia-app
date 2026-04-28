'use client'

import { useState } from 'react'
import {
  CreditCard, CheckCircle2, Download, Shield, Heart,
  AlertTriangle, X, ChevronRight, Loader2, Building2,
  User, FileText, Sparkles
} from 'lucide-react'

// ─── Datos del mes ────────────────────────────────────────────────────────────
const MES = 'Abril 2026'

const desglose = [
  { label: 'Sueldo base',         monto: 550_000, tipo: 'ingreso' },
  { label: 'AFP Habitat (10%)',   monto:  55_000, tipo: 'descuento' },
  { label: 'Fonasa (7%)',         monto:  38_500, tipo: 'descuento' },
  { label: 'Seguro de accidentes',monto:   3_200, tipo: 'descuento' },
]

const TOTAL = 646_700

const distribuciones = [
  {
    id: 'trabajadora',
    nombre: 'Trabajadora',
    detalle: 'María Jesús Morales · Cta. Rut BCI',
    monto: 550_000,
    icon: User,
    color: 'bg-[#1e3a5f]',
    delay: 0,
  },
  {
    id: 'afp',
    nombre: 'AFP Habitat',
    detalle: 'Cotización previsional obligatoria',
    monto: 55_000,
    icon: Building2,
    color: 'bg-violet-600',
    delay: 600,
  },
  {
    id: 'fonasa',
    nombre: 'Fonasa',
    detalle: 'Cotización de salud',
    monto: 38_500,
    icon: Heart,
    color: 'bg-rose-500',
    delay: 1200,
  },
  {
    id: 'mutual',
    nombre: 'Mutual de Seguridad',
    detalle: 'Seguro de accidentes del trabajo',
    monto: 3_200,
    icon: Shield,
    color: 'bg-amber-500',
    delay: 1800,
  },
]

const fmt = (n: number) =>
  '$' + n.toLocaleString('es-CL')

// ─── Estados del flujo ───────────────────────────────────────────────────────
type Flujo = 'resumen' | 'confirmando' | 'procesando' | 'exito'

export default function PagoPage() {
  const [flujo, setFlujo] = useState<Flujo>('resumen')
  const [pagosListos, setPagosListos] = useState<string[]>([])

  const abrirModal = () => setFlujo('confirmando')
  const cerrarModal = () => setFlujo('resumen')

  const confirmar = () => {
    setFlujo('procesando')
    setPagosListos([])

    // Simula distribuciones que se van completando una a una
    distribuciones.forEach(({ id, delay }) => {
      setTimeout(() => {
        setPagosListos(prev => [...prev, id])
      }, delay + 800)
    })

    // Muestra pantalla de éxito cuando todas terminaron
    setTimeout(() => {
      setFlujo('exito')
    }, distribuciones[distribuciones.length - 1].delay + 1800)
  }

  const reiniciar = () => {
    setFlujo('resumen')
    setPagosListos([])
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ── Pantalla de éxito ─────────────────────────────────────────────── */}
      {flujo === 'exito' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-2xl p-8 text-white text-center shadow-xl mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={44} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold">¡Pago distribuido con éxito!</h2>
            <p className="text-white/75 mt-1 text-sm">{MES} · {new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-4xl font-bold mt-4">{fmt(TOTAL)}</p>
            <p className="text-white/60 text-sm mt-1">distribuidos en 4 destinatarios</p>
          </div>

          {/* Estado de cada distribución */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
            <h3 className="font-bold text-[#1e3a5f] mb-4">Distribución completada</h3>
            <div className="space-y-3">
              {distribuciones.map(({ id, nombre, detalle, monto, icon: Icon, color }) => (
                <div key={id} className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-xl">
                  <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{nombre}</p>
                    <p className="text-xs text-gray-500">{detalle}</p>
                  </div>
                  <span className="font-bold text-gray-700 text-sm">{fmt(monto)}</span>
                  <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={12} />
                    Enviado
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3">
            <button
              onClick={reiniciar}
              className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Volver al resumen
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#0d9488] text-white font-semibold py-3 rounded-xl text-sm hover:bg-teal-700 transition-colors">
              <Download size={16} /> Descargar comprobante
            </button>
          </div>
        </div>
      )}

      {/* ── Pantalla de procesando ────────────────────────────────────────── */}
      {flujo === 'procesando' && (
        <div className="animate-in fade-in duration-300">
          <div className="text-center py-8 mb-6">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 size={32} className="text-[#0d9488] animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-[#1e3a5f]">Distribuyendo pagos…</h2>
            <p className="text-gray-500 text-sm mt-1">Confía está enviando cada monto a su destino</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3">
            {distribuciones.map(({ id, nombre, detalle, monto, icon: Icon, color }) => {
              const listo = pagosListos.includes(id)
              return (
                <div
                  key={id}
                  className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-500 ${listo ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'}`}
                >
                  <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity ${listo ? '' : 'opacity-40'}`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold transition-colors ${listo ? 'text-gray-800' : 'text-gray-400'}`}>{nombre}</p>
                    <p className="text-xs text-gray-400">{detalle}</p>
                  </div>
                  <span className={`font-bold text-sm transition-colors ${listo ? 'text-gray-700' : 'text-gray-300'}`}>{fmt(monto)}</span>
                  <div className="w-24 flex justify-end">
                    {listo ? (
                      <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={12} /> Enviado
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-gray-100 text-gray-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <Loader2 size={12} className="animate-spin" /> Enviando
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Resumen normal ────────────────────────────────────────────────── */}
      {(flujo === 'resumen' || flujo === 'confirmando') && (
        <>
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Pago mensual</h1>
            <p className="text-gray-500 text-sm mt-1">{MES} · Pendiente de autorización</p>
          </div>

          {/* Alerta */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              El pago vence en <strong>3 días</strong>. Autorízalo antes del 28 de abril para evitar recargos.
            </p>
          </div>

          {/* Desglose */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#1e3a5f] text-lg">Desglose {MES}</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">
                María Jesús Morales
              </span>
            </div>

            <div className="space-y-1">
              {desglose.map(({ label, monto, tipo }) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className={`text-sm font-semibold ${tipo === 'descuento' ? 'text-rose-500' : 'text-gray-800'}`}>
                    {tipo === 'descuento' ? '-' : '+'}{fmt(monto)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total a distribuir</p>
                <p className="text-xs text-gray-400 mt-0.5">Confía pagará directamente a cada institución</p>
              </div>
              <p className="text-3xl font-bold text-[#1e3a5f]">{fmt(TOTAL)}</p>
            </div>
          </div>

          {/* Cómo se distribuye */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#0d9488]" />
              <h2 className="font-bold text-[#1e3a5f]">Cómo Confía distribuye tu pago</h2>
            </div>

            <div className="space-y-3">
              {distribuciones.map(({ id, nombre, detalle, monto, icon: Icon, color }) => (
                <div key={id} className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-xl">
                  <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{nombre}</p>
                    <p className="text-xs text-gray-500">{detalle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700 text-sm">{fmt(monto)}</span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0d9488] to-teal-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 rounded-xl p-3 flex-shrink-0">
                <CreditCard size={28} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">Un solo click. Cuatro pagos.</p>
                <p className="text-white/75 text-sm mt-0.5">
                  Autoriza y Confía transfiere automáticamente a la trabajadora, AFP, Fonasa y la Mutual.
                </p>
              </div>
            </div>
            <button
              onClick={abrirModal}
              className="mt-5 w-full bg-white text-[#0d9488] font-bold py-3.5 rounded-xl text-base hover:bg-white/90 active:scale-[0.99] transition-all shadow-md"
            >
              Autorizar pago completo · {fmt(TOTAL)}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pb-4">
            <Shield size={12} />
            Pago protegido con encriptación bancaria de 256 bits
          </div>
        </>
      )}

      {/* ── Modal de confirmación ─────────────────────────────────────────── */}
      {flujo === 'confirmando' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            {/* Header modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <CreditCard size={20} className="text-[#0d9488]" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Confirmar autorización</p>
                  <p className="text-xs text-gray-500">{MES}</p>
                </div>
              </div>
              <button onClick={cerrarModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Cuerpo */}
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {distribuciones.map(({ id, nombre, monto, icon: Icon, color }) => (
                  <div key={id} className="flex items-center gap-3">
                    <div className={`${color} w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon size={13} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-600 flex-1">{nombre}</span>
                    <span className="text-sm font-semibold text-gray-800">{fmt(monto)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                  <span className="text-sm font-bold text-gray-700">Total</span>
                  <span className="text-sm font-bold text-[#1e3a5f]">{fmt(TOTAL)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Al confirmar, Confía ejecutará las 4 transferencias de forma automática e inmediata. Esta acción no se puede deshacer.
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={cerrarModal}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmar}
                className="flex-1 bg-[#0d9488] text-white font-bold py-3 rounded-xl text-sm hover:bg-teal-700 active:scale-[0.98] transition-all shadow-sm"
              >
                Confirmar y pagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
