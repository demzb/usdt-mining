import React, { useState } from 'react';
import { User, Lock, ArrowRight, Wallet, Loader2, Sparkles, CheckCircle, ArrowLeft, Mail } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (username: string) => void;
}

type AuthMode = 'signin' | 'signup' | 'forgot';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        if (!username.trim() || !password.trim()) throw new Error('Please fill in all fields');
        
        // Check confirm password for signup and forgot modes
        if (mode !== 'signin') {
            if (!confirmPassword.trim()) throw new Error('Please confirm your password');
            if (password !== confirmPassword) throw new Error('Passwords do not match');
        }

        if (mode !== 'forgot') {
             if (username.length < 3) throw new Error('Username must be at least 3 characters');
        }
        
        if (password.length < 4) throw new Error('Password must be at least 4 characters');

        // Get existing users from local storage
        const users = JSON.parse(localStorage.getItem('mining_app_users') || '{}');

        if (mode === 'signin') {
            // Login Logic
            if (users[username] && users[username].password === password) {
                onLogin(username);
            } else {
                throw new Error('Invalid username or password');
            }
        } else if (mode === 'signup') {
            // Signup Logic
            if (users[username]) {
                throw new Error('Username already taken');
            }
            // Save new user
            users[username] = { password, joinedAt: new Date().toISOString() };
            localStorage.setItem('mining_app_users', JSON.stringify(users));
            onLogin(username);
        } else if (mode === 'forgot') {
            // Forgot Password Logic (Simulated Reset)
            if (!users[username]) {
                throw new Error('User not found');
            }
            // Update password
            users[username].password = password;
            localStorage.setItem('mining_app_users', JSON.stringify(users));
            
            setSuccessMsg('Password reset successfully! Redirecting...');
            setTimeout(() => {
                setMode('signin');
                setPassword('');
                setConfirmPassword('');
                setSuccessMsg('');
            }, 1500);
        }
    } catch (err: any) {
        setError(err.message);
        setLoading(false);
    }
  };

  const handleModeSwitch = (newMode: AuthMode) => {
      setMode(newMode);
      setError('');
      setSuccessMsg('');
      setPassword('');
      setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Mining</h1>
          <p className="text-slate-400">Secure Cloud Mining Platform</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                {mode === 'signin' && 'Welcome Back'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
             </h2>
             {loading && <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase mb-2">
                  {mode === 'forgot' ? 'New Password' : 'Password'}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {(mode === 'signup' || mode === 'forgot') && (
              <div className="animate-in slide-in-from-top-2 fade-in">
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {mode === 'signin' && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => handleModeSwitch('forgot')}
                        className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        Forgot Password?
                    </button>
                </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></span>
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !!successMsg}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-primary-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Reset Password'}
                  {mode !== 'forgot' && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>

            {mode === 'forgot' && (
                <button
                    type="button"
                    onClick={() => handleModeSwitch('signin')}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-4 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                </button>
            )}
          </form>

          {mode !== 'forgot' && (
            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                <p className="text-slate-400 text-sm">
                {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                <button
                    onClick={() => handleModeSwitch(mode === 'signin' ? 'signup' : 'signin')}
                    className="ml-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
                </p>
            </div>
          )}

          <div className="mt-4 text-center">
            <a href="mailto:supportcryptomining@gmail.com" className="text-xs text-slate-500 hover:text-slate-400 transition-colors flex items-center justify-center gap-1">
                <Mail className="w-3 h-3" /> Need help? Contact support
            </a>
          </div>
        </div>
        
        {/* Feature highlights */}
        {mode === 'signup' && (
            <div className="mt-8 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-center">
                    <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-300 font-medium">Bonus Hashrate</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-center">
                    <Lock className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-300 font-medium">Secure Wallet</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};