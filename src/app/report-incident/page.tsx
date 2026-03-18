"use client";
import { useState } from "react";
import Link from "next/link";

type Severity = "low" | "medium" | "high";

export default function ReportIncidentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [severity, setSeverity] = useState<Severity>("low");
  const [formData, setFormData] = useState({ title: "", description: "", location: "" });

  const steps = ["Details", "Location", "Review"];

  function handleNext() {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  }
  function handlePrev() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Incident report submitted successfully. Emergency services have been notified.");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-custom shadow-sm">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Report Incident</h1>
          </div>
          <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Cancel
          </Link>
        </div>
      </header>

      {/* Progress Stepper */}
      <nav className="max-w-3xl mx-auto w-full px-4 pt-6 pb-2">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-1 transition-colors ${
                    idx <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {idx < currentStep ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className={`text-[10px] font-semibold uppercase ${idx <= currentStep ? "text-primary" : "text-gray-400"}`}>{step}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-4 mb-4">
                  <div className={`h-full bg-primary transition-all duration-300 ${idx < currentStep ? "w-full" : "w-0"}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Form */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Details */}
          {currentStep === 0 && (
            <section className="bg-white p-6 border border-gray-200 rounded-custom shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="incident-title">
                  Incident Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="incident-title"
                  type="text"
                  required
                  placeholder="Briefly describe the emergency"
                  value={formData.title}
                  onChange={(e) => setFormData((d) => ({ ...d, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-custom px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="incident-description">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="incident-description"
                  rows={4}
                  required
                  placeholder="Provide key details for emergency responders..."
                  value={formData.description}
                  onChange={(e) => setFormData((d) => ({ ...d, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-custom px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <span className="block text-sm font-semibold text-gray-700">
                  Severity Level <span className="text-red-500">*</span>
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {(["low", "medium", "high"] as Severity[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSeverity(level)}
                      className={`flex flex-col items-center justify-center p-3 border-2 rounded-custom cursor-pointer transition-all ${
                        severity === level ? "border-primary bg-blue-50" : "border-gray-200 hover:border-blue-200"
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-500 mb-1 uppercase">{level}</span>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          level === "low" ? "bg-green-500" : level === "medium" ? "bg-yellow-500" : "bg-red-600 animate-pulse"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Location */}
          {currentStep === 1 && (
            <section className="bg-white p-6 border border-gray-200 rounded-custom shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="location-input">
                  Location Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="location-input"
                    type="text"
                    placeholder="Street, City, or Landmark"
                    value={formData.location}
                    onChange={(e) => setFormData((d) => ({ ...d, location: e.target.value }))}
                    className="w-full pl-10 border border-gray-300 rounded-custom px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <button type="button" className="text-xs font-medium text-primary hover:underline flex items-center mt-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  Use My Current Location
                </button>
              </div>
              <div className="space-y-2">
                <span className="block text-sm font-semibold text-gray-700">Map Picker</span>
                <div className="w-full h-64 bg-gray-100 rounded-custom border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="bg-white p-2 rounded-full shadow-lg inline-block mb-2">
                      <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Tap to Pin Location</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Review */}
          {currentStep === 2 && (
            <section className="bg-white p-6 border border-gray-200 rounded-custom shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Upload Photos (Optional)</label>
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-custom cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                    <p className="text-sm text-gray-500">Tap to upload or take a photo</p>
                  </div>
                  <input id="file-upload" type="file" accept="image/*" multiple className="hidden" />
                </label>
              </div>

              {/* Review Summary */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-custom border border-gray-200">
                <h4 className="font-semibold text-gray-700 text-sm">Review Your Report</h4>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-500">Title:</span> <span className="font-medium">{formData.title || "—"}</span></p>
                  <p><span className="text-gray-500">Location:</span> <span className="font-medium">{formData.location || "—"}</span></p>
                  <p><span className="text-gray-500">Severity:</span> <span className={`font-bold capitalize ${severity === "high" ? "text-red-600" : severity === "medium" ? "text-amber-600" : "text-green-600"}`}>{severity}</span></p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-custom">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Final Confirmation</h3>
                    <p className="mt-2 text-sm text-blue-700">By submitting, you confirm this information is accurate. False reporting may be subject to investigation.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Navigation Buttons */}
          <footer className="flex items-center space-x-4 py-4">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-custom font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 px-4 bg-primary text-white rounded-custom font-bold shadow-lg hover:bg-opacity-90 active:scale-95 transition-all"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-custom font-bold shadow-lg hover:bg-red-700 active:scale-95 transition-all"
              >
                SUBMIT INCIDENT
              </button>
            )}
          </footer>
        </form>
      </main>
    </div>
  );
}
