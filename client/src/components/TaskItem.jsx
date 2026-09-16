import React from 'react';
import axios from 'axios';
import { Trash2, Clock, CircleDot, CheckCircle2, ChevronDown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskItem = ({ task, refreshTasks, index }) => {
  
  const handleStatusChange = async (e) => {
    try {
      await axios.patch(`/api/tasks/${task._id}`, { status: e.target.value });
      refreshTasks();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      refreshTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Planned':
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-600',
          border: 'border-slate-200',
          shadow: '',
          icon: <CircleDot className="w-4 h-4 mr-2 text-slate-500" />
        };
      case 'In Progress':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.15)]',
          icon: <Zap className="w-4 h-4 mr-2 text-blue-600 animate-pulse" />
        };
      case 'Complete':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.1)]',
          icon: <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
        };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', shadow: '', icon: null };
    }
  };

  const statusStyle = getStatusStyles(task.status);
  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`glass-card group border-l-4 ${task.status === 'In Progress' ? 'border-l-blue-500' : task.status === 'Complete' ? 'border-l-emerald-500' : 'border-l-slate-300'} hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)] bg-white/90 border-r-white border-y-white`}
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h3 className={`text-2xl font-black tracking-tight ${task.status === 'Complete' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
              {task.title}
            </h3>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} ${statusStyle.shadow}`}>
              {statusStyle.icon}
              {task.status}
            </span>
          </div>
          
          {task.description && (
            <p className="text-slate-600 leading-relaxed mb-4 text-base font-medium">
              {task.description}
            </p>
          )}
          
          <div className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Logged: {formattedDate}
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-5 pb-5 px-6 md:px-8 md:py-0 shrink-0 bg-slate-50/50">
          <div className="relative group/select">
            <select 
              value={task.status} 
              onChange={handleStatusChange}
              className="appearance-none bg-white border border-slate-200 text-slate-800 font-bold rounded-xl px-5 py-3 pr-12 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-500 group-hover/select:text-blue-600 transition-colors">
              <ChevronDown className="w-5 h-5 stroke-[3]" />
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete} 
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-100 font-bold hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_5px_15px_rgba(239,68,68,0.3)] transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </motion.button>
        </div>
        
      </div>
    </motion.div>
  );
};

export default TaskItem;
