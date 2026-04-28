'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  ChevronRight, ChevronLeft,
  AlertTriangle, CheckCircle2, CreditCard, FileText,
  User, Shield, Heart, Building2, Zap, Clock,
  Star, ArrowRight, LayoutDashboard, CheckSquare,
  Circle, MinusCircle, Send, Download, BadgeCheck,
  Sparkles, Bell,
} from 'lucide-react'

// ─── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) => '$' + n.toLocaleString('es-CL')

// ─── Mockup: Browser Frame ────────────────────────────────────────────────────

function BrowserFrame({ children, url = 'localhost:3000' }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 w-full">
      {/* barra del navegador */}
      <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 font-mono border border-gray-200">
          {url}
        </div>
      </div>
      {/* contenido */}
      <div className="bg-gray-50">{children}</div>
    </div>
  )
}

// ─── Mockup: Mini Header ──────────────────────────────────────────────────────

function MiniHeader() {
  return (
    <div className="bg-[#1e3a5f] px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 bg-[#0d9488] rounded flex items-center justify-center text-white text-xs font-bold">C</div>
        <span className="text-white text-xs font-bold">Confía</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center">
          <Bell size={10} className="text-white" />
        </div>
        <div className="bg-white/10 rounded px-2 py-0.5 flex items-center gap-1">
          <User size={9} className="text-white" />
          <span className="text-white text-xs">Familia González</span>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: Mini Sidebar ─────────────────────────────────────────────────────

function MiniSidebar({ active }: { active: string }) {
  const items = [
    { label: 'Dashboard',    icon: LayoutDashboard },
    { label: 'Trabajadora',  icon: User            },
    { label: 'Pagos',        icon: CreditCard      },
    { label: 'Tareas',       icon: CheckSquare     },
    { label: 'Documentos',   icon: FileText        },
  ]
  return (
    <div className="bg-white border-r border-gray-200 w-28 py-2 flex flex-col gap-0.5 px-1.5">
      {items.map(({ label, icon: Icon }) => (
        <div key={label} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium ${active === label ? 'bg-[#1e3a5f] text-white' : 'text-gray-500'}`}>
          <Icon size={11} /> {label}
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Slide 1: Problema ────────────────────────────────────────────────────────
function SlideProblema() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f2540] text-white px-16 text-center">
      <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={32} className="text-amber-400" />
      </div>
      <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">El problema</p>
      <h1 className="text-5xl font-black leading-tight mb-6 max-w-3xl">
        El 70% de los empleadores domésticos en Chile
        <span className="text-amber-400"> incumple la ley</span> sin saberlo.
      </h1>
      <p className="text-white/60 text-lg max-w-2xl mb-10">
        Contratar a una trabajadora del hogar implica obligaciones legales complejas que la mayoría desconoce — y las consecuencias pueden ser muy costosas.
      </p>
      <div className="grid grid-cols-3 gap-6 max-w-3xl w-full">
        {[
          { n: '$1.000.000+',  label: 'en multas por no pagar cotizaciones'  },
          { n: '450.000',      label: 'trabajadoras de hogar en Chile'        },
          { n: '1 de cada 2',  label: 'empleadores nunca firmó un contrato'  },
        ].map(({ n, label }) => (
          <div key={n} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-3xl font-black text-amber-400 mb-1">{n}</p>
            <p className="text-white/60 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide 2: Qué es Confía ───────────────────────────────────────────────────
function SlideQueEs() {
  return (
    <div className="w-full h-full flex items-center bg-white px-16">
      <div className="flex gap-16 items-center w-full">
        <div className="flex-1">
          <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-3">La solución</p>
          <h2 className="text-5xl font-black text-[#1e3a5f] leading-tight mb-6">
            Conoce <span className="text-[#0d9488]">Confía</span>
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            La primera plataforma chilena que convierte el cumplimiento laboral doméstico en algo <strong>simple, automático y sin errores</strong>.
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            Diseñada para familias del segmento ABC1 que quieren hacer las cosas bien, sin perder tiempo ni exponerse a riesgos legales.
          </p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-6">
          <div className="w-40 h-40 bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-white text-6xl font-black">C</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-[#1e3a5f]">Confía</p>
            <p className="text-[#0d9488] text-sm font-semibold">Gestión laboral doméstica</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
            <BadgeCheck size={16} className="text-emerald-600" />
            <span className="text-emerald-700 text-sm font-semibold">100% legal y automatizado</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 3: Cómo funciona ───────────────────────────────────────────────────
function SlideComo() {
  const pasos = [
    { n: '1', icon: User,         color: 'bg-[#1e3a5f]', titulo: 'Registra',   desc: 'Ingresa los datos de tu trabajadora y genera el contrato digital en minutos.' },
    { n: '2', icon: LayoutDashboard, color: 'bg-[#0d9488]', titulo: 'Gestiona', desc: 'Controla tareas, asistencia, documentos y cotizaciones desde un solo lugar.' },
    { n: '3', icon: Zap,          color: 'bg-violet-600', titulo: 'Paga',      desc: 'Con un click, Confía distribuye el pago a la trabajadora, AFP, Fonasa y la Mutual.' },
  ]
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 px-16 text-center">
      <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-3">Cómo funciona</p>
      <h2 className="text-4xl font-black text-[#1e3a5f] mb-4">Tres pasos. Cero dolores de cabeza.</h2>
      <p className="text-gray-500 text-lg mb-12">Todo lo que necesitas para ser un empleador impecable.</p>
      <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
        {pasos.map(({ n, icon: Icon, color, titulo, desc }, i) => (
          <div key={n} className="relative">
            {i < pasos.length - 1 && (
              <div className="absolute top-10 left-[calc(100%-8px)] w-8 flex items-center justify-center z-10">
                <ArrowRight size={20} className="text-gray-300" />
              </div>
            )}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col items-center gap-4">
              <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-md`}>
                <Icon size={28} className="text-white" />
              </div>
              <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-black text-gray-500">{n}</span>
              </div>
              <div>
                <p className="text-lg font-black text-[#1e3a5f] mb-2">{titulo}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide 4: Propuesta de valor ──────────────────────────────────────────────
function SlidePropuesta() {
  const props = [
    { icon: FileText,   color: 'bg-[#1e3a5f]', titulo: 'Contrato digital',       desc: 'Genera contratos legales al instante. Sin abogados, sin papel.'           },
    { icon: Zap,        color: 'bg-[#0d9488]', titulo: 'Pago integrado',          desc: 'Un solo pago cubre sueldo + AFP + Fonasa + Mutual automáticamente.'       },
    { icon: Shield,     color: 'bg-violet-600', titulo: 'Cobertura legal',        desc: 'Alertas de vencimientos, soporte ante conflictos y gestión de reemplazos.' },
    { icon: Heart,      color: 'bg-rose-500',   titulo: 'Bienestar trabajadora',  desc: 'Seguro de vida y telemedicina incluida en los planes superiores.'          },
  ]
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f2540] px-16">
      <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-3 text-center">Propuesta de valor</p>
      <h2 className="text-4xl font-black text-white mb-3 text-center">Por qué Confía es diferente</h2>
      <p className="text-white/50 text-lg mb-10 text-center">Todo lo que un empleador responsable necesita, en una sola plataforma.</p>
      <div className="grid grid-cols-4 gap-5 w-full max-w-5xl">
        {props.map(({ icon: Icon, color, titulo, desc }) => (
          <div key={titulo} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
            <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={22} className="text-white" />
            </div>
            <p className="text-white font-bold text-base mb-2">{titulo}</p>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-gradient-to-r from-[#0d9488]/20 to-[#1e3a5f]/20 border border-[#0d9488]/30 rounded-xl px-8 py-4 text-center">
        <p className="text-white font-semibold text-lg">
          <span className="text-[#0d9488]">Un solo click</span> para cumplir con todo lo que la ley exige.
        </p>
      </div>
    </div>
  )
}

// ─── Slide 5: Tour Dashboard ──────────────────────────────────────────────────
function SlideTourDashboard() {
  return (
    <div className="w-full h-full flex items-center gap-10 bg-white px-14">
      <div className="flex-1 flex-shrink-0 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-[#0d9488]/10 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={16} className="text-[#0d9488]" />
          </div>
          <span className="text-[#0d9488] text-sm font-bold uppercase tracking-wide">Vista 1 de 4</span>
        </div>
        <h2 className="text-3xl font-black text-[#1e3a5f] mb-4">Tu centro de control</h2>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Al abrir Confía ves de inmediato todo lo que importa: estado del mes, próximo pago, días trabajados y alertas activas.
        </p>
        <div className="space-y-3">
          {[
            { c: 'bg-amber-400', t: 'Alertas inteligentes',    d: 'Avisa cuando un pago está por vencer' },
            { c: 'bg-[#0d9488]', t: 'Resumen del mes',          d: 'Estado financiero y laboral al día'   },
            { c: 'bg-[#1e3a5f]', t: 'Acceso rápido',            d: 'Las 4 funciones principales en 1 click' },
          ].map(({ c, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <div className={`${c} w-2 h-2 rounded-full mt-1.5 flex-shrink-0`} />
              <div>
                <p className="text-sm font-bold text-gray-800">{t}</p>
                <p className="text-xs text-gray-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <BrowserFrame url="confia.cl/dashboard">
          <MiniHeader />
          <div className="flex" style={{ height: 320 }}>
            <MiniSidebar active="Dashboard" />
            <div className="flex-1 p-3 overflow-hidden">
              {/* alerta */}
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-2 flex items-center gap-2 mb-3">
                <AlertTriangle size={12} className="text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-800 font-medium">El pago de este mes vence en <strong>5 días</strong></p>
                <button className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded font-semibold">Pagar</button>
              </div>
              {/* cards */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { l: 'Estado', v: 'Al día', c: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { l: 'Pago', v: '$580.000', c: 'text-teal-600', bg: 'bg-teal-50' },
                  { l: 'Días', v: '18/23', c: 'text-blue-800', bg: 'bg-blue-50' },
                  { l: 'Alertas', v: '2', c: 'text-amber-600', bg: 'bg-amber-50' },
                ].map(({ l, v, c, bg }) => (
                  <div key={l} className={`${bg} rounded-lg p-2`}>
                    <p className="text-[9px] text-gray-500 uppercase font-semibold">{l}</p>
                    <p className={`text-sm font-black ${c}`}>{v}</p>
                  </div>
                ))}
              </div>
              {/* acceso rápido */}
              <p className="text-[10px] font-bold text-gray-500 uppercase mb-1.5">Acceso Rápido</p>
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {[
                  { l: 'Trabajadora', c: 'bg-[#1e3a5f]' },
                  { l: 'Pagar', c: 'bg-[#0d9488]' },
                  { l: 'Tareas', c: 'bg-violet-600' },
                  { l: 'Docs', c: 'bg-rose-600' },
                ].map(({ l, c }) => (
                  <div key={l} className="bg-white border border-gray-100 rounded-lg p-2 flex flex-col items-center gap-1">
                    <div className={`${c} w-6 h-6 rounded-lg`} />
                    <p className="text-[9px] font-semibold text-gray-600">{l}</p>
                  </div>
                ))}
              </div>
              {/* actividad */}
              <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Actividad Reciente</p>
              <div className="bg-white rounded-lg border border-gray-100">
                {['Tarea "Limpieza" completada', 'Liquidación marzo generada', 'Pago marzo registrado'].map((t, i) => (
                  <div key={t} className={`flex items-center gap-2 px-2 py-1.5 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
                    <CheckCircle2 size={9} className="text-emerald-400 flex-shrink-0" />
                    <p className="text-[9px] text-gray-600 truncate">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  )
}

// ─── Slide 6: Tour Trabajadora ────────────────────────────────────────────────
function SlideTourTrabajadora() {
  return (
    <div className="w-full h-full flex items-center gap-10 bg-gray-50 px-14">
      <div className="flex-1 min-w-0">
        <BrowserFrame url="confia.cl/trabajadora">
          <MiniHeader />
          <div className="flex" style={{ height: 320 }}>
            <MiniSidebar active="Trabajadora" />
            <div className="flex-1 p-3 overflow-hidden">
              {/* perfil */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d9488] h-8" />
                <div className="px-3 pb-3">
                  <div className="flex items-end gap-2 -mt-4 mb-2">
                    <div className="w-8 h-8 bg-white rounded-lg border-2 border-white shadow flex items-center justify-center">
                      <User size={14} className="text-[#1e3a5f]" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-800">María Pérez</p>
                      <p className="text-[9px] text-[#0d9488] font-semibold">Trabajadora de Casa Particular</p>
                    </div>
                    <span className="ml-auto text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">Al día</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {['RUT: 12.345.678-9', 'AFP: Habitat', 'Desde: 15/03/22'].map(d => (
                      <div key={d} className="bg-gray-50 rounded px-1.5 py-1">
                        <p className="text-[8px] text-gray-500">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* cotizaciones */}
              <div className="bg-white rounded-xl border border-gray-100 p-2">
                <p className="text-[9px] font-bold text-gray-500 uppercase mb-1.5">Cotizaciones últimos 6 meses</p>
                <table className="w-full text-[8px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Mes', 'Sueldo', 'AFP', 'Salud', 'Estado'].map(h => (
                        <th key={h} className="text-left text-gray-400 pb-1 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Ene 2026', '$550.000', '$55.000', '$38.500', true],
                      ['Feb 2026', '$550.000', '$55.000', '$38.500', true],
                      ['Mar 2026', '$550.000', '$55.000', '$38.500', false],
                    ].map(([m, s, a, sa, ok], i) => (
                      <tr key={String(m)} className="border-b border-gray-50">
                        <td className="py-1 text-gray-600">{m}</td>
                        <td className="text-gray-600">{s}</td>
                        <td className="text-gray-600">{a}</td>
                        <td className="text-gray-600">{sa}</td>
                        <td>
                          {ok
                            ? <span className="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded-full font-bold">✓</span>
                            : <span className="bg-red-100 text-red-600 px-1 py-0.5 rounded-full font-bold">✗</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
      <div className="flex-1 flex-shrink-0 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center">
            <User size={16} className="text-[#1e3a5f]" />
          </div>
          <span className="text-[#0d9488] text-sm font-bold uppercase tracking-wide">Vista 2 de 4</span>
        </div>
        <h2 className="text-3xl font-black text-[#1e3a5f] mb-4">Todo sobre tu trabajadora</h2>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Un perfil completo con datos personales, contractuales y el historial de cotizaciones de los últimos 6 meses.
        </p>
        <div className="space-y-3">
          {[
            { c: 'bg-[#1e3a5f]', t: 'Perfil centralizado',    d: 'RUT, AFP, salud, banco y contrato en un solo lugar' },
            { c: 'bg-[#0d9488]', t: 'Estado de cotizaciones',  d: 'Verifica mes a mes si todas están pagadas'           },
            { c: 'bg-violet-600', t: 'Documentos firmados',    d: 'Contrato y liquidaciones descargables al instante'   },
          ].map(({ c, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <div className={`${c} w-2 h-2 rounded-full mt-1.5 flex-shrink-0`} />
              <div>
                <p className="text-sm font-bold text-gray-800">{t}</p>
                <p className="text-xs text-gray-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 7: Tour Pago ───────────────────────────────────────────────────────
function SlideTourPago() {
  return (
    <div className="w-full h-full flex items-center gap-10 bg-white px-14">
      <div className="flex-1 flex-shrink-0 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-[#0d9488]/10 rounded-lg flex items-center justify-center">
            <CreditCard size={16} className="text-[#0d9488]" />
          </div>
          <span className="text-[#0d9488] text-sm font-bold uppercase tracking-wide">Vista 3 de 4</span>
        </div>
        <h2 className="text-3xl font-black text-[#1e3a5f] mb-4">Un click. Cuatro pagos.</h2>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          La función estrella de Confía. El empleador autoriza un solo monto y la plataforma distribuye automáticamente a cada institución.
        </p>
        <div className="space-y-3">
          {[
            { c: 'bg-[#1e3a5f]', t: 'Sueldo a la trabajadora',  d: 'Transferencia directa a su cuenta bancaria'         },
            { c: 'bg-violet-600', t: 'Cotización AFP',            d: 'Pago automático a AFP Habitat'                      },
            { c: 'bg-rose-500',   t: 'Cotización Fonasa',         d: 'Pago automático al sistema de salud'                },
            { c: 'bg-amber-500',  t: 'Mutual de Seguridad',       d: 'Seguro de accidentes al día, siempre'               },
          ].map(({ c, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <div className={`${c} w-2 h-2 rounded-full mt-1.5 flex-shrink-0`} />
              <div>
                <p className="text-sm font-bold text-gray-800">{t}</p>
                <p className="text-xs text-gray-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <BrowserFrame url="confia.cl/pago">
          <MiniHeader />
          <div className="flex" style={{ height: 320 }}>
            <MiniSidebar active="Pagos" />
            <div className="flex-1 p-3 overflow-hidden space-y-2">
              {/* card pago actual */}
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d9488] rounded-xl p-3 text-white">
                <p className="text-[9px] text-white/70 uppercase font-semibold">Pago Actual · Abril 2026</p>
                <p className="text-xl font-black mt-0.5">$646.700</p>
                <p className="text-[9px] text-white/70">Vence en 5 días</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-white text-[#1e3a5f] text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <Send size={8} /> Autorizar pago
                  </button>
                  <button className="bg-white/20 text-white text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <Download size={8} /> Liquidación
                  </button>
                </div>
              </div>
              {/* desglose */}
              <div className="bg-white rounded-xl border border-gray-100 p-2">
                <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Distribución automática</p>
                {[
                  { icon: User,      color: 'bg-[#1e3a5f]', n: 'Trabajadora',    m: '$550.000' },
                  { icon: Building2, color: 'bg-violet-600', n: 'AFP Habitat',    m: '$55.000'  },
                  { icon: Heart,     color: 'bg-rose-500',   n: 'Fonasa',         m: '$38.500'  },
                  { icon: Shield,    color: 'bg-amber-500',  n: 'Mutual',         m: '$3.200'   },
                ].map(({ icon: Icon, color, n, m }) => (
                  <div key={n} className="flex items-center gap-2 py-1 border-b border-gray-50 last:border-0">
                    <div className={`${color} w-5 h-5 rounded flex items-center justify-center flex-shrink-0`}>
                      <Icon size={9} className="text-white" />
                    </div>
                    <span className="text-[9px] text-gray-600 flex-1">{n}</span>
                    <span className="text-[9px] font-bold text-gray-800">{m}</span>
                    <CheckCircle2 size={9} className="text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  )
}

// ─── Slide 8: Tour Tareas ─────────────────────────────────────────────────────
function SlideTourTareas() {
  return (
    <div className="w-full h-full flex items-center gap-10 bg-gray-50 px-14">
      <div className="flex-1 min-w-0">
        <BrowserFrame url="confia.cl/tareas">
          <MiniHeader />
          <div className="flex" style={{ height: 320 }}>
            <MiniSidebar active="Tareas" />
            <div className="flex-1 p-3 overflow-hidden space-y-2">
              {/* progreso */}
              <div className="bg-white rounded-xl border border-gray-100 p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-bold text-gray-600">Progreso semanal</span>
                  <span className="text-sm font-black text-[#0d9488]">68%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0d9488] to-[#1e3a5f] rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              {/* días */}
              <div className="grid grid-cols-5 gap-1">
                {[
                  { d: 'Lun', n: '4/4', ok: true  },
                  { d: 'Mar', n: '3/4', ok: false },
                  { d: 'Mié', n: '3/4', ok: false },
                  { d: 'Jue', n: '0/4', ok: false },
                  { d: 'Vie', n: '0/4', ok: false },
                ].map(({ d, n, ok }, i) => (
                  <div key={d} className={`rounded-lg py-1.5 text-center border ${i === 0 ? 'bg-[#1e3a5f] border-[#1e3a5f]' : ok ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-100'}`}>
                    <p className={`text-[8px] font-bold ${i === 0 ? 'text-white/70' : 'text-gray-400'}`}>{d}</p>
                    <p className={`text-[10px] font-black ${i === 0 ? 'text-white' : ok ? 'text-emerald-600' : 'text-gray-700'}`}>{n}</p>
                  </div>
                ))}
              </div>
              {/* tareas del día */}
              <div className="bg-white rounded-xl border border-gray-100 p-2">
                <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Lunes — 4 de 4 completadas</p>
                {[
                  { t: 'Barrer y trapear living', e: 'completada' },
                  { t: 'Preparar almuerzo',        e: 'completada' },
                  { t: 'Lavar ropa de cama',       e: 'completada' },
                  { t: 'Limpiar baño principal',   e: 'completada' },
                ].map(({ t, e }) => (
                  <div key={t} className="flex items-center gap-2 py-1 border-b border-gray-50 last:border-0">
                    <CheckCircle2 size={10} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-[9px] text-gray-400 line-through flex-1">{t}</span>
                    <span className="text-[8px] bg-emerald-100 text-emerald-600 px-1 rounded font-semibold">Limpieza</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
      <div className="flex-1 flex-shrink-0 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
            <CheckSquare size={16} className="text-violet-600" />
          </div>
          <span className="text-[#0d9488] text-sm font-bold uppercase tracking-wide">Vista 4 de 4</span>
        </div>
        <h2 className="text-3xl font-black text-[#1e3a5f] mb-4">Organiza el trabajo del hogar</h2>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Un checklist semanal claro para que tanto el empleador como la trabajadora sepan exactamente qué se hace cada día.
        </p>
        <div className="space-y-3">
          {[
            { c: 'bg-[#0d9488]', t: 'Vista día a día',        d: 'Navega entre lunes y viernes con un click'         },
            { c: 'bg-violet-600', t: 'Estados de tarea',      d: 'Pendiente, completada o saltada — siempre claro'   },
            { c: 'bg-[#1e3a5f]', t: 'Progreso automático',    d: 'La barra semanal se actualiza en tiempo real'      },
          ].map(({ c, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <div className={`${c} w-2 h-2 rounded-full mt-1.5 flex-shrink-0`} />
              <div>
                <p className="text-sm font-bold text-gray-800">{t}</p>
                <p className="text-xs text-gray-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 9: Precios ─────────────────────────────────────────────────────────
function SlidePrecios() {
  const [seleccion, setSeleccion] = useState<number | null>(null)
  const [guardando, setGuardando] = useState(false)
  const [guardado,  setGuardado]  = useState(false)

  const elegir = async (value: number, label: string) => {
    setSeleccion(value)
    setGuardando(true)
    try {
      await fetch('/api/respuesta', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ opcion: label }),
      })
      setGuardado(true)
    } catch {
      // silencioso — la UX no debe romperse si falla el guardado
    } finally {
      setGuardando(false)
    }
  }

  const planes = [
    {
      nombre: 'Básico',
      precio: 14990,
      color:  'border-gray-200',
      header: 'bg-gray-50',
      badge:  '',
      features: [
        'Contrato digital',
        'Liquidación mensual',
        'Alertas legales',
        '1 trabajadora',
      ],
    },
    {
      nombre: 'Estándar',
      precio: 27990,
      color:  'border-[#0d9488]',
      header: 'bg-[#0d9488]',
      badge:  'Más popular',
      features: [
        'Todo lo del Básico',
        'Pago integrado automático',
        'Sueldo + cotizaciones en 1 acción',
        'Seguro de vida trabajadora',
        '2 trabajadoras',
      ],
    },
    {
      nombre: 'Premium',
      precio: 36990,
      color:  'border-[#1e3a5f]',
      header: 'bg-[#1e3a5f]',
      badge:  '',
      features: [
        'Todo lo del Estándar',
        'Soporte legal ante conflictos',
        'Gestión de reemplazos',
        'Telemedicina trabajadora',
        '3 trabajadoras',
      ],
    },
  ]

  const rangos = [
    { label: 'Menos de $10.000', value: 0 },
    { label: '$10.000 – $20.000', value: 1 },
    { label: '$20.000 – $30.000', value: 2 },
    { label: 'Más de $30.000',    value: 3 },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 px-12">
      <p className="text-[#0d9488] text-sm font-bold uppercase tracking-widest mb-2 text-center">Planes y precios</p>
      <h2 className="text-4xl font-black text-[#1e3a5f] mb-1 text-center">Elige tu plan</h2>
      <p className="text-gray-500 mb-7 text-center text-sm">Todos los planes incluyen 30 días gratis. Sin tarjeta de crédito.</p>

      <div className="grid grid-cols-3 gap-5 w-full max-w-4xl mb-7">
        {planes.map(({ nombre, precio, color, header, badge, features }) => (
          <div key={nombre} className={`bg-white rounded-2xl border-2 ${color} shadow-sm overflow-hidden relative`}>
            {badge && (
              <div className="absolute top-3 right-3 bg-[#0d9488] text-white text-xs font-bold px-2.5 py-1 rounded-full">{badge}</div>
            )}
            <div className={`${header} px-5 py-4`}>
              <p className={`font-black text-lg ${header === 'bg-gray-50' ? 'text-gray-800' : 'text-white'}`}>{nombre}</p>
              <div className={`flex items-baseline gap-1 mt-1 ${header === 'bg-gray-50' ? 'text-gray-800' : 'text-white'}`}>
                <span className="text-2xl font-black">{fmt(precio)}</span>
                <span className={`text-xs ${header === 'bg-gray-50' ? 'text-gray-500' : 'text-white/70'}`}>/mes</span>
              </div>
            </div>
            <div className="px-5 py-4 space-y-2">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-xs text-gray-600">{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* disposición a pagar */}
      <div className="bg-white border border-gray-200 rounded-2xl px-8 py-5 w-full max-w-4xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-amber-500" />
          <p className="font-bold text-gray-800">¿Cuánto pagarías tú por un servicio como Confía?</p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {rangos.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => elegir(value, label)}
              disabled={guardando || guardado}
              className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all disabled:cursor-default ${
                seleccion === value
                  ? 'border-[#0d9488] bg-teal-50 text-[#0d9488]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {guardando && (
          <p className="text-sm text-gray-400 mt-3 text-center animate-in fade-in duration-200">
            Guardando respuesta…
          </p>
        )}
        {guardado && (
          <p className="text-sm text-[#0d9488] font-semibold mt-3 text-center animate-in fade-in duration-300">
            ✓ ¡Gracias! Tu respuesta quedó registrada.
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Slide 10: QR ─────────────────────────────────────────────────────────────
function SlideQR() {
  const [url, setUrl] = useState('https://tu-proyecto.vercel.app/presentacion')
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&color=1e3a5f&bgcolor=ffffff&qzone=1`

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0f2540] px-16">
      <div className="flex gap-16 items-center">
        {/* QR */}
        <div className="flex flex-col items-center gap-5">
          <div className="bg-white p-4 rounded-3xl shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="QR Confía" width={200} height={200} className="rounded-xl" />
          </div>
          <p className="text-white/50 text-sm">Escanea con la cámara de tu celular</p>
        </div>

        {/* Texto */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-[#0d9488] rounded-lg flex items-center justify-center text-white text-sm font-black">C</div>
            <span className="text-white font-bold text-lg">Confía</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Explora el prototipo desde tu celular
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-6">
            Escanea el código QR y accede a la presentación completa — o directo a la aplicación — desde cualquier dispositivo.
          </p>

          {/* Input URL editable */}
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-2">Actualiza el link de ngrok</p>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 placeholder-white/30"
              placeholder="https://tu-link.ngrok.io/presentacion"
            />
            <p className="text-white/30 text-xs mt-2">El QR se actualiza automáticamente al escribir</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRESENTACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

const SLIDES = [
  { id: 'problema',    component: SlideProblema,       titulo: 'El Problema'       },
  { id: 'quees',       component: SlideQueEs,          titulo: '¿Qué es Confía?'   },
  { id: 'como',        component: SlideComo,           titulo: 'Cómo funciona'     },
  { id: 'propuesta',   component: SlidePropuesta,      titulo: 'Propuesta de valor'},
  { id: 'dashboard',   component: SlideTourDashboard,  titulo: 'Tour — Dashboard'  },
  { id: 'trabajadora', component: SlideTourTrabajadora,titulo: 'Tour — Trabajadora'},
  { id: 'pago',        component: SlideTourPago,       titulo: 'Tour — Pagos'      },
  { id: 'tareas',      component: SlideTourTareas,     titulo: 'Tour — Tareas'     },
  { id: 'precios',     component: SlidePrecios,        titulo: 'Planes y precios'  },
  { id: 'qr',          component: SlideQR,             titulo: 'Compartir'         },
]

export default function PresentacionPage() {
  const [actual, setActual] = useState(0)
  const [dir, setDir]       = useState<'next' | 'prev'>('next')
  const [animando, setAnimando] = useState(false)

  const ir = useCallback((destino: number) => {
    if (animando || destino < 0 || destino >= SLIDES.length) return
    setDir(destino > actual ? 'next' : 'prev')
    setAnimando(true)
    setTimeout(() => {
      setActual(destino)
      setAnimando(false)
    }, 220)
  }, [actual, animando])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  ir(actual + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    ir(actual - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [actual, ir])

  const Slide = SLIDES[actual].component

  return (
    <div className="fixed inset-0 bg-black flex flex-col" style={{ zIndex: 9999 }}>

      {/* ── Contenido ── */}
      <div
        className={`flex-1 overflow-hidden transition-opacity duration-200 ${animando ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: animando ? (dir === 'next' ? 'translateX(-12px)' : 'translateX(12px)') : 'translateX(0)', transition: 'opacity 220ms, transform 220ms' }}
      >
        <Slide />
      </div>

      {/* ── Barra inferior ── */}
      <div className="bg-black/80 backdrop-blur-sm border-t border-white/10 px-6 py-3 flex items-center gap-4">

        {/* Navegación izq */}
        <button
          onClick={() => ir(actual - 1)}
          disabled={actual === 0}
          className="flex items-center gap-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors text-sm font-medium"
        >
          <ChevronLeft size={18} /> Anterior
        </button>

        {/* Dots */}
        <div className="flex-1 flex items-center justify-center gap-2 overflow-x-auto">
          {SLIDES.map(({ id, titulo }, i) => (
            <button
              key={id}
              onClick={() => ir(i)}
              title={titulo}
              className={`transition-all duration-200 rounded-full ${
                i === actual
                  ? 'bg-[#0d9488] w-6 h-2'
                  : 'bg-white/20 hover:bg-white/40 w-2 h-2'
              }`}
            />
          ))}
        </div>

        {/* Contador */}
        <span className="text-white/30 text-xs font-mono flex-shrink-0">
          {actual + 1} / {SLIDES.length}
        </span>

        {/* Navegación der */}
        <button
          onClick={() => ir(actual + 1)}
          disabled={actual === SLIDES.length - 1}
          className="flex items-center gap-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors text-sm font-medium"
        >
          Siguiente <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
