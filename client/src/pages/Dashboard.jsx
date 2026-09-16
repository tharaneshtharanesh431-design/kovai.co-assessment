import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import { LogOut, LayoutDashboard, Plus, ListTodo, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await axios.post('/api/tasks', {
        title: newTaskTitle,
        description: newTaskDesc
      });
      setNewTaskTitle('');
      setNewTaskDesc('');
      setIsAdding(false);
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-300 rounded-full animate-pulse-glow mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-200 rounded-full animate-pulse-glow mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-4 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="glass-card !rounded-full !py-3 flex justify-between items-center px-4 border border-white">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-full shadow-[0_5px_15px_rgba(37,99,235,0.3)]">
              <Activity className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600">
              TaskStream
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/50 py-1.5 px-4 rounded-full border border-blue-100 hidden sm:flex backdrop-blur-md shadow-sm">
              <span className="text-sm font-bold text-slate-700">{user?.name}</span>
              <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                {user?.picture ? (
                  <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-blue-600 font-bold text-sm">{user?.name?.charAt(0)}</span>
                )}
              </div>
            </div>
            <button onClick={logout} className="p-2.5 rounded-full bg-white/80 border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6"
        >
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Live Tasks</h1>
            <p className="text-slate-500 text-lg font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Syncing to cloud
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(!isAdding)} 
            className="btn-primary flex items-center gap-2"
          >
            <Plus className={`w-5 h-5 transition-transform duration-300 ${isAdding ? 'rotate-45' : ''}`} />
            {isAdding ? 'Close Stream' : 'New Task'}
          </motion.button>
        </motion.div>

        {/* Animated Add Task Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-10"
            >
              <div className="glass-card relative border border-white bg-white/90">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 animate-gradient-x"></div>
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-xl shadow-inner">
                    <ListTodo className="w-5 h-5" />
                  </div>
                  Broadcast New Task
                </h2>
                
                <form onSubmit={handleCreateTask} className="space-y-5">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Enter task title..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none px-5 py-4 rounded-2xl transition-all font-medium text-slate-900 placeholder:text-slate-400 text-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Add descriptions or logs... (Optional)"
                      value={newTaskDesc}
                      onChange={(e) => setNewTaskDesc(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none px-5 py-4 rounded-2xl transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none h-32 shadow-sm"
                    />
                  </div>
                  <div className="flex justify-end pt-2 gap-3">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={!newTaskTitle.trim()} className="btn-primary disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-md">
                      Broadcast Task
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        <motion.div layout className="space-y-6">
          <AnimatePresence>
            {tasks.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card text-center py-24 border-dashed border-2 border-blue-200 bg-white/50"
              >
                <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Activity className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tighter">Stream is empty</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-lg mb-8">Go live by creating your first task and track your progress.</p>
                <button onClick={() => setIsAdding(true)} className="btn-primary mx-auto">
                  Start Streaming
                </button>
              </motion.div>
            ) : (
              tasks.map((task, i) => (
                <TaskItem key={task._id} task={task} refreshTasks={fetchTasks} index={i} />
              ))
            )}
          </AnimatePresence>
        </motion.div>

      </main>
    </div>
  );
};

export default Dashboard;
