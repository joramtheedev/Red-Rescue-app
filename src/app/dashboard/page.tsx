import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-custom flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Disaster Management System</h1>
          <p className="text-slate-400">Select a portal to continue</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-custom p-6 transition-all">
            <div className="w-10 h-10 bg-primary/20 rounded-custom flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
            <h2 className="text-white font-bold text-lg mb-1">Citizen Dashboard</h2>
            <p className="text-slate-400 text-sm">Report incidents, request help, and track your submissions</p>
          </Link>
          <Link href="/report-incident" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-custom p-6 transition-all">
            <div className="w-10 h-10 bg-red-500/20 rounded-custom flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
              <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
            <h2 className="text-white font-bold text-lg mb-1">Report Incident</h2>
            <p className="text-slate-400 text-sm">Submit a new emergency incident report</p>
          </Link>
          <Link href="/responder-dashboard" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 rounded-custom p-6 transition-all">
            <div className="w-10 h-10 bg-green-500/20 rounded-custom flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
              <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
            <h2 className="text-white font-bold text-lg mb-1">Responder Dashboard</h2>
            <p className="text-slate-400 text-sm">Operational overview for emergency responders</p>
          </Link>
          <Link href="/incident-details" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 rounded-custom p-6 transition-all">
            <div className="w-10 h-10 bg-amber-500/20 rounded-custom flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
              <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
            <h2 className="text-white font-bold text-lg mb-1">Incident Details</h2>
            <p className="text-slate-400 text-sm">Detailed view with comms and activity log</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
