import React from 'react';
import axios from 'axios';
import { Trash2, Clock, CircleDot, CheckCircle2, ChevronDown } from 'lucide-react';

const TaskItem = ({ task, refreshTasks }) => {
  
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
          text: 'text-slate-700',
          icon: <CircleDot className="w-4 h-4 mr-2 text-slate-500" />
        };
      case 'In Progress':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          icon: <Clock className="w-4 h-4 mr-2 text-amber-500" />
        };
      case 'Complete':
        return {
          bg: 'bg-emerald-100',
          text: 'text-emerald-800',
          icon: <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
        };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: null };
    }
  };

  const statusStyle = getStatusStyles(task.status);
  
  const dateObj = new Date(task.createdAt);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="card-modern group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className={`text-xl font-bold not-italic ${task.status === 'Complete' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
              {task.title}
            </h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.icon}
              {task.status}
            </span>
          </div>
          
          {task.description && (
            <p className="text-slate-600 leading-relaxed mb-4 text-base">
              {task.description}
            </p>
          )}
          
          <div className="text-sm text-slate-400 font-medium">
            Created on {formattedDate}
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-6 shrink-0">
          <div className="relative">
            <select 
              value={task.status} 
              onChange={handleStatusChange}
              className="appearance-none bg-white border-2 border-slate-200 text-slate-800 font-bold rounded-full px-5 py-2.5 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <ChevronDown className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
          
          <button onClick={handleDelete} className="btn-danger !px-4 !py-2 !text-sm">
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Delete</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TaskItem;
