/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Globe,
  X,
  ShieldCheck
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
    <section id="brief" className="bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-[-10%] w-[50%] h-[50%] rounded-full bg-[#d4af37]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[30%] h-[30%] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-6 animate-fade-in">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.25em]">Priority Boarding</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-white font-extralight leading-tight">
            Secure your <span className="font-serif italic text-[#d4af37]">Onboarding.</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mt-6 font-light leading-relaxed">
            Select a dedicated slot for a private strategic consultation to analyze the architecture of your venture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch max-w-6xl mx-auto">
          
          {/* Left Panel: Studio Identity */}
          <div className="lg:col-span-4 group">
            <div className="h-full p-10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 flex flex-col justify-between transition-all duration-700 hover:border-[#d4af37]/30 hover:bg-white/[0.04]">
              <div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_10px_#d4af37]" />
                    <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
                      Venture Atelier <span className="text-white">HQ</span>
                    </h3>
                </div>
                
                <p className="text-zinc-500 text-sm leading-relaxed font-light mb-12">
                  Operating between Paris and Geneva. Consultations are strictly by invitation or successful diagnostic.
                </p>

                <div className="space-y-10">
                  <div className="group/item">
                    <span className="text-[9px] text-zinc-600 font-mono tracking-[0.4em] block mb-3 uppercase">Inquiries</span>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-[#d4af37]/50 transition-colors">
                          <Mail className="w-4 h-4 text-[#d4af37]" />
                        </div>
                        <a href="mailto:ventureatelier@gmail.com" className="text-sm text-zinc-300 hover:text-white transition-colors font-light">
                            ventureatelier@gmail.com
                        </a>
                    </div>
                  </div>

                  <div className="group/item">
                    <span className="text-[9px] text-zinc-600 font-mono tracking-[0.4em] block mb-3 uppercase">Global Line</span>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-[#d4af37]/50 transition-colors">
                          <Globe className="w-4 h-4 text-[#d4af37]" />
                        </div>
                        <span className="text-sm text-zinc-300 font-mono">
                            +229 47535360
                        </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-8 border-t border-white/5">
                <div className="text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase mb-4">Market Authority</div>
                <div className="text-4xl font-display font-light text-white tracking-tight">
                  1,000<span className="text-[#d4af37]">+</span>
                </div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mt-2">Ventures Propelled</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Scheduler */}
          <div className="lg:col-span-8 relative">
            <div className="h-full p-8 md:p-14 rounded-[2.5rem] bg-white/[0.01] border border-white/10 backdrop-blur-sm overflow-hidden">
              {!bookingConfirmed ? (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <div className="mb-12">
                    <h3 className="text-3xl text-white font-display font-extralight tracking-tight mb-3">
                      Select your <span className="font-serif italic text-[#d4af37]">Window.</span>
                    </h3>
                    <div className="w-16 h-[1px] bg-[#d4af37]/50" />
                  </div>

                  {/* Day selector */}
                  <div className="flex flex-wrap gap-3 mb-12">
                    {availableDays.map((day) => (
                      <button
                        key={day.key}
                        onClick={() => { setSelectedDay(day.label); setSelectedTime(''); }}
                        className={`px-6 py-3 rounded-full border text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${
                          selectedDay === day.label
                            ? 'border-[#d4af37] bg-[#d4af37]/10 text-white shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                            : 'border-white/5 bg-white/[0.03] text-zinc-500 hover:text-zinc-200 hover:border-white/20'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="mb-14">
                    <span className="block text-[10px] font-mono tracking-[0.4em] text-zinc-600 uppercase mb-6">
                      Available Consultations (GMT+2)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {activeDay?.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-4 rounded-2xl border text-[11px] font-mono transition-all duration-500 ${
                            selectedTime === slot
                              ? 'border-[#d4af37] bg-white text-black font-bold shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                              : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleConfirmBooking} className="pt-12 border-t border-white/10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] ml-1">Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={bookingName} 
                          onChange={e => setBookingName(e.target.value)} 
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:border-[#d4af37] focus:bg-white/[0.05] outline-none transition-all placeholder:text-zinc-800" 
                          placeholder="ALEXANDER KNIGHT" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] ml-1">Digital Identity</label>
                        <input 
                          required 
                          type="email" 
                          value={bookingEmail} 
                          onChange={e => setBookingEmail(e.target.value)} 
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:border-[#d4af37] focus:bg-white/[0.05] outline-none transition-all placeholder:text-zinc-800" 
                          placeholder="EMAIL@DOMAIN.COM" 
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedTime}
                      className="w-full py-6 bg-white text-black rounded-2xl font-mono text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#d4af37] transition-all duration-700 disabled:opacity-20 flex items-center justify-center gap-3 group"
                    >
                      Confirm Strategic Call <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              ) : (
                /* Success State - Premium Invitation Card */
                <div className="animate-in fade-in zoom-in-95 duration-1000 text-center py-10">
                  <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#d4af37]/20 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                    <Check className="w-10 h-10 text-[#d4af37]" />
                  </div>
                  
                  <h3 className="text-4xl text-white font-display font-extralight tracking-tight mb-4">Slot <span className="font-serif italic text-[#d4af37]">Secured.</span></h3>
                  <p className="text-zinc-500 max-w-sm mx-auto mb-12 text-sm font-light leading-relaxed">
                    A private invitation has been dispatched to <span className="text-white underline decoration-[#d4af37]/30 underline-offset-4">{bookingEmail}</span>.
                  </p>

                  <div className="max-w-md mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-[#d4af37] to-white rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <div className="relative bg-[#050505] border border-white/10 rounded-[1.8rem] p-12 text-left overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                      
                      <div className="flex justify-between items-start mb-12">
                        <div>
                          <div className="text-[9px] text-[#d4af37] tracking-[0.4em] mb-3 font-bold uppercase">Consultation Pass</div>
                          <div className="text-2xl text-white font-display font-light tracking-wide uppercase">{bookingName}</div>
                        </div>
                        <CalendarIcon className="w-8 h-8 text-white/5" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-10 mb-12">
                        <div>
                          <span className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] block mb-2 font-mono">Date</span>
                          <span className="text-sm text-zinc-200 font-mono uppercase">{selectedDay.split(',')[1]}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] block mb-2 font-mono">Time</span>
                          <span className="text-sm text-zinc-200 font-mono uppercase">{selectedTime}</span>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                           <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-[0.2em]">Secure Link Ready</span>
                        </div>
                        <span className="text-[10px] text-zinc-700 font-mono">ID: VA-2024-XP</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="mt-14 text-[10px] font-mono text-zinc-600 hover:text-[#d4af37] transition-colors uppercase tracking-[0.4em] border-b border-zinc-800 pb-1"
                  >
                    Reschedule session
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
