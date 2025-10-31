'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  Settings,
  Search,
  Bell,
  TrendingUp,
  Eye,
  Clock,
  Edit,
  Upload,
  MessageSquare,
  FileEdit,
  Sparkles,
  Command,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  Menu,
  X,
  Layers,
} from 'lucide-react';
import { generateMockMetrics, generateActivityFeed, generateRecentContent, generatePerformanceData, Metrics, ActivityItem, ContentItem, PerformanceData } from '@/lib/mock-data';
import Link from 'next/link';

type TrendType = 'up' | 'down' | 'stable';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [performance, setPerformance] = useState<PerformanceData | null>(null);

  useEffect(() => {
    // Simulate data loading with animation
    setTimeout(() => {
      setMetrics(generateMockMetrics());
      setActivity(generateActivityFeed());
      setContent(generateRecentContent());
      setPerformance(generatePerformanceData());
    }, 300);

    // Listen for Command+K
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, href: '/' },
    { icon: Layers, label: 'Builder', href: '/admin/builder' },
    { icon: FileText, label: 'Content', badge: '34' },
    { icon: ImageIcon, label: 'Media', badge: '1.3k' },
    { icon: Users, label: 'Team' },
    { icon: Settings, label: 'Settings' },
  ];

  const getActivityIcon = (type: ActivityItem['type']): JSX.Element => {
    switch (type) {
      case 'publish': return <TrendingUp className="w-4 h-4" />;
      case 'edit': return <Edit className="w-4 h-4" />;
      case 'upload': return <Upload className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
      case 'draft': return <FileEdit className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'draft': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getTrendIcon = (trend: TrendType): JSX.Element => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-3 h-3 text-emerald-500" />;
      case 'down': return <ArrowDown className="w-3 h-3 text-red-500" />;
      default: return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-[280px] glass-panel border-r z-50"
          >
            <div className="flex flex-col h-full p-6">
              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h1 className="text-2xl font-display font-bold text-gradient">Artisan CMS</h1>
                <p className="text-xs text-muted-foreground mt-1">Crafted with precision</p>
              </motion.div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                {navItems.map((item, index) => {
                  const NavWrapper = item.href ? Link : 'div';
                  return (
                    <NavWrapper key={item.label} href={item.href || '#'}>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                          item.active 
                            ? 'bg-primary/10 text-primary border border-primary/20 glow-effect' 
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="font-medium flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            {item.badge}
                          </span>
                        )}
                      </motion.button>
                    </NavWrapper>
                  );
                })}
              </nav>

              {/* User Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-6 border-t border-border"
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center font-display font-bold text-sm">
                    DV
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Da Vinci</p>
                    <p className="text-xs text-muted-foreground">Master Creator</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
        {/* Header */}
        <header className="glass-panel border-b sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search or press Cmd+K"
                  onClick={() => setCommandOpen(true)}
                  className="pl-10 pr-24 py-2 w-[400px] bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center gap-2 glow-effect"
              >
                <Sparkles className="w-4 h-4" />
                AI Assistant
              </motion.button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-display font-bold mb-2">Welcome back, Da Vinci</h2>
            <p className="text-muted-foreground text-lg">Here's what's happening with your content today.</p>
          </motion.div>

          {/* Metrics Grid */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Posts', value: metrics.totalPosts, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Total Pages', value: metrics.totalPages, icon: LayoutDashboard, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { label: 'Media Files', value: metrics.totalMedia.toLocaleString(), icon: ImageIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'Team Members', value: metrics.totalUsers, icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-panel p-6 rounded-xl depth-shadow hover:glow-effect transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${metric.bg} rounded-lg group-hover:scale-110 transition-transform`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-display font-bold mb-1">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Secondary Metrics */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Published Today', value: metrics.publishedToday, sublabel: '+12 from yesterday', trend: 'up' as TrendType },
                { label: 'Views This Month', value: metrics.viewsThisMonth.toLocaleString(), sublabel: `${metrics.engagementRate}% engagement`, trend: 'up' as TrendType },
                { label: 'Avg. Read Time', value: metrics.averageReadTime, sublabel: 'Across all content', trend: 'stable' as TrendType },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-panel p-6 rounded-xl border"
                >
                  <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                  <p className="text-2xl font-display font-bold mb-1">{metric.value}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {getTrendIcon(metric.trend)}
                    <span>{metric.sublabel}</span>
                  </div>
                </motion.div>
              ))} 
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="glass-panel p-6 rounded-xl border h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-semibold">Recent Activity</h3>
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {activity.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{item.user}</span>
                          {' '}<span className="text-muted-foreground">{item.action}</span>
                        </p>
                        <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                          {item.target}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {getActivityIcon(item.type)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="glass-panel p-6 rounded-xl border h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-semibold">Recent Content</h3>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {content.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer group border border-transparent hover:border-border"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-warm flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.author}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{item.views.toLocaleString()}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {commandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-[20vh]"
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl glass-panel rounded-xl border glow-effect overflow-hidden"
            >
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search content, pages, media..."
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-lg"
                  />
                  <div className="text-xs text-muted-foreground">ESC</div>
                </div>
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto">
                <div className="space-y-1">
                  {['Quick Actions', 'Recent Content', 'Suggested'].map((section) => (
                    <div key={section}>
                      <p className="px-3 py-2 text-xs text-muted-foreground font-medium">{section}</p>
                      {[1, 2, 3].map((i) => (
                        <button
                          key={i}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="flex-1 text-left">Sample command {i}</span>
                          <span className="text-xs text-muted-foreground">⌘{i}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

