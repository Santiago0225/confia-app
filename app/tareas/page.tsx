'use client'

import { useState } from 'react'
import {
  CheckCircle2, Circle, MinusCircle, Plus, X,
  ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Estado   = 'pendiente' | 'completada' | 'saltada'
type Categoria = 'limpieza' | 'cocina' | 'compras' | 'ropa' | 'otros'

interface Tarea {
  id: number
  desc: string
  cat: Categoria
  estado: Estado
  dia: number // 0 = lunes … 4 = viernes
}

// ─── Datos mock ───────────────────────────────────────────────────────────────

const INIT: Tarea[] = [
  // Lunes
  { id:  1, dia: 0, desc: 'Barrer y trapear living y comedor',   cat: 'limpieza', estado: 'completada' },
  { id:  2, dia: 0, desc: 'Preparar desayuno y almuerzo',        cat: 'cocina',   estado: 'completada' },
  { id:  3, dia: 0, desc: 'Lavar ropa de cama',                  cat: 'ropa',     estado: 'pendiente'  },
  { id:  4, dia: 0, desc: 'Limpiar baño principal',              cat: 'limpieza', estado: 'completada' },
  // Martes
  { id:  5, dia: 1, desc: 'Compras supermercado Jumbo',          cat: 'compras',  estado: 'completada' },
  { id:  6, dia: 1, desc: 'Limpiar cocina a fondo',              cat: 'limpieza', estado: 'completada' },
  { id:  7, dia: 1, desc: 'Preparar once y cena',                cat: 'cocina',   estado: 'saltada'    },
  { id:  8, dia: 1, desc: 'Planchar ropa de la semana',          cat: 'ropa',     estado: 'pendiente'  },
  // Miércoles
  { id:  9, dia: 2, desc: 'Limpiar dormitorios y cambiar sábanas', cat: 'limpieza', estado: 'completada' },
  { id: 10, dia: 2, desc: 'Preparar almuerzo familiar',          cat: 'cocina',   estado: 'completada' },
  { id: 11, dia: 2, desc: 'Compras frutería y panadería',        cat: 'compras',  estado: 'completada' },
  { id: 12, dia: 2, desc: 'Limpiar vidrios del living',          cat: 'limpieza', estado: 'pendiente'  },
  // Jueves
  { id: 13, dia: 3, desc: 'Lavar y doblar ropa',                 cat: 'ropa',     estado: 'pendiente'  },
  { id: 14, dia: 3, desc: 'Limpiar baños segundo piso',          cat: 'limpieza', estado: 'pendiente'  },
  { id: 15, dia: 3, desc: 'Preparar comida y dejar lista cena',  cat: 'cocina',   estado: 'pendiente'  },
  { id: 16, dia: 3, desc: 'Ordenar despensa',                    cat: 'otros',    estado: 'pendiente'  },
  // Viernes
  { id: 17, dia: 4, desc: 'Limpieza general de toda la casa',    cat: 'limpieza', estado: 'pendiente'  },
  { id: 18, dia: 4, desc: 'Preparar almuerzo y dejar cena',      cat: 'cocina',   estado: 'pendiente'  },
  { id: 19, dia: 4, desc: 'Compras para el fin de semana',       cat: 'compras',  estado: 'pendiente'  },
  { id: 20, dia: 4, desc: 'Regar plantas del jardín',            cat: 'otros',    estado: 'pendiente'  },
]

// ─── Helpers de presentación ──────────────────────────────────────────────────

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

const CAT_META: Record<Categoria, { label: string; color: string }> = {
  limpieza: { label: 'Limpieza', color: 'bg-blue-100 text-blue-700'    },
  cocina:   { label: 'Cocina',   color: 'bg-rose-100 text-rose-700'    },
  compras:  { label: 'Compras',  color: 'bg-amber-100 text-amber-700'  },
  ropa:     { label: 'Ropa',     color: 'bg-violet-100 text-violet-700'},
  otros:    { label: 'Otros',    color: 'bg-gray-100 text-gray-600'    },
}

const ESTADO_CYCLE: Record<Estado, Estado> = {
  pendiente:  'completada',
  completada: 'saltada',
  saltada:    'pendiente',
}

const ESTADO_META: Record<Estado, { icon: typeof Circle; class: string; ring: string }> = {
  pendiente:  { icon: Circle,       class: 'text-gray-300',    ring: 'ring-gray-200'   },
  completada: { icon: CheckCircle2, class: 'text-emerald-500', ring: 'ring-emerald-200'},
  saltada:    { icon: MinusCircle,  class: 'text-gray-400',    ring: 'ring-gray-200'   },
}

// ─── Componente de tarea ──────────────────────────────────────────────────────

function TareaItem({
  tarea,
  onToggle,
}: {
  tarea: Tarea
  onToggle: (id: number) => void
}) {
  const { icon: Icon, class: iconCls } = ESTADO_META[tarea.estado]
  const { label, color } = CAT_META[tarea.cat]
  const saltada = tarea.estado === 'saltada'
  const completada = tarea.estado === 'completada'

  return (
    <button
      onClick={() => onToggle(tarea.id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group
        ${completada ? 'bg-emerald-50/60' : saltada ? 'bg-gray-50/80 opacity-60' : 'hover:bg-gray-50'}`}
      title="Click para cambiar estado"
    >
      <Icon size={20} className={`flex-shrink-0 transition-transform group-hover:scale-110 ${iconCls}`} />
      <span className={`flex-1 text-sm ${completada ? 'line-through text-gray-400' : saltada ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
        {tarea.desc}
      </span>
      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${color}`}>
        {label}
      </span>
    </button>
  )
}

// ─── Modal agregar tarea ──────────────────────────────────────────────────────

function ModalAgregar({
  diaActivo,
  onClose,
  onAdd,
}: {
  diaActivo: number
  onClose: () => void
  onAdd: (t: Omit<Tarea, 'id' | 'estado'>) => void
}) {
  const [desc, setDesc]   = useState('')
  const [cat, setCat]     = useState<Categoria>('limpieza')
  const [dia, setDia]     = useState<number>(diaActivo)

  const submit = () => {
    if (!desc.trim()) return
    onAdd({ desc: desc.trim(), cat, dia })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <p className="font-bold text-gray-800">Nueva tarea</p>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Descripción */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              Descripción
            </label>
            <input
              autoFocus
              value={desc}
              onChange={e => setDesc(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Ej: Limpiar el baño del segundo piso"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40 focus:border-[#0d9488] transition-all"
            />
          </div>

          {/* Día */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Día</label>
            <div className="grid grid-cols-5 gap-1.5">
              {DIAS.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setDia(i)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    dia === i
                      ? 'bg-[#1e3a5f] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {d.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Categoría</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(CAT_META) as Categoria[]).map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                    cat === c
                      ? 'border-[#0d9488] bg-teal-50 text-[#0d9488]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {CAT_META[c].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-5 pt-0">
          <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={!desc.trim()}
            className="flex-1 bg-[#0d9488] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Agregar tarea
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function TareasPage() {
  const [tareas,    setTareas]    = useState<Tarea[]>(INIT)
  const [diaActivo, setDiaActivo] = useState<number>(0) // hoy = lunes
  const [modal,     setModal]     = useState(false)

  const toggle = (id: number) =>
    setTareas(prev =>
      prev.map(t => t.id === id ? { ...t, estado: ESTADO_CYCLE[t.estado] } : t)
    )

  const addTarea = ({ desc, cat, dia }: Omit<Tarea, 'id' | 'estado'>) => {
    const newId = Math.max(0, ...tareas.map(t => t.id)) + 1
    setTareas(prev => [...prev, { id: newId, desc, cat, dia, estado: 'pendiente' }])
    setDiaActivo(dia) // saltar al día recién agregado
  }

  // Progreso semanal global
  const total      = tareas.length
  const completadas = tareas.filter(t => t.estado === 'completada').length
  const saltadas    = tareas.filter(t => t.estado === 'saltada').length
  const pct         = total ? Math.round((completadas / total) * 100) : 0

  // Progreso por día
  const resumenDia = DIAS.map((_, i) => {
    const del  = tareas.filter(t => t.dia === i)
    const done = del.filter(t => t.estado === 'completada').length
    return { total: del.length, done }
  })

  const tareasDelDia = tareas.filter(t => t.dia === diaActivo)

  return (
    <div className="max-w-4xl mx-auto space-y-5">

      {modal && (
        <ModalAgregar
          diaActivo={diaActivo}
          onClose={() => setModal(false)}
          onAdd={addTarea}
        />
      )}

      {/* ── Título ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Tareas del hogar</h1>
          <p className="text-gray-500 text-sm mt-1">Semana del 21 al 25 de abril · María Pérez</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#0d9488] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Agregar tarea
        </button>
      </div>

      {/* ── Progreso semanal ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#0d9488]" />
            <span className="font-bold text-[#1e3a5f]">Progreso semanal</span>
          </div>
          <span className="text-2xl font-bold text-[#0d9488]">{pct}%</span>
        </div>

        <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#1e3a5f] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-500" /> {completadas} completadas
          </span>
          <span className="flex items-center gap-1">
            <MinusCircle size={12} className="text-gray-400" /> {saltadas} saltadas
          </span>
          <span className="flex items-center gap-1">
            <Circle size={12} className="text-gray-300" /> {total - completadas - saltadas} pendientes
          </span>
        </div>
      </div>

      {/* ── Selector de días ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDiaActivo(d => Math.max(0, d - 1))}
          disabled={diaActivo === 0}
          className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 grid grid-cols-5 gap-2">
          {DIAS.map((dia, i) => {
            const { total: tot, done } = resumenDia[i]
            const active   = diaActivo === i
            const allDone  = tot > 0 && done === tot

            return (
              <button
                key={dia}
                onClick={() => setDiaActivo(i)}
                className={`flex flex-col items-center py-3 px-1 rounded-xl border transition-all ${
                  active
                    ? 'bg-[#1e3a5f] border-[#1e3a5f] text-white shadow-md'
                    : allDone
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide opacity-70">{dia.slice(0, 3)}</span>
                <span className={`text-lg font-bold mt-0.5 ${active ? 'text-white' : allDone ? 'text-emerald-600' : 'text-gray-800'}`}>
                  {done}<span className="text-xs font-normal opacity-60">/{tot}</span>
                </span>
                {allDone && !active && (
                  <CheckCircle2 size={12} className="text-emerald-500 mt-0.5" />
                )}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setDiaActivo(d => Math.min(4, d + 1))}
          disabled={diaActivo === 4}
          className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* ── Tareas del día activo ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-[#1e3a5f]">{DIAS[diaActivo]}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {resumenDia[diaActivo].done} de {resumenDia[diaActivo].total} tareas completadas
              &nbsp;·&nbsp;Click en una tarea para cambiar su estado
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 rounded-lg px-2.5 py-1.5">
            <Circle size={10} className="text-gray-300" /> pend.
            <span className="mx-1 text-gray-200">→</span>
            <CheckCircle2 size={10} className="text-emerald-400" /> hecho
            <span className="mx-1 text-gray-200">→</span>
            <MinusCircle size={10} className="text-gray-400" /> saltada
          </div>
        </div>

        <div className="p-3 space-y-1">
          {tareasDelDia.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Circle size={32} className="mx-auto mb-2 text-gray-200" />
              <p className="text-sm">Sin tareas para este día</p>
              <button
                onClick={() => setModal(true)}
                className="mt-3 text-[#0d9488] text-sm font-semibold hover:underline"
              >
                + Agregar una tarea
              </button>
            </div>
          ) : (
            tareasDelDia.map(t => (
              <TareaItem key={t.id} tarea={t} onToggle={toggle} />
            ))
          )}
        </div>

        {tareasDelDia.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <div className="w-full bg-gray-100 rounded-full h-1.5 mr-4">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-[#0d9488] to-[#1e3a5f] transition-all duration-500"
                style={{
                  width: `${resumenDia[diaActivo].total
                    ? Math.round((resumenDia[diaActivo].done / resumenDia[diaActivo].total) * 100)
                    : 0}%`,
                }}
              />
            </div>
            <button
              onClick={() => setModal(true)}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs text-[#0d9488] font-semibold hover:underline transition-colors"
            >
              <Plus size={13} /> Agregar
            </button>
          </div>
        )}
      </div>

      {/* ── Leyenda de categorías ── */}
      <div className="flex flex-wrap gap-2 pb-2">
        {(Object.keys(CAT_META) as Categoria[]).map(c => (
          <span key={c} className={`text-xs px-2.5 py-1 rounded-full font-semibold ${CAT_META[c].color}`}>
            {CAT_META[c].label}
          </span>
        ))}
      </div>

    </div>
  )
}
