import { useState, useEffect, useRef } from 'react';
import { Package, TrendingUp, AlertTriangle, BarChart3, ChevronDown, Check, ArrowUpRight, ArrowDownRight, Boxes, Truck, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area, Cell } from 'recharts';
import { motion } from 'motion/react';

type MetricKey = 'Sales' | 'Purchase' | 'Stock';

const METRIC_OPTIONS: MetricKey[] = ['Sales', 'Purchase', 'Stock'];

const CATEGORY_CONFIG: Array<{
  label: string;
  keyMap: Record<MetricKey, string>;
}> = [
  {
    label: 'Inventory',
    keyMap: { Sales: 'inventorySales', Purchase: 'inventoryPurchase', Stock: 'inventoryStock' },
  },
  {
    label: 'Rental',
    keyMap: { Sales: 'rentalSales', Purchase: 'rentalPurchase', Stock: 'rentalStock' },
  },
  {
    label: 'Spare Parts',
    keyMap: { Sales: 'sparesSales', Purchase: 'sparesPurchase', Stock: 'sparesStock' },
  },
];

const stockValuesTrendData = [
  { month: 'Jan', inventorySales: 850000, inventoryPurchase: 620000, inventoryStock: 1150000, rentalSales: 280000, rentalPurchase: 240000, rentalStock: 420000, sparesSales: 160000, sparesPurchase: 130000, sparesStock: 260000 },
  { month: 'Feb', inventorySales: 920000, inventoryPurchase: 680000, inventoryStock: 1180000, rentalSales: 295000, rentalPurchase: 255000, rentalStock: 435000, sparesSales: 170000, sparesPurchase: 140000, sparesStock: 270000 },
  { month: 'Mar', inventorySales: 890000, inventoryPurchase: 650000, inventoryStock: 1220000, rentalSales: 310000, rentalPurchase: 270000, rentalStock: 445000, sparesSales: 175000, sparesPurchase: 145000, sparesStock: 275000 },
  { month: 'Apr', inventorySales: 950000, inventoryPurchase: 640000, inventoryStock: 1200000, rentalSales: 305000, rentalPurchase: 275000, rentalStock: 440000, sparesSales: 178000, sparesPurchase: 148000, sparesStock: 278000 },
  { month: 'May', inventorySales: 970000, inventoryPurchase: 645000, inventoryStock: 1235000, rentalSales: 318000, rentalPurchase: 278000, rentalStock: 448000, sparesSales: 179000, sparesPurchase: 149000, sparesStock: 279000 },
  { month: 'Jun', inventorySales: 980000, inventoryPurchase: 650000, inventoryStock: 1245000, rentalSales: 320000, rentalPurchase: 280000, rentalStock: 450000, sparesSales: 180000, sparesPurchase: 150000, sparesStock: 280000 },
];

const quotationVsSalesData = [
  { month: 'Jan', quotations: 145, sales: 98 },
  { month: 'Feb', quotations: 168, sales: 112 },
  { month: 'Mar', quotations: 192, sales: 135 },
  { month: 'Apr', quotations: 178, sales: 128 },
  { month: 'May', quotations: 205, sales: 156 },
  { month: 'Jun', quotations: 220, sales: 175 },
];

const salesVsDeliveredData = [
  { month: 'Jan', sales: 98, delivered: 95 },
  { month: 'Feb', sales: 112, delivered: 108 },
  { month: 'Mar', sales: 135, delivered: 130 },
  { month: 'Apr', sales: 128, delivered: 125 },
  { month: 'May', sales: 156, delivered: 148 },
  { month: 'Jun', sales: 175, delivered: 168 },
];

const clientLeadsData = [
  { month: 'Jan', leads: 245, actual: 98 },
  { month: 'Feb', leads: 280, actual: 112 },
  { month: 'Mar', leads: 310, actual: 135 },
  { month: 'Apr', leads: 295, actual: 128 },
  { month: 'May', leads: 340, actual: 156 },
  { month: 'Jun', leads: 365, actual: 175 },
];

const topMovers = [
  { name: 'Industrial Compressor X90', category: 'Inventory', units: 142, change: 18.4, positive: true },
  { name: 'Heavy Duty Crane Rental', category: 'Rental', units: 86, change: 12.1, positive: true },
  { name: 'Hydraulic Pump Kit', category: 'Spare Parts', units: 64, change: -5.2, positive: false },
  { name: 'Concrete Mixer 350L', category: 'Inventory', units: 58, change: 9.6, positive: true },
  { name: 'Generator 100kVA', category: 'Rental', units: 41, change: -2.8, positive: false },
];

const categoryShare = [
  { name: 'Inventory', value: 1245000, color: '#3b82f6' },
  { name: 'Rental', value: 450000, color: '#10b981' },
  { name: 'Spare Parts', value: 280000, color: '#f59e0b' },
];

const kpis = [
  {
    label: 'Total Items in Stock',
    value: '12,458',
    delta: '+3.2%',
    positive: true,
    Icon: Boxes,
    gradient: 'from-blue-500 to-indigo-600',
    soft: 'from-blue-50 to-indigo-50',
    spark: [40, 45, 42, 50, 55, 58, 62],
  },
  {
    label: 'Stock Value',
    value: '$3.24M',
    delta: '+5.8%',
    positive: true,
    Icon: BarChart3,
    gradient: 'from-emerald-500 to-teal-600',
    soft: 'from-emerald-50 to-teal-50',
    spark: [30, 38, 35, 42, 48, 52, 60],
  },
  {
    label: 'Low Stock Items',
    value: '23',
    delta: '+2',
    positive: false,
    Icon: AlertTriangle,
    gradient: 'from-amber-500 to-orange-600',
    soft: 'from-amber-50 to-orange-50',
    spark: [12, 14, 18, 16, 20, 22, 23],
  },
  {
    label: 'Avg. Turnover',
    value: '4.6x',
    delta: '+0.3x',
    positive: true,
    Icon: TrendingUp,
    gradient: 'from-purple-500 to-fuchsia-600',
    soft: 'from-purple-50 to-fuchsia-50',
    spark: [3.8, 4.0, 4.1, 4.2, 4.4, 4.5, 4.6],
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const points = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={36}>
      <AreaChart data={points} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.45} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#spark-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CATEGORY_BADGE: Record<string, string> = {
  Inventory: 'bg-blue-50 text-blue-700 ring-blue-200',
  Rental: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Spare Parts': 'bg-amber-50 text-amber-700 ring-amber-200',
};

export function IMSModule() {
  const [selectedMetrics, setSelectedMetrics] = useState<MetricKey[]>(['Sales', 'Purchase']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMetric = (metric: MetricKey) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metric)) {
        return prev.length === 1 ? prev : prev.filter(m => m !== metric);
      }
      return [...prev, metric];
    });
  };

  const activeMetrics: MetricKey[] = METRIC_OPTIONS.filter(m => selectedMetrics.includes(m));

  const METRIC_COLORS: Record<MetricKey, string> = {
    Sales: '#3b82f6',
    Purchase: '#f59e0b',
    Stock: '#10b981',
  };

  const getChartData = () => {
    return stockValuesTrendData.map(item => {
      const row: Record<string, string | number> = { month: item.month };
      activeMetrics.forEach(metric => {
        const total = CATEGORY_CONFIG.reduce((sum, cat) => {
          const value = (item as Record<string, number | string>)[cat.keyMap[metric]] as number;
          return sum + (value || 0);
        }, 0);
        row[metric] = total;
      });
      return row;
    });
  };

  const chartLines = activeMetrics.map(metric => ({
    key: metric,
    color: METRIC_COLORS[metric],
  }));

  const selectionLabel =
    selectedMetrics.length === METRIC_OPTIONS.length
      ? 'All Metrics'
      : selectedMetrics.join(' + ');

  const totalCategoryValue = categoryShare.reduce((s, c) => s + c.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory Management</h2>
          <p className="text-sm text-slate-500 mt-1">Stock movement, sales pipeline and supplier performance</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 ring-1 ring-blue-200 text-blue-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Synced 2 min ago
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, delta, positive, Icon, gradient, soft, spark }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-5"
          >
            <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br ${soft} blur-2xl opacity-70`} />
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
                  {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {delta}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
              <div className="mt-2 -mx-1">
                <Sparkline data={spark} color={positive ? '#10b981' : '#f59e0b'} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Stock Values Trend Analysis</h3>
            <p className="text-xs text-slate-500 mt-0.5">Compare Sales, Purchase &amp; Stock side by side</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(o => !o)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-slate-900 font-semibold rounded-xl px-4 py-2.5 pr-10 cursor-pointer hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md min-w-[200px]"
            >
              <span className="flex items-center gap-1.5 flex-wrap">
                {selectedMetrics.map(m => (
                  <span
                    key={m}
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-white text-xs font-semibold text-blue-700 ring-1 ring-blue-200"
                  >
                    {m}
                  </span>
                ))}
              </span>
              <ChevronDown
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 z-20 overflow-hidden">
                <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100">
                  Select metrics
                </div>
                {METRIC_OPTIONS.map(metric => {
                  const checked = selectedMetrics.includes(metric);
                  return (
                    <button
                      key={metric}
                      type="button"
                      onClick={() => toggleMetric(metric)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
                    >
                      <span
                        className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all ${
                          checked
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                      </span>
                      <span className="font-medium">{metric}</span>
                    </button>
                  );
                })}
                <div className="px-3 py-2 text-[11px] text-slate-400 border-t border-slate-100 bg-slate-50">
                  {selectionLabel}
                </div>
              </div>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={getChartData()}>
            <defs>
              {chartLines.map(line => (
                <linearGradient key={line.key} id={`area-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={line.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={line.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000)}k`} />
            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString()}`}
              cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '15px' }} iconType="circle" />
            {chartLines.map(line => (
              <Area
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={3}
                fill={`url(#area-${line.key})`}
                dot={{ fill: line.color, r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Quotation vs Sales</h3>
                <p className="text-xs text-slate-500">Conversion funnel performance</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Quotations</span>
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Sales</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={quotationVsSalesData}>
              <defs>
                <linearGradient id="qSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="qSold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="quotations" stroke="#8b5cf6" strokeWidth={3} fill="url(#qSales)" name="Quotations" dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fill="url(#qSold)" name="Sales" dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Stock Value by Category</h3>
              <p className="text-xs text-slate-500">Distribution of total inventory</p>
            </div>
          </div>
          <div className="space-y-4 mt-5">
            {categoryShare.map(cat => {
              const pct = (cat.value / totalCategoryValue) * 100;
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="font-semibold text-slate-700">{cat.name}</span>
                    </div>
                    <span className="text-slate-500 tabular-nums">${(cat.value / 1000).toFixed(0)}k · {pct.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Value</span>
              <span className="text-lg font-bold text-slate-900">${(totalCategoryValue / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Sales vs Delivered</h3>
              <p className="text-xs text-slate-500">Order fulfillment efficiency</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesVsDeliveredData} barGap={4}>
              <defs>
                <linearGradient id="barSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="barDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
              <Bar dataKey="sales" fill="url(#barSales)" name="Sales" radius={[8, 8, 0, 0]} />
              <Bar dataKey="delivered" fill="url(#barDelivered)" name="Delivered" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-xl hover:ring-slate-300 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Client Leads vs Conversions</h3>
              <p className="text-xs text-slate-500">Pipeline-to-customer funnel</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={clientLeadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
              <Line type="monotone" dataKey="leads" stroke="#f59e0b" strokeWidth={3} name="Client Leads" dot={{ fill: '#f59e0b', r: 4 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} />
              <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} name="Conversions" dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Top Moving Items</h3>
            <p className="text-xs text-slate-500 mt-0.5">Highest velocity products this month</p>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            View catalog →
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {topMovers.map((item, i) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-5 py-3 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 shrink-0">
                  #{i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                  <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full ring-1 mt-0.5 ${CATEGORY_BADGE[item.category] || 'bg-slate-50 text-slate-700 ring-slate-200'}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 tabular-nums">{item.units}</p>
                  <p className="text-[11px] text-slate-500">units</p>
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ring-1 ${
                    item.positive
                      ? 'text-emerald-700 bg-emerald-50 ring-emerald-200'
                      : 'text-rose-700 bg-rose-50 ring-rose-200'
                  }`}
                >
                  {item.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(item.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
