import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Briefcase, GraduationCap, ChevronRight, Sparkles } from 'lucide-react';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSuccess = async (credentialResponse) => {
    const success = await login(credentialResponse.credential);
    if (success) {
      navigate('/');
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white text-slate-800 flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Left side: Hero/Info Section */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center p-8 lg:p-16 overflow-hidden">
        
        <div className="relative z-10 w-full max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-sm font-bold shadow-sm shadow-blue-100 mb-8 uppercase tracking-widest not-italic">
            <Sparkles className="w-4 h-4" />
            Candidate Profile
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-blue-200 shrink-0">
              <img src="/profile.jpg" alt="Tharaneesh M" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-600 not-italic leading-tight">
              Tharaneesh M
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-slate-600 mb-12 font-medium leading-relaxed">
            Final Year Student & Aspiring Graduate Support Engineer. Dedicated to solving complex problems and delivering exceptional customer success.
          </p>

          <div className="space-y-6">
            <div className="card-modern !p-5 flex items-start gap-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50 cursor-default">
              <div className="p-4 rounded-2xl bg-blue-100 text-blue-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 not-italic">Academic Excellence</h3>
                <p className="text-slate-500 font-medium mt-1">Strong foundation in software engineering, algorithms, and full-stack web development.</p>
              </div>
            </div>

            <div className="card-modern !p-5 flex items-start gap-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100/50 cursor-default">
              <div className="p-4 rounded-2xl bg-sky-100 text-sky-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 not-italic">Support Engineering Ready</h3>
                <p className="text-slate-500 font-medium mt-1">Bridging the gap between engineering teams and end-users with clear communication.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
         {/* Large abstract blobs */}
         <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-200 to-sky-200 blur-[100px] pointer-events-none opacity-60"></div>
         <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-slate-200 blur-[100px] pointer-events-none opacity-60"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="card-modern !p-10 !rounded-[3rem] text-center backdrop-blur-2xl bg-white/60">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-600 to-sky-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-blue-200 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-black text-slate-900 mb-3 not-italic">Welcome Back</h2>
            <p className="text-slate-500 font-medium text-lg mb-10">Sign in to access your assessment portal.</p>

            <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-300">
              <div className="shadow-lg rounded-full overflow-hidden shadow-blue-200/50">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  shape="pill"
                  size="large"
                  theme="filled_black"
                  text="continue_with"
                  useOneTap
                />
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t-2 border-slate-100 border-dashed">
               <button className="btn-secondary w-full !bg-transparent !border-none !shadow-none hover:!bg-blue-50 text-sm">
                 Graduate Support Engineer Assessment <ChevronRight className="w-4 h-4 ml-1" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
