import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Trash2, 
  TrendingUp, 
  Wallet, 
  Coins, 
  Banknote, 
  Settings, 
  LogOut, 
  ChevronRight,
  History,
  ArrowUpRight,
  AlertCircle,
  Search,
  Menu,
  X,
  Lock,
  Mail,
  User,
  CheckCircle2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart as RePie, 
  Cell, 
  Pie 
} from 'recharts';

// --- Configuration & Constants ---

const CATEGORIES = {
  'Cash (BDT)': { color: '#10b981', icon: <Banknote size={20} /> },
  'Cash (USD)': { color: '#059669', icon: <Banknote size={20} /> },
  'BD Stock': { color: '#3b82f6', icon: <TrendingUp size={20} /> },
  'NSave': { color: '#ef4444', icon: <History size={20} /> },
  'EPay': { color: '#6366f1', icon: <Wallet size={20} /> },
  'Banks': { color: '#8b5cf6', icon: <Banknote size={20} /> },
  'Gold': { color: '#f59e0b', icon: <Coins size={20} /> },
  'iFastGB': { color: '#06b6d4', icon: <TrendingUp size={20} /> },
  'Other': { color: '#18181b', icon: <PlusCircle size={20} /> },
};

// --- Authentication Component ---

const AuthPage = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper to simulate persistent users in localStorage
  const getUsers = () => JSON.parse(localStorage.getItem('vf_users') || '[]');
  const saveUsers = (users) => localStorage.setItem('vf_users', JSON.stringify(users));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const users = getUsers();

    if (mode === 'signup') {
      if (users.find(u => u.email === formData.email)) {
        setError('An account with this email already exists.');
        return;
      }
      const newUser = { ...formData };
      saveUsers([...users, newUser]);
      setSuccess('Account created! You can now sign in.');
      setMode('login');
    } 
    else if (mode === 'login') {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password.');
      }
    } 
    else if (mode === 'forgot') {
      const user = users.find(u => u.email === formData.email);
      if (user) {
        setSuccess('Password recovery instructions sent to your email.');
      } else {
        setError('Email address not found.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-3xl mb-6 shadow-xl shadow-indigo-100 transform -rotate-6 transition-transform hover:rotate-0 cursor-default">
            <TrendingUp size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">VaultFlow</h1>
          <p className="text-slate-500 mt-2 font-medium">
            {mode === 'login' ? 'Welcome back to your vault' : 
             mode === 'signup' ? 'Start your wealth journey' : 'Recover your access'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3 animate-shake">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-sm font-bold flex items-center gap-3">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex justify-between px-1 mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                {mode === 'login' && (
                  <button type="button" onClick={() => setMode('forgot')} className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group">
            {mode === 'login' ? 'Secure Sign In' : mode === 'signup' ? 'Create My Vault' : 'Send Reset Link'}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
                setSuccess('');
              }}
              className="ml-2 text-indigo-600 font-bold hover:underline"
            >
              {mode === 'login' ? 'Sign Up Free' : 'Sign In'}
            </button>
          </p>
          {mode === 'forgot' && (
            <button onClick={() => setMode('login')} className="mt-4 text-slate-400 text-sm font-bold hover:text-slate-600">Return to Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Application Component ---

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Scoped assets: In production, these would come from a real database.
  // For free hosting, we'll store them in localStorage keyed by the user's email.
  const [assets, setAssets] = useState([]);

  // Search/Filter states
  const [searchRange, setSearchRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({ category: 'Cash (BDT)', value: '', date: new Date().toISOString().split('T')[0] });

  // Load user data on login
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`vf_assets_${user.email}`);
      setAssets(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Persist user data on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`vf_assets_${user.email}`, JSON.stringify(assets));
    }
  }, [assets, user]);

  // Global hooks for data
  const historyData = useMemo(() => {
    const sorted = [...assets].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningTotal = 0;
    return sorted.map(a => {
      runningTotal += (Number(a.value) || 0);
      return { date: a.date, total: runningTotal };
    });
  }, [assets]);

  const totalValue = assets.reduce((sum, a) => sum + (Number(a.value) || 0), 0);

  const categoryData = useMemo(() => {
    return Object.keys(CATEGORIES).map(cat => ({
      name: cat,
      value: assets.filter(a => a.category === cat).reduce((sum, a) => sum + (Number(a.value) || 0), 0),
      color: CATEGORIES[cat].color
    })).filter(d => d.value > 0);
  }, [assets]);

  if (!user) return <AuthPage onLogin={setUser} />;

  // --- Functions ---

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newAsset.value) return;
    const asset = {
      id: Date.now(),
      category: newAsset.category,
      value: parseFloat(newAsset.value),
      date: newAsset.date
    };
    setAssets([...assets, asset]);
    setShowAddModal(false);
    setNewAsset({ category: 'Cash (BDT)', value: '', date: new Date().toISOString().split('T')[0] });
  };

  const deleteAsset = (id) => setAssets(assets.filter(a => a.id !== id));

  const getFilteredGrowth = () => {
    const sorted = [...assets].sort((a, b) => new Date(a.date) - new Date(b.date));
    const openingBalance = sorted
      .filter(a => new Date(a.date) < new Date(searchRange.start))
      .reduce((sum, a) => sum + (Number(a.value) || 0), 0);

    const rangeAssets = sorted.filter(a => 
      new Date(a.date) >= new Date(searchRange.start) && 
      new Date(a.date) <= new Date(searchRange.end)
    );

    let currentTotal = openingBalance;
    const data = [{ date: searchRange.start, total: openingBalance }];
    rangeAssets.forEach(a => {
      currentTotal += (Number(a.value) || 0);
      data.push({ date: a.date, total: currentTotal });
    });
    if (data[data.length-1].date !== searchRange.end) {
      data.push({ date: searchRange.end, total: currentTotal });
    }
    return data;
  };

  // --- UI Nav Item ---

  const NavItem = ({ id, label, icon: Icon, isCategory = false }) => (
    <button 
      onClick={() => { 
        if (isCategory) { setSelectedCategory(id); setActiveTab('category'); }
        else { setActiveTab(id); setSelectedCategory(null); }
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all mb-1 ${
        (isCategory ? selectedCategory === id : activeTab === id) 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <span style={{ color: ((isCategory ? selectedCategory === id : activeTab === id)) ? '#fff' : (isCategory ? CATEGORIES[id].color : undefined) }}>
          <Icon size={18} />
        </span>
        {label}
      </div>
      {isCategory && <ChevronRight size={14} className="opacity-30" />}
    </button>
  );

  // --- Tab Renders ---

  const renderDashboard = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Net Worth</p>
            <h2 className="text-3xl font-black text-slate-900 mt-2">৳ {totalValue.toLocaleString()}</h2>
          </div>
          <div className="flex items-center mt-6 text-emerald-600 text-xs font-black bg-emerald-50 w-fit px-3 py-1 rounded-full">
            <ArrowUpRight size={14} className="mr-1" />
            <span>{assets.length} Active Records</span>
          </div>
        </div>
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Primary Asset</p>
          <h2 className="text-2xl font-black text-slate-900 mt-2 truncate">
            {categoryData.length > 0 ? categoryData.sort((a,b) => b.value - a.value)[0].name : 'Zero Holdings'}
          </h2>
          <div className="mt-4 flex gap-1">
             {categoryData.slice(0,3).map((c, i) => (
               <div key={i} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c.color }}></div>
             ))}
          </div>
        </div>
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 hidden md:block">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Growth Trend</p>
          <div className="h-16 mt-2 flex items-end gap-1">
            {[4,7,5,9,12,8,15].map((v, i) => (
              <div key={i} className="flex-1 bg-indigo-50 rounded-t-md hover:bg-indigo-600 transition-colors" style={{ height: `${v*6}%` }}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-900 mb-8 tracking-tight">Financial Progression</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="date" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `৳${Math.floor(val/1000)}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                  formatter={(value) => [`৳ ${value.toLocaleString()}`, 'Portfolio Value']}
                />
                <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-900 mb-8 tracking-tight">Portfolio Split</h3>
          <div className="h-72 flex flex-col sm:flex-row items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePie>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => {
                    const percent = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : 0;
                    return [`৳ ${value.toLocaleString()} (${percent}%)`, name];
                  }}
                />
              </RePie>
            </ResponsiveContainer>
            <div className="w-full sm:w-1/2 flex flex-col justify-center gap-3 mt-6 sm:mt-0 max-h-52 overflow-y-auto px-4 scrollbar-hide">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-slate-600 text-xs font-bold truncate group-hover:text-slate-900">{cat.name}</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-black tracking-tighter"> {totalValue > 0 ? ((cat.value / totalValue) * 100).toFixed(1) : 0}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Transaction Ledger</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            <PlusCircle size={18} /> New Entry
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Asset Source</th>
                <th className="px-8 py-5">Amount (BDT)</th>
                <th className="px-8 py-5 hidden sm:table-cell">Timestamp</th>
                <th className="px-8 py-5 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assets.length === 0 ? (
                <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold italic">Your vault is currently empty. Record your first asset source above.</td></tr>
              ) : (
                [...assets].reverse().map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/30 group transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl shadow-sm" style={{ backgroundColor: CATEGORIES[asset.category]?.color + '15', color: CATEGORIES[asset.category]?.color }}>
                          {CATEGORIES[asset.category]?.icon}
                        </div>
                        <span className="font-black text-slate-700">{asset.category}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-mono font-black text-slate-900">৳ {asset.value?.toLocaleString()}</td>
                    <td className="px-8 py-5 text-slate-400 font-medium hidden sm:table-cell">{asset.date}</td>
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => deleteAsset(asset.id)} className="p-2 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSearchPage = () => {
    const data = getFilteredGrowth();
    const rangeTotal = data[data.length-1]?.total || 0;
    const startTotal = data[0]?.total || 0;
    const growth = rangeTotal - startTotal;

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
            <Search size={22} className="text-indigo-600" /> Date Range Analysis
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Start Point</label>
              <input 
                type="date"
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                value={searchRange.start}
                onChange={(e) => setSearchRange({...searchRange, start: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">End Point</label>
              <input 
                type="date"
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                value={searchRange.end}
                onChange={(e) => setSearchRange({...searchRange, end: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-8 tracking-tight">Restricted Window progression</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                  <XAxis dataKey="date" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stroke="#6366f1" fill="#6366f108" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 flex flex-col justify-center">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Opening Value</span>
              <p className="text-xl font-black text-slate-900 mt-1">৳ {startTotal.toLocaleString()}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Closing Value</span>
              <p className="text-xl font-black text-slate-900 mt-1">৳ {rangeTotal.toLocaleString()}</p>
            </div>
            <div className={`p-6 rounded-2xl border ${growth >= 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Net Yield</span>
              <p className="text-2xl font-black mt-1">৳ {growth.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCategoryPage = () => {
    const data = assets.filter(a => a.category === selectedCategory).sort((a,b) => new Date(a.date) - new Date(b.date));
    let cumulative = 0;
    const chartData = data.map(a => {
      cumulative += a.value;
      return { date: a.date, total: cumulative, amount: a.value };
    });

    return (
      <div className="space-y-6 animate-fadeIn">
        <button onClick={() => setActiveTab('dashboard')} className="flex items-center text-slate-400 hover:text-indigo-600 font-black transition-all group">
          <ChevronRight size={22} className="rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Workspace
        </button>
        <div className="flex items-center gap-5">
          <div className="p-5 rounded-3xl shadow-xl transform -rotate-3" style={{ backgroundColor: CATEGORIES[selectedCategory]?.color, color: '#fff' }}>
            {CATEGORIES[selectedCategory]?.icon}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{selectedCategory}</h1>
            <p className="text-slate-500 font-bold">Category deep-dive and history</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="date" stroke="#cbd5e1" fontSize={10} />
                <YAxis stroke="#cbd5e1" fontSize={10} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke={CATEGORIES[selectedCategory]?.color} strokeWidth={5} dot={{ r: 8, fill: CATEGORIES[selectedCategory]?.color, strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-6 right-6 z-40 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 text-slate-900"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-slate-100 flex flex-col z-50 transform transition-all duration-500 ease-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <TrendingUp size={26} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">VaultFlow</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-300 hover:text-slate-900"><X size={24} /></button>
        </div>

        <nav className="flex-1 px-5 py-4 space-y-2 overflow-y-auto scrollbar-hide">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-4">Workspace</p>
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="search" label="Search Query" icon={Search} />
          
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mt-10 mb-4">Asset Vault</p>
          <div className="space-y-1">
            {Object.keys(CATEGORIES).map(cat => (
              <NavItem key={cat} id={cat} label={cat} icon={() => CATEGORIES[cat].icon} isCategory={true} />
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div className="flex items-center gap-4 px-4 py-4 bg-slate-50 rounded-2xl mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-xs uppercase shadow-sm border border-white">
              {(user?.name || "??").substring(0,2)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black text-slate-900 truncate uppercase tracking-tight">{user?.name}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[9px] text-slate-400 font-black uppercase">Live Access</p>
              </div>
            </div>
          </div>
          <button onClick={() => setUser(null)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-widest">
            <LogOut size={16} /> Secure Exit
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 pt-24 lg:pt-12 w-full overflow-x-hidden">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-none">
              {activeTab === 'dashboard' ? 'Insight' : activeTab === 'search' ? 'Timeline' : selectedCategory}
            </h2>
            <p className="text-slate-400 font-bold text-sm lg:text-base mt-2">
              Financial vault of <span className="text-indigo-600">{user?.name}</span>
            </p>
          </div>
          <button className="hidden sm:flex p-3 text-slate-400 hover:text-indigo-600 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-lg"><Settings size={22} /></button>
        </header>

        {activeTab === 'dashboard' ? renderDashboard() : 
         activeTab === 'search' ? renderSearchPage() : renderCategoryPage()}
      </main>

      {/* Transaction Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-6 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Record Asset</h3>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-slate-100 text-slate-300 hover:text-slate-900 transition-all">✕</button>
            </div>
            <form onSubmit={handleAddAsset} className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Vault Category</label>
                <select 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({...newAsset, category: e.target.value})}
                >
                  {Object.keys(CATEGORIES).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Value (BDT)</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 text-lg">৳</div>
                  <input 
                    type="number" required placeholder="0.00"
                    className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-black text-lg"
                    value={newAsset.value}
                    onChange={(e) => setNewAsset({...newAsset, value: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Record Date</label>
                <input 
                  type="date" required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  value={newAsset.date}
                  onChange={(e) => setNewAsset({...newAsset, date: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-[1.5rem] transition-all shadow-2xl shadow-slate-200 mt-4 text-sm uppercase tracking-widest">
                Confirm Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Inline Animation Styles */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out; }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}