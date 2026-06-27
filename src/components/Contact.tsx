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
    <section id="brief" className="bg-[#050505] py-24 px-6 relative overflow-hidden transition-all duration-500">
      {/* Background Ambience - Similar to Header blur effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.3em]">Priority Booking</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold uppercase tracking-tight leading-tight">
            Secure your <span className="font-serif italic font-light text-[#d4af37] capitalize">Onboarding.</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto mt-6 font-light leading-relaxed tracking-wide">
            Select a dedicated slot for a private strategic consultation to analyze the architecture of your venture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Panel: Studio Identity */}
          <div className="lg:col-span-4 group">
            <div className="h-full p-8 rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 flex flex-col justify-between transition-all duration-500 hover:border-white/20">
              <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                    <h3 className="font-mono text-[10px] text-white uppercase tracking-[0.2em]">
                      Venture Atelier <span className="text-[#d4af37]">HQ</span>
                    </h3>
                </div>
                
                <p className="text-zinc-500 text-xs leading-relaxed font-light mb-12">
                  Operating between Paris and Geneva. Consultations are strictly by invitation or successful diagnostic.
                </p>

                <div className="space-y-8">
                  <div className="group/item cursor-pointer">
                    <span className="text-[9px] text-zinc-600 font-mono tracking-[0.2em] block mb-2">INQUIRIES</span>
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#d4af37]/70" />
                        <a href="mailto:ventureatelier@gmail.com" className="text-sm text-zinc-300 group-hover/item:text-white transition-colors">
                            ventureatelier@gmail.com
                        </a>
                    </div>
                  </div>

                  <div className="group/item cursor-pointer">
                    <span className="text-[9px] text-zinc-600 font-mono tracking-[0.2em] block mb-2">GLOBAL LINE</span>
                    <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-[#d4af37]/70" />
                        <span className="text-sm text-zinc-300 group-hover/item:text-white transition-colors font-mono">
                            +229 47535360
                        </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5">
                <div className="text-[10px] font-mono text-zinc-600 tracking-[0.3em] uppercase mb-4">Verification</div>
                <div className="text-3xl font-display font-bold text-white tracking-tighter">
                  1,000<span className="text-[#d4af37]">+</span>
                </div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Ventures Fueled</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Scheduler */}
          <div className="lg:col-span-8 p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
            <div className="h-full p-8 md:p-12 rounded-[calc(1.5rem-1px)] bg-[#080808] backdrop-blur-3xl overflow-hidden relative">
              {!bookingConfirmed ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="mb-12">
                    <h3 className="text-2xl text-white font-display font-bold uppercase tracking-wider mb-2">
                      Scheduler
                    </h3>
                    <div className="w-12 h-0.5 bg-[#d4af37]" />
                  </div>

                  {/* Day selector - Desktop style tabs */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {availableDays.map((day) => (
                      <button
                        key={day.key}
                        onClick={() => { setSelectedDay(day.label); setSelectedTime(''); }}
                        className={`px-6 py-3 rounded-full border text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${
                          selectedDay === day.label
                            ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                            : 'border-white/5 bg-white/[0.02] text-zinc-500 hover:text-zinc-200'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="mb-12">
                    <span className="block text-[9px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-6">
                      Available Windows
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {activeDay?.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-4 rounded-xl border text-[10px] font-mono transition-all duration-500 ${
                            selectedTime === slot
                              ? 'border-[#d4af37] bg-white text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                              : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleConfirmBooking} className="pt-10 border-t border-white/5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={bookingName} 
                          onChange={e => setBookingName(e.target.value)} 
                          className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-sm text-white focus:border-[#d4af37] focus:bg-white/[0.05] outline-none transition-all placeholder:text-zinc-700" 
                          placeholder="EX: ALEXANDER KNIGHT" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] ml-1">Digital Identity</label>
                        <input 
                          required 
                          type="email" 
                          value={bookingEmail} 
                          onChange={e => setBookingEmail(e.target.value)} 
                          className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-sm text-white focus:border-[#d4af37] focus:bg-white/[0.05] outline-none transition-all placeholder:text-zinc-700" 
                          placeholder="EMAIL@DOMAIN.COM" 
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedTime}
                      className="w-full mt-4 py-5 bg-white text-black rounded-full font-mono text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#d4af37] transition-all duration-500 disabled:opacity-10 flex items-center justify-center gap-3"
                    >
                      Confirm Strategic Call <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ) : (
                /* Success State - Premium Boarding Pass */
                <div className="animate-in fade-in zoom-in-95 duration-1000 text-center py-12">
                  <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#d4af37]/20">
                    <Check className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  
                  <h3 className="text-3xl text-white font-display font-bold uppercase tracking-tighter mb-4">Slot Secured.</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto mb-12 text-xs font-light leading-relaxed tracking-wide">
                    The session invitation has been dispatched to <span className="text-white">{bookingEmail}</span>.
                  </p>

                  <div className="max-w-md mx-auto relative group">
                    <div className="absolute -inset-1 bg-[#d4af37] rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-10 text-left overflow-hidden">
                      <div className="flex justify-between items-start mb-10">
                        <div>
                          <div className="text-[8px] text-[#d4af37] tracking-[0.3em] mb-2 font-bold uppercase">Consultation Pass</div>
                          <div className="text-lg text-white font-display font-bold tracking-widest uppercase">{bookingName}</div>
                        </div>
                        <CalendarIcon className="w-8 h-8 text-white/10" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                          <span className="text-[8px] text-zinc-600 uppercase tracking-widest block mb-1">Date</span>
                          <span className="text-xs text-zinc-200 font-mono uppercase">{selectedDay}</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-zinc-600 uppercase tracking-widest block mb-1">Time (GMT+2)</span>
                          <span className="text-xs text-zinc-200 font-mono uppercase">{selectedTime}</span>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                           <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest">Secure Link Sent</span>
                        </div>
                        <span className="text-[10px] text-zinc-700 font-mono">VA-SESS-2024</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="mt-12 text-[9px] font-mono text-zinc-500 hover:text-[#d4af37] transition-colors uppercase tracking-[0.3em]"
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
