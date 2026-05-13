import { useState } from 'react';
import { FinanceModule } from './components/FinanceModule';
import { VATModule } from './components/VATModule';
import { IMSModule } from './components/IMSModule';
import { DollarSign, FileText, Package, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('finance');

  const tabs = [
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'vat', label: 'VAT', icon: FileText },
    { id: 'ims', label: 'IMS', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight tracking-tight">
                Al Injaz Contracting Establishment, Aicon
              </h1>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 mt-0.5">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Powered By</span>
                <span className="font-semibold text-teal-700">QuickDice ERP</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xs font-semibold shadow">
              <Package className="w-3.5 h-3.5" />
              <span>Business Suite</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md ring-1 ring-slate-200/60 mb-6 overflow-hidden">
          <nav className="flex border-b border-slate-100 bg-gradient-to-r from-white via-slate-50 to-white">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 sm:px-8 py-3.5 font-semibold text-sm transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/60'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-full"></div>
                  )}
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          {activeTab === 'finance' && <FinanceModule />}
          {activeTab === 'vat' && <VATModule />}
          {activeTab === 'ims' && <IMSModule />}
        </div>
      </div>
    </div>
  );
}