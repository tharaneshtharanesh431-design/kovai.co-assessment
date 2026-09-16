import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import { LogOut, LayoutDashboard, Plus, ListTodo, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-sky-50 font-sans pb-20">
      {/* Premium Navbar */}
      <nav className="sticky top-4 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="card-modern !rounded-full !py-3 flex justify-between items-center bg-white/70 backdrop-blur-xl border border-blue-100/50">
          <div className="flex items-center gap-3 pl-2">
            <div className="bg-gradient-to-br from-blue-600 to-sky-500 p-2.5 rounded-full shadow-lg shadow-blue-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-slate-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-sky-600 not-italic">
              TaskOrbit
            </span>
          </div>
          
          <div className="flex items-center gap-4 pr-2">
            <div className="flex items-center gap-3 bg-slate-50 py-1.5 px-4 rounded-full border border-slate-100 hidden sm:flex">
              <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-sky-100 flex items-center justify-center overflow-hidden shadow-sm">
                {user?.picture ? (
                  <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-blue-700 font-bold text-sm">{user?.name?.charAt(0)}</span>
                )}
              </div>
            </div>
            <button onClick={logout} className="btn-secondary !px-4 !py-2 !text-sm">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight not-italic mb-2">My Tasks</h1>
            <p className="text-slate-500 text-lg">Keep track of your assessment goals.</p>
          </div>
          <button onClick={() => setIsAdding(!isAdding)} className="btn-primary">
            <Plus className={`w-5 h-5 transition-transform duration-300 ${isAdding ? 'rotate-45' : ''}`} />
            {isAdding ? 'Close Form' : 'New Task'}
          </button>
        </div>

        {/* Animated Add Task Form */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isAdding ? 'max-h-[500px] opacity-100 mb-10' : 'max-h-0 opacity-0 mb-0'}`}>
          <div className="card-modern relative overflow-hidden">
             {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 not-italic relative z-10">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><ListTodo className="w-5 h-5" /></div>
              Create a New Task
            </h2>
            
            <form onSubmit={handleCreateTask} className="space-y-5 relative z-10">
              <div>
                <input 
                  id="title"
                  type="text" 
                  placeholder="Task Title (e.g., Complete API Integration)"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="input-modern text-lg"
                  required
                />
              </div>
              <div>
                <textarea 
                  id="desc"
                  placeholder="Add some details about this task... (Optional)"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="input-modern resize-none h-28"
                />
              </div>
              <div className="flex justify-end pt-2 gap-3">
                <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={!newTaskTitle.trim()} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-6">
          {tasks.length === 0 ? (
            <div className="card-modern text-center py-20 bg-white/50 border-dashed border-2">
              <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <ListTodo className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2 not-italic">No tasks yet</h3>
              <p className="text-slate-500 max-w-sm mx-auto text-lg mb-8">Ready to get started? Create your first task to begin tracking your progress.</p>
              <button onClick={() => setIsAdding(true)} className="btn-primary mx-auto">
                Create First Task
              </button>
            </div>
          ) : (
            tasks.map(task => (
              <TaskItem key={task._id} task={task} refreshTasks={fetchTasks} />
            ))
          )}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
