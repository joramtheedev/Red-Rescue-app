"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const incidents = [
  {
    id: "#INC-9823",
    type: "Structure Fire",
    title: "Industrial Park, Building B",
    desc: "Confirmed multi-story fire. Multiple personnel trapped. Units 4, 7, and 9 dispatched.",
    severity: "high" as const,
    badge: "Urgent",
    badgeColor: "bg-red-100 text-red-600",
    borderColor: "border-severity-high",
    time: "4 mins ago",
    units: ["E-4", "T-7"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwQ3if5iLWA7c_xHDEP_eruqYsF10FileRs4P6k7sjYUAGJi8S_fh9F6BxROmcGNUuvebeoLZPLe7Zn_qek1phiCB2eNFZp-81yrXhAVW9Gz9OiOzpKHqM9yDMfAR93_pDtX4aXme9BaM2j3gm3HnKWxEy2OXNl6kkjXjzPh8enBWn2LOVv3y7iSQ0EM7dmMR3vvM-3Y-08vQ73wsx_O99mhVUHuM-l1NRK5woZsuZ5xJ_ctAL_2XCjwqbg_tk0li_3MMKA0QCRFo",
  },
  {
    id: "#INC-9822",
    type: "Flash Flood",
    title: "Oak Street Underpass",
    desc: "Water level rising above road level. Traffic blocked. Police on site for rerouting.",
    severity: "medium" as const,
    badge: "Warning",
    badgeColor: "bg-amber-100 text-amber-600",
    borderColor: "border-severity-medium",
    time: "18 mins ago",
    units: ["P-12"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz05Cc8xeDhVhN1gAMdY7wmw7uVHpBVplWQudwvkcGxknRA7lLc7WQPr5yyAvL1gIgN7bPiAjVEd8XG4P3WZCru3S9MKTCY7CCeZN5uIn04vkFkB43-8CuMXGT56S0XczzY72s5vdPRL3umzxOkik9PL78YLsFwrv02p3Lb8f-4fNk_bF1qJuFkEmqDPzyYtp5ffFIP1sOIeL05qJK7wxr5fY79uxSspxPme828-ZtDYED4DLYO_B36q8d7ohGJjH1ieqdNs7Zqbs",
  },
  {
    id: "#INC-9819",
    type: "Power Outage",
    title: "Greenwood Residential Area",
    desc: "Local grid failure affecting 150 homes. Grid maintenance team ETA 30 mins.",
    severity: "low" as const,
    badge: "Stable",
    badgeColor: "bg-green-100 text-green-600",
    borderColor: "border-severity-low",
    time: "45 mins ago",
    units: [],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ecRJrtOgMv56LbeHp5XNRwo_-mHZ3EPJxa7DJzO8wQ8NM7fUngxO7P5c1P3hsvwP1Vo13VKxFlhuSj8q_4XRqp9QV7ZELqMelbnqtGde1Z_LiebdmHVvNb0MiGQy6jfy0F1MzWT-MvNaIh3B2soNnkvpKp8pOl_8amxwDqlfDAG7i-mICTasuqsZJcKrKdNfDDJnxArYrtt0eUSTcRvbIBxAb4DprL1KvCxW860hqVRVqpNO_kcM0dOs51NZ09pFQ0ceVAQaA3U",
  },
];

export default function ResponderDashboard() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setClock(now.toISOString().split("T")[1].split(".")[0]);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-custom flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">RESQ-CORE</span>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {[
            { href: "/responder-dashboard", label: "Dashboard", active: true, icon: <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /> },
            { href: "#", label: "Active Incidents", active: false, icon: <><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></> },
            { href: "#", label: "Reports", active: false, icon: <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /> },
            { href: "#", label: "Responders", active: false, icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /> },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-custom font-medium transition-colors ${link.active ? "bg-white/10" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{link.icon}</svg>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 bg-black/20 rounded-custom">
            <div className="w-8 h-8 rounded-full bg-slate-400 flex-shrink-0" />
            <div className="truncate">
              <p className="text-sm font-semibold">Chief Miller</p>
              <p className="text-xs text-white/60 uppercase tracking-widest">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">Operational Dashboard</h1>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> SYSTEM LIVE
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="text-slate-400 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">3</span>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Current Time (UTC)</p>
              <p className="text-sm font-mono font-bold text-slate-700">{clock}</p>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50">
          {/* Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-custom border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Total Incidents</p>
                <h3 className="text-3xl font-extrabold text-slate-800">142</h3>
                <p className="text-xs text-slate-400 mt-2"><span className="text-green-500 font-bold">↓ 12%</span> from last 24h</p>
              </div>
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-custom flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-custom border border-slate-200 shadow-sm flex items-center justify-between ring-2 ring-red-500 ring-offset-2">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">High Priority Cases</p>
                <h3 className="text-3xl font-extrabold text-red-500">12</h3>
                <p className="text-xs text-red-500 mt-2 font-bold animate-pulse">Critical action required</p>
              </div>
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-custom flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-custom border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Active Responders</p>
                <h3 className="text-3xl font-extrabold text-slate-800">48</h3>
                <p className="text-xs text-slate-400 mt-2"><span className="text-blue-500 font-bold">88%</span> utility rate</p>
              </div>
              <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-custom flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Incidents Feed */}
            <section className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Recent Incidents Feed</h2>
                <button className="text-sm font-semibold text-primary hover:underline">View All Records</button>
              </div>
              {incidents.map((inc) => (
                <Link key={inc.id} href="/incident-details">
                  <div className={`bg-white rounded-custom border-l-4 ${inc.borderColor} shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow cursor-pointer`}>
                    <div className="w-full sm:w-48 h-32 bg-slate-200 relative shrink-0">
                      <Image src={inc.img} alt="Incident" fill className="object-cover" />
                      {inc.severity === "high" && (
                        <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className={`text-[10px] font-bold tracking-widest uppercase ${inc.severity === "high" ? "text-red-500" : inc.severity === "medium" ? "text-amber-500" : "text-green-500"}`}>
                            {inc.id} • {inc.type}
                          </span>
                          <h4 className="text-lg font-bold text-slate-800 leading-tight mt-1">{inc.title}</h4>
                        </div>
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${inc.badgeColor}`}>{inc.badge}</span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{inc.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">Reported {inc.time}</span>
                        {inc.units.length > 0 ? (
                          <div className="flex -space-x-2">
                            {inc.units.map((u) => (
                              <div key={u} className="w-6 h-6 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[8px] text-white">{u}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-300" />
                            <span className="text-xs text-slate-500 italic">No field units required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </section>

            {/* Sidebar Data */}
            <section className="space-y-8">
              <div className="bg-white p-6 rounded-custom border border-slate-200 shadow-sm">
                <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  Fleet Overview
                </h3>
                <div className="space-y-4">
                  {[{ color: "bg-green-500", label: "Available", value: "24 Units" }, { color: "bg-red-500", label: "On-Site", value: "18 Units" }, { color: "bg-amber-500", label: "En Route", value: "6 Units" }].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-custom">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 ${item.color} rounded-full`} />
                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary text-white p-6 rounded-custom shadow-lg">
                <h3 className="text-[10px] font-bold mb-4 opacity-80 uppercase tracking-widest">District Risk Heatmap</h3>
                <div className="space-y-4">
                  {[{ label: "Central Hub", level: "LOW", pct: "25%", color: "bg-green-400" }, { label: "Riverside District", level: "CRITICAL", pct: "90%", color: "bg-red-500" }, { label: "Industrial Zone", level: "MEDIUM", pct: "55%", color: "bg-amber-400" }].map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{d.label}</span>
                        <span className="font-bold">{d.level}</span>
                      </div>
                      <div className="w-full bg-white/20 h-1.5 rounded-full">
                        <div className={`${d.color} h-1.5 rounded-full`} style={{ width: d.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full py-2 bg-white text-primary text-xs font-bold rounded-custom hover:bg-slate-100 transition-colors">
                  GENERATE EVAC PLAN
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
