'use client'

import { useState } from 'react'
import {
  User, Calendar, FileText, Clock, Shield, Heart,
  CheckCircle2, XCircle, Download, X, Building2,
  Phone, MapPin, BadgeCheck, ChevronDown, Printer
} from 'lucide-react'

// ─── Datos ────────────────────────────────────────────────────────────────────

const trabajadora = {
  nombre:    'María Pérez',
  rut:       '12.345.678-9',
  telefono:  '+56 9 6543 2198',
  comuna:    'Maipú, Santiago',
  inicio:    '15 de marzo de 2022',
  contrato:  'Indefinido · Jornada completa',
  horario:   'Lunes a viernes · 08:00 – 17:00',
  afp:       'AFP Habitat',
  salud:     'Fonasa',
  banco:     'BCI · Cuenta Rut',
}

const fmt = (n: number) => '$' + n.toLocaleString('es-CL')

const cotizaciones = [
  { mes: 'Octubre 2025', sueldo: 550_000, afp: 55_000,  salud: 38_500, ok: true  },
  { mes: 'Noviembre 2025', sueldo: 550_000, afp: 55_000, salud: 38_500, ok: true  },
  { mes: 'Diciembre 2025', sueldo: 616_667, afp: 61_667, salud: 43_167, ok: true  },
  { mes: 'Enero 2026',   sueldo: 550_000, afp: 55_000,  salud: 38_500, ok: true  },
  { mes: 'Febrero 2026', sueldo: 550_000, afp: 55_000,  salud: 38_500, ok: true  },
  { mes: 'Marzo 2026',   sueldo: 550_000, afp: 55_000,  salud: 38_500, ok: false },
]

const documentos = [
  { nombre: 'Contrato de trabajo',       fecha: '15 mar 2022', tipo: 'Contrato',    firmado: true  },
  { nombre: 'Liquidación marzo 2026',    fecha: '31 mar 2026', tipo: 'Liquidación', firmado: true  },
  { nombre: 'Liquidación febrero 2026',  fecha: '28 feb 2026', tipo: 'Liquidación', firmado: true  },
  { nombre: 'Liquidación enero 2026',    fecha: '31 ene 2026', tipo: 'Liquidación', firmado: true  },
]

// ─── Modal liquidación ────────────────────────────────────────────────────────

const MES_ACTUAL = 'Abril 2026'
const SUELDO     = 550_000
const AFP        =  55_000
const SALUD      =  38_500
const ACCIDENTES =   3_200
const LIQUIDO    = SUELDO - AFP - SALUD - ACCIDENTES   // 453 300

function ModalLiquidacion({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">

        {/* cabecera */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-[#1e3a5f]" />
            </div>
            <div>
              <p className="font-bold text-gray-800">Liquidación de sueldo</p>
              <p className="text-xs text-gray-500">{MES_ACTUAL}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* contenido del documento */}
        <div className="p-6 space-y-5">

          {/* encabezado empresa */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-[#0d9488] rounded flex items-center justify-center text-white text-xs font-bold">C</div>
                <span className="font-bold text-[#1e3a5f] text-sm">Confía</span>
              </div>
              <p className="text-xs text-gray-500">Familia González</p>
              <p className="text-xs text-gray-500">RUT empleador: 10.987.654-3</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Liquidación N° 028</p>
              <p className="text-xs text-gray-500 mt-0.5">{MES_ACTUAL}</p>
            </div>
          </div>

          {/* datos trabajadora */}
          <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-y-2 gap-x-4">
            {[
              ['Trabajadora', trabajadora.nombre],
              ['RUT',         trabajadora.rut],
              ['AFP',         trabajadora.afp],
              ['Salud',       trabajadora.salud],
              ['Inicio',      trabajadora.inicio],
              ['Contrato',    'Indefinido'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{k}</p>
                <p className="text-xs font-semibold text-gray-700">{v}</p>
              </div>
            ))}
          </div>

          {/* tabla de haberes y descuentos */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Haberes</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex justify-between px-4 py-2.5 bg-gray-50">
                <span className="text-sm text-gray-600">Sueldo base</span>
                <span className="text-sm font-semibold text-gray-800">{fmt(SUELDO)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 bg-emerald-50 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-700">Total haberes</span>
                <span className="text-sm font-bold text-gray-800">{fmt(SUELDO)}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Descuentos legales</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              {[
                ['AFP Habitat (10%)',    AFP],
                ['Fonasa (7%)',          SALUD],
                ['Mutual accidentes',   ACCIDENTES],
              ].map(([label, monto], i) => (
                <div key={String(label)} className={`flex justify-between px-4 py-2.5 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-semibold text-rose-500">-{fmt(Number(monto))}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-2.5 bg-rose-50 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-700">Total descuentos</span>
                <span className="text-sm font-bold text-rose-600">-{fmt(AFP + SALUD + ACCIDENTES)}</span>
              </div>
            </div>
          </div>

          {/* líquido */}
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d9488] rounded-xl p-4 flex justify-between items-center text-white">
            <div>
              <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Líquido a pagar</p>
              <p className="text-xs text-white/60 mt-0.5">Transferencia bancaria</p>
            </div>
            <p className="text-2xl font-bold">{fmt(LIQUIDO)}</p>
          </div>
        </div>

        {/* footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
          >
            Cerrar
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors">
            <Printer size={15} /> Imprimir
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#0d9488] text-white font-semibold py-3 rounded-xl text-sm hover:bg-teal-700 transition-colors">
            <Download size={15} /> Descargar
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Página ───────────────────────────────────────────────────────────────────

const tipoDoc: Record<string, string> = {
  Contrato:    'bg-[#1e3a5f]/10 text-[#1e3a5f]',
  Liquidación: 'bg-teal-50 text-[#0d9488]',
}

export default function TrabajadoraPage() {
  const [modal, setModal] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {modal && <ModalLiquidacion onClose={() => setModal(false)} />}

      {/* ── Título ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Trabajadora</h1>
          <p className="text-gray-500 text-sm mt-1">Perfil, cotizaciones y documentos</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#0d9488] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm"
        >
          <FileText size={16} /> Generar liquidación
        </button>
      </div>

      {/* ── Perfil ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d9488] h-20" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-9 mb-5">
            <div className="w-18 h-18 w-[72px] h-[72px] bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center flex-shrink-0">
              <User size={32} className="text-[#1e3a5f]" />
            </div>
            <div className="mb-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-gray-800">{trabajadora.nombre}</h2>
                <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                  <BadgeCheck size={12} /> Al día
                </span>
              </div>
              <p className="text-[#0d9488] font-medium text-sm">Trabajadora de Casa Particular</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: FileText,  label: 'RUT',           value: trabajadora.rut      },
              { icon: Phone,     label: 'Teléfono',       value: trabajadora.telefono },
              { icon: MapPin,    label: 'Comuna',         value: trabajadora.comuna   },
              { icon: Calendar,  label: 'Fecha de inicio',value: trabajadora.inicio   },
              { icon: Clock,     label: 'Horario',        value: trabajadora.horario  },
              { icon: FileText,  label: 'Contrato',       value: trabajadora.contrato },
              { icon: Building2, label: 'AFP',            value: trabajadora.afp      },
              { icon: Heart,     label: 'Previsión salud',value: trabajadora.salud    },
              { icon: Shield,    label: 'Banco',          value: trabajadora.banco    },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3.5">
                <div className="bg-white rounded-lg p-2 shadow-sm flex-shrink-0">
                  <Icon size={15} className="text-[#1e3a5f]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cotizaciones ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1e3a5f] text-lg">Estado de cotizaciones</h2>
          <span className="text-xs text-gray-400">Últimos 6 meses</span>
        </div>

        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                {['Mes', 'Sueldo', 'AFP', 'Salud', 'Estado'].map(col => (
                  <th key={col} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 px-1 last:text-center">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cotizaciones.map(({ mes, sueldo, afp, salud, ok }) => (
                <tr key={mes} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-1 font-medium text-gray-700">{mes}</td>
                  <td className="py-3 px-1 text-gray-600">{fmt(sueldo)}</td>
                  <td className="py-3 px-1 text-gray-600">{fmt(afp)}</td>
                  <td className="py-3 px-1 text-gray-600">{fmt(salud)}</td>
                  <td className="py-3 px-1 text-center">
                    {ok ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={11} /> Pagado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
                        <XCircle size={11} /> Pendiente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
          <XCircle size={11} className="text-red-400" />
          Marzo 2026 pendiente — el pago se procesará al autorizar el pago del mes.
        </p>
      </div>

      {/* ── Documentos ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1e3a5f] text-lg">Documentos firmados</h2>
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1e3a5f] transition-colors font-medium">
            Ver todos <ChevronDown size={12} />
          </button>
        </div>

        <div className="space-y-2">
          {documentos.map(({ nombre, fecha, tipo, firmado }) => (
            <div key={nombre} className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gray-100 rounded-xl p-2.5 flex-shrink-0">
                <FileText size={18} className="text-[#1e3a5f]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{nombre}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-gray-400">{fecha}</p>
                  {firmado && (
                    <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-medium">
                      <CheckCircle2 size={10} /> Firmado
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${tipoDoc[tipo] ?? 'bg-gray-100 text-gray-600'}`}>
                {tipo}
              </span>
              <button className="p-2 text-gray-400 hover:text-[#0d9488] hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
