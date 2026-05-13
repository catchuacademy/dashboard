import { FileText, ShoppingCart, Building2, Globe, FileCheck, TrendingUp, TrendingDown, Wallet, Receipt, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'motion/react';

const vatSalesStatusData = [
  { name: 'Approved', value: 850, color: '#10b981' },
  { name: 'Not Approved', value: 120, color: '#f59e0b' },
  { name: 'Cancelled', value: 45, color: '#ef4444' },
];

const vatSalesTypeData = [
  { name: 'B2B', value: 680, color: '#3b82f6' },
  { name: 'B2C', value: 335, color: '#8b5cf6' },
];

const vatPurchaseStatusData = [
  { name: 'Approved', value: 620, color: '#10b981' },
  { name: 'Not Approved', value: 95, color: '#f59e0b' },
  { name: 'Cancelled', value: 28, color: '#ef4444' },
];

const vatSalesLocationData = [
  { name: 'Local', value: 745, color: '#3b82f6' },
  { name: 'Foreign', value: 270, color: '#8b5cf6' },
];

const vatProformaData = [
  { name: 'Not Processed', value: 142, color: '#ef4444' },
  { name: 'Processed', value: 89, color: '#f59e0b' },
  { name: 'Approved', value: 234, color: '#10b981' },
];

const vatKpis = [
  {
    label: 'VAT Collected',
    value: '$248,560',
    delta: '+8.4%',
    positive: true,
    Icon: Wallet,
    gradient: 'from-blue-500 to-indigo-600',
    soft: 'from-blue-50 to-indigo-50',
  },
  {
    label: 'VAT Payable',
    value: '$96,420',
    delta: '+3.1%',
    positive: false,
    Icon: Receipt,
    gradient: 'from-rose-500 to-pink-600',
    soft: 'from-rose-50 to-pink-50',
  },
  {
    label: 'Refund Pending',
    value: '$18,250',
    delta: '-12.6%',
    positive: true,
    Icon: Clock,
    gradient: 'from-amber-500 to-orange-600',
    soft: 'from-amber-50 to-orange-50',
  },
];

const recentActivity = [
  { ref: 'INV-2841', party: 'Gulf Construction LLC', amount: '$12,450', status: 'Approved', kind: 'Sales' },
  { ref: 'INV-2840', party: 'Emirates Steel', amount: '$8,920', status: 'Not Approved', kind: 'Sales' },
  { ref: 'PUR-1156', party: 'Al Futtaim Trading', amount: '$5,640', status: 'Approved', kind: 'Purchase' },
  { ref: 'INV-2839', party: 'Dubai Holdings', amount: '$22,100', status: 'Approved', kind: 'Sales' },
  { ref: 'PUR-1155', party: 'Saudi Logistics Co', amount: '$3,280', status: 'Cancelled', kind: 'Purchase' },
];

const statusBadge = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
    case 'Not Approved':
      return 'bg-amber-50 text-amber-700 ring-amber-200';
    case 'Cancelled':
      return 'bg-rose-50 text-rose-700 ring-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 ring-slate-200';
  }
};

interface DonutCardProps {
  title: string;
  Icon: typeof FileText;
  iconColor: string;
  data: { name: string; value: number; color: string }[];
  delay?: number;
  totalLabel?: string;
}

function DonutCard({ title, Icon, iconColor, data, delay = 0, totalLabel = 'Total' }: DonutCardProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg bg-slate-50 ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
        </div>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={82}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`${title}-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{totalLabel}</span>
          <span className="text-2xl font-bold text-slate-900">{total.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {data.map(d => {
          const pct = total > 0 ? ((d.value / total) * 100).toFixed(1) : '0';
          return (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-slate-600 font-medium">{d.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-900 font-semibold">{d.value.toLocaleString()}</span>
                <span className="text-slate-400 text-[11px] tabular-nums w-10 text-right">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function VATModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">VAT Management</h2>
          <p className="text-sm text-slate-500 mt-1">Tax compliance, filings and reconciliation overview</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live · Q2 2026
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vatKpis.map(({ label, value, delta, positive, Icon, gradient, soft }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-5"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${soft} blur-2xl opacity-70`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ${
                    positive
                      ? 'text-emerald-700 bg-emerald-50 ring-emerald-200'
                      : 'text-rose-700 bg-rose-50 ring-rose-200'
                  }`}
                >
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {delta}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DonutCard
          title="VAT Sales Status"
          Icon={FileText}
          iconColor="text-blue-600"
          data={vatSalesStatusData}
          delay={0.1}
          totalLabel="Invoices"
        />
        <DonutCard
          title="VAT Sales Type"
          Icon={ShoppingCart}
          iconColor="text-purple-600"
          data={vatSalesTypeData}
          delay={0.15}
          totalLabel="Invoices"
        />
        <DonutCard
          title="VAT Purchase Status"
          Icon={Building2}
          iconColor="text-emerald-600"
          data={vatPurchaseStatusData}
          delay={0.2}
          totalLabel="Invoices"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">VAT Sales · Local vs Foreign</h3>
            </div>
            <div className="text-xs text-slate-500">Invoices issued</div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={vatSalesLocationData} barSize={70}>
              <defs>
                <linearGradient id="barLocal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="barForeign" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                {vatSalesLocationData.map((entry, idx) => (
                  <Cell key={idx} fill={idx === 0 ? 'url(#barLocal)' : 'url(#barForeign)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <DonutCard
          title="VAT Proforma Status"
          Icon={FileCheck}
          iconColor="text-orange-600"
          data={vatProformaData}
          delay={0.3}
          totalLabel="Proformas"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Recent VAT Activity</h3>
            <p className="text-xs text-slate-500 mt-0.5">Latest invoices and purchase entries</p>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            View all →
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {recentActivity.map((item, i) => (
            <div
              key={item.ref}
              className="flex items-center justify-between px-5 py-3 hover:bg-slate-50/60 transition-colors"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                    item.kind === 'Sales' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                  }`}
                >
                  {item.kind === 'Sales' ? 'S' : 'P'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{item.party}</p>
                  <p className="text-xs text-slate-500">{item.ref} · {item.kind}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-slate-900 tabular-nums">{item.amount}</span>
                <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ring-1 ${statusBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
