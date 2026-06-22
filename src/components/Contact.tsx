/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  Sparkles, 
  ChevronRight, 
  MapPin,
  Globe
} from 'lucide-react';

export default function Contact() {
  const [selectedDay, setSelectedDay] = useState<string>('Tuesday, June 23');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingEmail, setBookingEmail] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const availableDays = [
    { key: 'tua', label: 'Tuesday, June 23', slots: ['09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM'] },
    { key: 'wed', label: 'Wednesday, June 24', slots: ['10:00 AM', '11:30 AM', '03:00 PM', '05:30 PM'] },
    { key: 'thu', label: 'Thursday, June 25', slots: ['09:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'] },
  ];

  const activeDay = availableDays.find(d => d.label === selectedDay);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !selectedTime) return;
    setBookingConfirmed(true);
  };

  return (
    <section id="brief" className="bg-[#050505] py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-4">
            <CalendarIcon className="w-3 h-3 text-[#d4af37]" />
            <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.2em]">Priority Booking</span>
          </div>
          <h2 className="font-display text-3xl sm:text-6xl text-white font-light leading-tight">
            Secure your <span className="font-serif italic text-[#d4af37]">Onboarding Session.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Select a dedicated slot for a 45-minute clinical consultation to analyze the strategic architecture of your venture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Studio Identity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="h-full p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl text-white font-medium uppercase tracking-wider mb-6">
                  Venture Atelier <span className="text-[#d4af37]">HQ</span>
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light mb-10">
                  Operating as a hybrid studio between Paris (Place Vendôme) and Geneva. Consultations are strictly by invitation or successful diagnostic.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-600 font-mono tracking-wider block">INQUIRIES</span>
                      <a href="mailto:hello@ventureatelier.com" className="text-sm text-zinc-200 hover:text-[#d4af37] transition-colors">
                        hello@ventureatelier.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37]">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-600 font-mono tracking-wider block">GLOBAL LINE</span>
                      <span className="text-sm text-zinc-200 font-mono">
                        +33 1 72 38 49 00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-2">Verified Impact</div>
                <div className="text-2xl font-display font-medium text-white tracking-tight">
                  1,000+ <span className="text-[#d4af37] font-serif italic text-lg">Ventures Fueled</span>
                </div>
                <p className="text-xs text-[#d4af37]/60 italic mt-3">"Turning vision into market authority."</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Scheduler */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            {!bookingConfirmed ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="mb-10 text-left">
                  <h3 className="text-xl sm:text-2xl text-white font-medium mb-2 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                    Live Session Scheduler
                  </h3>
                  <p className="text-zinc-500 text-sm">Choose your preferred window for a deep-dive strategy session.</p>
                </div>

                {/* Day selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {availableDays.map((day) => (
                    <button
                      key={day.key}
                      onClick={() => { setSelectedDay(day.label); setSelectedTime(''); }}
                      className={`group p-4 rounded-2xl border transition-all duration-300 text-left ${
                        selectedDay === day.label
                          ? 'border-[#d4af37] bg-[#d4af37]/10'
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <span className={`text-xs block font-bold font-mono uppercase ${selectedDay === day.label ? 'text-[#d4af37]' : 'text-zinc-500'}`}>
                        {day.label.split(',')[0]}
                      </span>
                      <span className="text-sm block text-zinc-200 mt-1">{day.label.split(',')[1]}</span>
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="mb-10">
                  <span className="block text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-4">
                    Available Windows ({selectedDay})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeDay?.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 rounded-xl border text-xs font-mono transition-all duration-300 ${
                          selectedTime === slot
                            ? 'border-[#d4af37] bg-[#d4af37] text-black font-bold'
                            : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleConfirmBooking} className="pt-8 border-t border-white/5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Full Name</label>
                      <input required type="text" value={bookingName} onChange={e => setBookingName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-zinc-800" placeholder="Alexander Knight" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Direct Email</label>
                      <input required type="email" value={bookingEmail} onChange={e => setBookingEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-zinc-800" placeholder="alex@venture.com" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedTime}
                    className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#d4af37] transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-xl"
                  >
                    Confirm Strategic Call <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Success State - "Consultation Pass" */
              <div className="animate-in fade-in zoom-in-95 duration-1000 text-center py-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-2xl shadow-green-500/10">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                
                <h3 className="text-3xl text-white font-display mb-2">Slot Secured.</h3>
                <p className="text-zinc-500 max-w-sm mx-auto mb-10 text-sm font-light leading-relaxed">
                  Excellent, <span className="text-white">{bookingName}</span>. Your onboarding consultation has been synchronized with our associates.
                </p>

                <div className="max-w-md mx-auto relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                  <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-left font-mono overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <CalendarIcon className="w-12 h-12 text-[#d4af37]" />
                    </div>
                    
                    <div className="text-[9px] text-[#d4af37] tracking-[0.2em] mb-6 font-bold uppercase">Consultation Boarding Pass</div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-white">
                        <CalendarIcon className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-lg font-sans font-bold tracking-tight">{selectedDay}</span>
                      </div>
                      <div className="flex items-center gap-4 text-zinc-400">
                        <Clock className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-base">{selectedTime} (GMT+2)</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                      <div>
                        <div className="text-[8px] text-zinc-600 mb-1 uppercase tracking-widest">Digital Venue</div>
                        <div className="text-[10px] text-zinc-200">Secure Google Meet</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-zinc-600 mb-1 uppercase tracking-widest">Invitee</div>
                        <div className="text-[10px] text-zinc-200">{bookingEmail}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="mt-10 text-xs font-mono text-[#d4af37] hover:text-white transition-colors uppercase tracking-widest"
                >
                  Modify or reschedule session
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}