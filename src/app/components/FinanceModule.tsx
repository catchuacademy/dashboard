import { useState } from 'react';
import { Wallet, Users, UserCheck, TrendingUp, TrendingDown, ChevronDown, ArrowUpRight, ArrowDownRight, Building2, Banknote, Coins, PiggyBank, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const revenueData = [
  { name: 'Acme Corp', amount: 145000 },
  { name: 'Tech Solutions', amount: 128000 },
  { name: 'Global Industries', amount: 98000 },
  { name: 'Digital Systems', amount: 87000 },
  { name: 'Smart Enterprises', amount: 76000 },
];

const expenseData = [
  { name: 'Salaries', amount: 185000 },
  { name: 'Rent & Utilities', amount: 65000 },
  { name: 'Equipment', amount: 48000 },
  { name: 'Marketing', amount: 42000 },
  { name: 'Software Licenses', amount: 35000 },
];

const cashFlowData = [
  { month: 'Jan', inflow: 420000, outflow: 285000 },
  { month: 'Feb', inflow: 465000, outflow: 312000 },
  { month: 'Mar', inflow: 510000, outflow: 295000 },
  { month: 'Apr', inflow: 488000, outflow: 340000 },
  { month: 'May', inflow: 552000, outflow: 365000 },
  { month: 'Jun', inflow: 598000, outflow: 380000 },
];

const cashBankData = [
  { account: 'Main Business Account', balance: '$745,230', bank: 'Chase Bank', Icon: Building2, accent: 'from-blue-500 to-indigo-600' },
  { account: 'Payroll Account', balance: '$285,450', bank: 'Wells Fargo', Icon: Banknote, accent: 'from-emerald-500 to-teal-600' },
  { account: 'Savings Account', balance: '$180,210', bank: 'Bank of America', Icon: PiggyBank, accent: 'from-purple-500 to-fuchsia-600' },
  { account: 'Petty Cash', balance: '$35,000', bank: 'Cash', Icon: Coins, accent: 'from-amber-500 to-orange-600' },
];

const clientOutstandingData = [
  { client: 'Acme Corp', amount: '$125,400', dueDate: '2026-05-15', status: 'Overdue' },
  { client: 'Tech Solutions', amount: '$98,300', dueDate: '2026-05-20', status: 'Due Soon' },
  { client: 'Global Industries', amount: '$87,650', dueDate: '2026-06-05', status: 'Current' },
  { client: 'Digital Systems', amount: '$75,200', dueDate: '2026-06-10', status: 'Current' },
  { client: 'Smart Enterprises', amount: '$67,850', dueDate: '2026-05-25', status: 'Due Soon' },
  { client: 'Innovation Labs', amount: '$45,600', dueDate: '2026-06-15', status: 'Current' },
  { client: 'Future Tech', amount: '$34,200', dueDate: '2026-05-18', status: 'Overdue' },
];

const supplierOutstandingData = [
  { supplier: 'Office Supplies Co', amount: '$85,400', dueDate: '2026-05-12', status: 'Overdue' },
  { supplier: 'Tech Equipment Ltd', amount: '$72,300', dueDate: '2026-05-18', status: 'Due Soon' },
  { supplier: 'Software Vendors Inc', amount: '$65,890', dueDate: '2026-06-02', status: 'Current' },
  { supplier: 'Building Maintenance', amount: '$48,750', dueDate: '2026-06-08', status: 'Current' },
  { supplier: 'Marketing Agency', amount: '$55,200', dueDate: '2026-05-22', status: 'Due Soon' },
  { supplier: 'Logistics Partners', amount: '$48,100', dueDate: '2026-06-12', status: 'Current' },
];

const summaryKpis = [
  {
    label: 'Cash / Bank Balance',
    value: '$1,245,890',
    delta: '+12.5%',
    positive: true,
    Icon: Wallet,
    gradient: 'from-emerald-500 to-teal-600',
    soft: 'from-emerald-50 to-teal-50',
    spark: [820, 880, 910, 950, 1020, 1180, 1245],
    sparkColor: '#10b981',
    expandKey: 'cash',
  },
  {
    label: 'Client Outstanding',
    value: '$534,200',
    delta: '-8.2%',
    positive: false,
    Icon: Users,
    gradient: 'from-amber-500 to-orange-600',
    soft: 'from-amber-50 to-orange-50',
    spark: [620, 600, 580, 565, 555, 545, 534],
    sparkColor: '#f59e0b',
    expandKey: 'client',
  },
  {
    label: 'Supplier Outstanding',
    value: '$375,640',
    delta: '+5.1%',
    positive: true,
    Icon: UserCheck,
    gradient: 'from-rose-500 to-pink-600',
    soft: 'from-rose-50 to-pink-50',
    spark: [340, 348, 355, 360, 366, 372, 375],
    sparkColor: '#ef4444',
    expandKey: 'supplier',
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const points = data.map((v, i) => ({ i, v }));
  const id = `fin-spark-${color.replace('#', '')}`;
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={points} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.45} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#${id})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Overdue':
      return 'bg-rose-50 text-rose-700 ring-rose-200';
    case 'Due Soon':
      return 'bg-amber-50 text-amber-700 ring-amber-200';
    case 'Current':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
    default:
      return 'bg-slate-50 text-slate-700 ring-slate-200';
  }
};

export function FinanceModule() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardName: string) => {
    setExpandedCard(expandedCard === cardName ? null : cardName);
  };

  const totalInflow = cashFlowData.reduce((s, d) => s + d.inflow, 0);
  const totalOutflow = cashFlowData.reduce((s, d) => s + d.outflow, 0);
  const netCashFlow = totalInflow - totalOutflow;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Finance Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Liquidity, receivables and operating performance at a glance</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live · YTD 2026
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryKpis.map(({ label, value, delta, positive, Icon, gradient, soft, spark, sparkColor, expandKey }, i) => {
          const isExpanded = expandedCard === expandKey;
          return (
            <motion.button
              type="button"
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => toggleCard(expandKey)}
              className={`relative overflow-hidden rounded-2xl bg-white ring-1 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-5 text-left ${
                isExpanded ? 'ring-2 ring-blue-400 shadow-xl' : 'ring-slate-200'
              }`}
            >
              <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br ${soft} blur-2xl opacity-70`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ${
                        positive
                          ? 'text-emerald-700 bg-emerald-50 ring-emerald-200'
                          : 'text-rose-700 bg-rose-50 ring-rose-200'
                      }`}
                    >
                      {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {delta}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                <div className="mt-2 -mx-1">
                  <Sparkline data={spark} color={sparkColor} />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {expandedCard === 'cash' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Cash / Bank Account Details</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Live balances across all linked accounts</p>
                </div>
                <span className="text-xs text-slate-500">{cashBankData.length} accounts</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cashBankData.map((account, index) => {
                  const Icon = account.Icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-md transition-all"
                    >
                      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br ${account.accent} opacity-10 blur-2xl`} />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${account.accent} text-white shadow-sm`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{account.bank}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mb-1 truncate">{account.account}</p>
                        <p className="text-xl font-bold text-slate-900 tabular-nums">{account.balance}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {expandedCard === 'client' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Client Outstanding Receivables</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{clientOutstandingData.length} clients with open invoices</p>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Export →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/60">
                    <tr>
                      <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Client Name</th>
                      <th className="text-right py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Amount</th>
                      <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Due Date</th>
                      <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientOutstandingData.map((client, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xs font-bold text-blue-700">
                              {client.client.split(' ').map(s => s[0]).slice(0, 2).join('')}
                            </div>
                            <span className="font-semibold text-slate-900 text-sm">{client.client}</span>
                          </div>
                        </td>
                        <td className="py-3 px-5 text-right font-semibold text-amber-600 tabular-nums">{client.amount}</td>
                        <td className="py-3 px-5 text-slate-600 text-sm tabular-nums">{client.dueDate}</td>
                        <td className="py-3 px-5">
                          <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ring-1 ${statusBadge(client.status)}`}>
                            {client.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {expandedCard === 'supplier' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Supplier Outstanding Payables</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{supplierOutstandingData.length} suppliers awaiting payment</p>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Export →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/60">
                    <tr>
                      <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Supplier Name</th>
                      <th className="text-right py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Amount</th>
                      <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Due Date</th>
                      <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierOutstandingData.map((supplier, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-xs font-bold text-rose-700">
                              {supplier.supplier.split(' ').map(s => s[0]).slice(0, 2).join('')}
                            </div>
                            <span className="font-semibold text-slate-900 text-sm">{supplier.supplier}</span>
                          </div>
                        </td>
                        <td className="py-3 px-5 text-right font-semibold text-rose-600 tabular-nums">{supplier.amount}</td>
                        <td className="py-3 px-5 text-slate-600 text-sm tabular-nums">{supplier.dueDate}</td>
                        <td className="py-3 px-5">
                          <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ring-1 ${statusBadge(supplier.status)}`}>
                            {supplier.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Cash Flow Trend</h3>
              <p className="text-xs text-slate-500 mt-0.5">Six-month inflow vs outflow performance</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
              <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold">Inflow</p>
              <p className="text-sm font-bold text-emerald-700 tabular-nums">${(totalInflow / 1000000).toFixed(2)}M</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-rose-50 ring-1 ring-rose-200">
              <p className="text-[10px] uppercase tracking-wider text-rose-700 font-semibold">Outflow</p>
              <p className="text-sm font-bold text-rose-700 tabular-nums">${(totalOutflow / 1000000).toFixed(2)}M</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 ring-1 ring-blue-200">
              <p className="text-[10px] uppercase tracking-wider text-blue-700 font-semibold">Net</p>
              <p className="text-sm font-bold text-blue-700 tabular-nums">+${(netCashFlow / 1000000).toFixed(2)}M</p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={cashFlowData}>
            <defs>
              <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000)}k`} />
            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString()}`}
              cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
            />
            <Area type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={3} fill="url(#inflowGrad)" name="Inflow" dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} />
            <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={3} fill="url(#outflowGrad)" name="Outflow" dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Top 5 Customers</h3>
                <p className="text-xs text-slate-500">Revenue contribution this period</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData} layout="vertical" margin={{ left: 10 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000)}k`} />
              <YAxis type="category" dataKey="name" stroke="#475569" tickLine={false} axisLine={false} width={120} fontSize={12} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="amount" fill="url(#revGrad)" radius={[0, 8, 8, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Top 5 Expense Categories</h3>
                <p className="text-xs text-slate-500">Highest cost drivers this period</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseData} layout="vertical" margin={{ left: 10 }}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                  <stop offset="100%" stopColor="#fb7185" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000)}k`} />
              <YAxis type="category" dataKey="name" stroke="#475569" tickLine={false} axisLine={false} width={120} fontSize={12} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="amount" fill="url(#expGrad)" radius={[0, 8, 8, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
