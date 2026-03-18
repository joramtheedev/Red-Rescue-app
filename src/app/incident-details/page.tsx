"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = {
  id: number;
  from: "citizen" | "command";
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  { id: 1, from: "citizen", text: "The fire is spreading to the garage. We are all out of the house.", time: "14:02 PM" },
  { id: 2, from: "command", text: "Copy that, John. Unit Alpha-1 is 2 minutes away. Please stay clear of the structure.", time: "14:03 PM" },
  { id: 3, from: "citizen", text: "Thank you. I see sirens now.", time: "14:05 PM" },
];

export default function IncidentDetailsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
    setMessages((m) => [...m, { id: Date.now(), from: "command", text: input.trim(), time }]);
    setInput("");
  }

  return (
    <div className="min-h-screen text-slate-900">
      {/* Navigation */}
      <nav className="bg-primary text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-custom">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase">RescuNet Portal</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium opacity-90 hidden sm:block">Welcome, Dispatcher Smith</span>
          <Link href="/responder-dashboard" className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-custom text-sm font-semibold">
            ← Back
          </Link>
        </div>
      </nav>

      {/* Incident Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Incident #INC-2023-8942</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">Priority: High</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Residential Structural Fire - North District</h2>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              452 Oak Avenue, Pine Valley, PV 89102
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-custom font-semibold hover:bg-blue-900 transition-all shadow-sm">
              Update Global Status
            </button>
            <button className="border border-slate-300 bg-white px-6 py-3 rounded-custom font-semibold text-slate-700 hover:bg-slate-50 transition-all">
              Generate Report
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Left Column */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Map */}
          <div className="bg-white border border-slate-200 rounded-custom overflow-hidden shadow-sm h-[400px] flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
              <h3 className="font-bold text-slate-700 uppercase text-sm tracking-widest">Real-time Location View</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-xs text-slate-600"><span className="w-3 h-3 bg-red-500 rounded-full" /> Incident</span>
                <span className="flex items-center gap-1 text-xs text-slate-600"><span className="w-3 h-3 bg-blue-500 rounded-full" /> Unit Alpha</span>
              </div>
            </div>
            <div
              className="flex-grow relative"
              style={{
                backgroundImage: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCk1EFP1Ldo9dRP4g_7-Y8R0FjvyvO79WT2DDFfbVqEDElzk6jilmbxf2orcyYgbL98DNp_itY9W3i6dXLc_hDnGG0u3VMdyG6PIQ0QTUwOpSxhqviQMAfjfOrtYnUis4huvpD857UqtG0YKHXu9SBSJqNIIoDlpWjZ6YdVzse9zyuyyMkaebMx6D38QxjwpCsMWRnK8y0X71IN9WnrTUAC9JdNQru83YwKQfRpe_VrcntsLzPzX3j4e879ZKVTfA5HrrbZG8JvJl4)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded-custom shadow-lg border border-slate-200 flex flex-col gap-1">
                <button className="p-1 hover:bg-slate-100 rounded text-sm font-bold">+</button>
                <div className="h-px bg-slate-200" />
                <button className="p-1 hover:bg-slate-100 rounded text-sm font-bold">−</button>
              </div>
            </div>
          </div>

          {/* Responder Units */}
          <div className="bg-white border border-slate-200 rounded-custom shadow-sm p-6">
            <h3 className="font-bold text-slate-700 uppercase text-sm tracking-widest mb-6">Assigned Responder Units</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-400 border-b border-slate-100">
                    <th className="pb-3 font-semibold uppercase">Unit ID</th>
                    <th className="pb-3 font-semibold uppercase">Type</th>
                    <th className="pb-3 font-semibold uppercase">Current Status</th>
                    <th className="pb-3 font-semibold uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { code: "A1", name: "Alpha-1 Fire Engine", type: "Fire/Rescue", status: "On-Scene", statusColor: "bg-green-100 text-green-700", opts: ["En Route", "Staged", "Demobilized"] },
                    { code: "M4", name: "Medic-4 Ambulance", type: "Medical", status: "En Route", statusColor: "bg-blue-100 text-blue-700", opts: ["On-Scene", "Hospital Transp.", "Available"] },
                  ].map((unit) => (
                    <tr key={unit.code}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">{unit.code}</div>
                          <span className="font-medium">{unit.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{unit.type}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${unit.statusColor}`}>{unit.status}</span>
                      </td>
                      <td className="py-4 text-right">
                        <select className="text-xs border border-slate-200 rounded-custom px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary">
                          <option>Change Status</option>
                          {unit.opts.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Right Column */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Chat Panel */}
          <div className="bg-white border border-slate-200 rounded-custom shadow-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-custom">
              <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Incident Communication</h3>
              <p className="text-[10px] text-slate-400 mt-1 uppercase">Direct Channel: Citizen (John Doe) &amp; Command</p>
            </div>
            <div ref={chatRef} className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.from === "command" ? "items-end" : "items-start"}`}>
                  <div className={`p-3 rounded-custom max-w-[85%] text-sm ${msg.from === "command" ? "bg-primary text-white" : "bg-slate-100 text-slate-800"}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 mx-1">
                    {msg.from === "command" ? "Command" : "Citizen"} • {msg.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow border border-slate-200 rounded-custom text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button type="submit" className="bg-primary text-white p-2 rounded-custom hover:bg-blue-900 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white border border-slate-200 rounded-custom shadow-sm p-6">
            <h3 className="font-bold text-slate-700 uppercase text-sm tracking-widest mb-4 border-b border-slate-100 pb-2">Activity Log</h3>
            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {[
                { color: "bg-primary", title: "Incident Reported", desc: "Citizen call via emergency line", time: "13:58" },
                { color: "bg-orange-500", title: "Units Dispatched", desc: "Alpha-1 & Medic-4 assigned", time: "14:00" },
                { color: "bg-green-500", title: "Unit Alpha-1 On-Scene", desc: "First response established", time: "14:06" },
              ].map((log) => (
                <div key={log.time} className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`absolute left-0 w-4 h-4 ${log.color} rounded-full border-4 border-white`} />
                    <div className="ml-8">
                      <p className="text-sm font-semibold text-slate-800">{log.title}</p>
                      <p className="text-xs text-slate-500">{log.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 text-primary text-xs font-bold uppercase hover:underline">View Full Audit Trail</button>
          </div>
        </aside>
      </main>

      <footer className="mt-12 border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
        © 2023 RescuNet Emergency Systems. Restricted Access Only.
      </footer>
    </div>
  );
}
