'use client';

import { ChevronDown, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';

// Template simplifié pour illustration des standards Premium Lists
export const PremiumListTemplate = ({ items }: { items: any[] }) => {
  return (
    <div className="w-full space-y-4 p-6 bg-background/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
      {/* Header avec Recherche et Filtres */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Recherche fulltext..." 
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Table / List Area */}
      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-semibold text-sm cursor-pointer hover:text-primary transition-colors">
                Nom <ChevronDown className="inline w-4 h-4 ml-1" />
              </th>
              <th className="p-4 font-semibold text-sm">Statut</th>
              <th className="p-4 font-semibold text-sm">Date</th>
              <th className="p-4 text-right font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.email}</div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/20">
                    ACTIF
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">12 Mars 2024</td>
                <td className="p-4 text-right">
                  <button className="text-muted-foreground hover:text-primary transition-colors">Détails</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
        <div className="text-sm text-muted-foreground">
          Affichage de <span className="font-medium text-foreground">1-10</span> sur <span className="font-medium text-foreground">100</span>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary/50">
            <option>10 lignes</option>
            <option>15 lignes</option>
            <option>30 lignes</option>
            <option>100 lignes</option>
          </select>
          <div className="flex gap-1 ml-4">
            <button className="p-2 hover:bg-white/5 rounded-lg disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-primary bg-primary/10">1</button>
            <button className="p-2 hover:bg-white/5 rounded-lg">2</button>
            <button className="p-2 hover:bg-white/5 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
