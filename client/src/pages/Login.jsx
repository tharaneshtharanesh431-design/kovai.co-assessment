import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Briefcase, GraduationCap, Sparkles, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row overflow-hidden font-sans relative">
      {/* Background Animated Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300/30 rounded-full animate-pulse-glow mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-300/20 rounded-full animate-pulse-glow mix-blend-multiply pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Left side: Hero/Info Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 relative flex items-center justify-center p-8 lg:p-16 z-10"
      >
        <div className="w-full max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm"
          >
            <MonitorPlay className="w-4 h-4" />
            Live Candidate Stream
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600 animate-gradient-x leading-tight"
          >
            Tharaneesh M
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(37,99,235,0.15)] shrink-0 relative">
              <img src="/profile.jpg" alt="Tharaneesh M" className="w-full h-full object-cover relative z-0" />
            </div>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-sm">
              Final Year Student & Aspiring Graduate Support Engineer.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: GraduationCap, title: "Academic Excellence", desc: "Strong foundation in software engineering and algorithms.", color: "text-blue-600", bg: "bg-blue-100" },
              { icon: Briefcase, title: "Support Ready", desc: "Bridging the gap between engineering and end-users.", color: "text-cyan-600", bg: "bg-cyan-100" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="glass-card !p-5 flex items-start gap-5 hover:bg-white/90 transition-colors cursor-default border border-slate-200"
              >
                <div className={`p-4 rounded-2xl ${item.bg} ${item.color} shadow-inner`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 font-medium mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right side: Login Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10"
      >
        <div className="w-full max-w-md animate-float">
          <div className="glass-card !p-10 text-center border border-white bg-white/80">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 animate-gradient-x"></div>
            
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.8 }}
              className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_15px_30px_rgba(37,99,235,0.2)]"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-4xl font-black text-slate-900 mb-3">Welcome Back</h2>
            <p className="text-slate-500 font-medium text-lg mb-10">Sign in to access your live workspace.</p>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center mb-8"
            >
              <div className="shadow-[0_8px_20px_rgba(0,0,0,0.06)] rounded-full overflow-hidden p-1 bg-white border border-slate-100">
                <GoogleLogin
                  onSuccess={(res) => login(res.credential)}
                  onError={() => console.log('Login Failed')}
                  shape="pill"
                  size="large"
                  theme="outline"
                  text="continue_with"
                />
              </div>
            </motion.div>
            
            <div className="mt-8 pt-8 border-t border-slate-200">
               <p className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                 Assessment Portal Live
               </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
