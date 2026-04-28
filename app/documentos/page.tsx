import { FileText, Download, Eye, Plus, Shield, FileCheck } from 'lucide-react'

const documentos = [
  { nombre: 'Contrato de Trabajo', tipo: 'Contrato', fecha: '12 ene 2024', size: '145 KB', icon: Shield },
  { nombre: 'Liquidación Marzo 2026', tipo: 'Liquidación', fecha: '28 mar 2026', size: '89 KB', icon: FileCheck },
  { nombre: 'Liquidación Febrero 2026', tipo: 'Liquidación', fecha: '27 feb 2026', size: '89 KB', icon: FileCheck },
  { nombre: 'Liquidación Enero 2026', tipo: 'Liquidación', fecha: '30 ene 2026', size: '89 KB', icon: FileCheck },
  { nombre: 'Liquidación Diciembre 2025', tipo: 'Liquidación', fecha: '27 dic 2025', size: '92 KB', icon: FileCheck },
]

const tipoColors: Record<string, string> = {
  Contrato: 'bg-[#1e3a5f]/10 text-[#1e3a5f]',
  Liquidación: 'bg-teal-50 text-[#0d9488]',
}

export default function DocumentosPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Documentos</h1>
          <p className="text-gray-500 text-sm mt-1">Contratos, liquidaciones y finiquitos</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1e3a5f] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] transition-colors">
          <Plus size={16} /> Subir documento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total documentos', value: '5', color: 'text-[#1e3a5f]' },
          { label: 'Contratos vigentes', value: '1', color: 'text-emerald-600' },
          { label: 'Liquidaciones', value: '4', color: 'text-[#0d9488]' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Document list */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
        {documentos.map(({ nombre, tipo, fecha, size, icon: Icon }) => (
          <div key={nombre} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-gray-100 rounded-xl p-3 flex-shrink-0">
              <Icon size={22} className="text-[#1e3a5f]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{nombre}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {fecha} · {size}
              </p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${tipoColors[tipo] ?? 'bg-gray-100 text-gray-600'}`}>
              {tipo}
            </span>
            <div className="flex gap-1">
              <button className="p-2 text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors">
                <Eye size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-[#0d9488] hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
