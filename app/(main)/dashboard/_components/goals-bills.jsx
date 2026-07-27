"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Target, Calendar as CalendarIcon, Plus } from "lucide-react";

export function GoalsAndBills({ showGoals = true, showBills = true }) {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 18)); // July 18, 2026
  const [viewDate, setViewDate] = useState(new Date(2026, 6, 1)); // Month view date

  const [bills, setBills] = useState([
    { id: 1, title: "Internet Bill", amount: 1499, date: "7/18/2026" },
    { id: 2, title: "Electricity", amount: 2350, date: "7/24/2026" },
  ]);
  const [billTitle, setBillTitle] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billDate, setBillDate] = useState("2026-07-18");

  // Sample savings goals to display progress bars cleanly
  const goals = [
    { id: 1, title: "Emergency Fund", current: 85000, target: 100000, color: "bg-emerald-500" },
    { id: 2, title: "Vacation Trip", current: 32000, target: 50000, color: "bg-violet-500" },
    { id: 3, title: "Tech Upgrade", current: 45000, target: 60000, color: "bg-indigo-500" },
  ];

  if (!showGoals && !showBills) return null;

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Generate calendar days
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOffset = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(year, month, i));
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Format date as string M/D/YYYY for display and keying
  const formatDateKey = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleAddBill = (e) => {
    e.preventDefault();
    if (!billTitle.trim() || !billAmount.trim() || !billDate) return;

    // Parse the date input value (YYYY-MM-DD) into Date object
    const [y, m, d] = billDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);

    const newBill = {
      id: Date.now(),
      title: billTitle,
      amount: parseFloat(billAmount),
      date: formatDateKey(dateObj),
    };

    setBills((prev) => [...prev, newBill]);
    setBillTitle("");
    setBillAmount("");
  };

  const selectedDateKey = formatDateKey(selectedDate);
  const billsForSelectedDate = bills.filter((b) => b.date === selectedDateKey);

  return (
    <div className={`grid gap-4 ${showGoals && showBills ? "lg:grid-cols-2" : "grid-cols-1"}`}>
      {/* Left Column: Savings Goals */}
      {showGoals && (
        <Card className="border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-all rounded-xl font-inter flex flex-col justify-between">
          <CardHeader className="pb-3 p-5 sm:p-6 text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-50 text-violet-700">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-gray-900 font-inter">
                  Savings Goals
                </CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">Track target progress and milestone achievements.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-0 sm:pt-0 space-y-4 flex-1 flex flex-col justify-center">
            {goals.map((goal) => {
              const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
              return (
                <div key={goal.id} className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-800">{goal.title}</span>
                    <span className="font-semibold text-gray-600 tabular-nums">
                      ₹{goal.current.toLocaleString("en-IN")} / ₹{goal.target.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200/50">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${goal.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Right Column: Bill Due Calendar */}
      {showBills && (
        <Card className="border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-all rounded-xl font-inter">
          <CardHeader className="pb-3 p-5 sm:p-6 text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-50 text-violet-700">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-gray-900 font-inter">
                  Bill Due Calendar
                </CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">Track due dates and payment reminders.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-0 sm:pt-0 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Calendar Grid - spans 7 cols */}
              <div className="md:col-span-7 space-y-3">
                {/* Month Navigation */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-gray-800">
                    {monthNames[month]} {year}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      suppressHydrationWarning
                      className="h-7 w-7 text-gray-500 hover:bg-gray-100 rounded-md"
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      suppressHydrationWarning
                      className="h-7 w-7 text-gray-500 hover:bg-gray-100 rounded-md"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Day Labels */}
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-gray-400 mb-1">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>

                {/* Day Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {calendarDays.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} />;
                    
                    const isSelected = selectedDate && 
                      day.getDate() === selectedDate.getDate() &&
                      day.getMonth() === selectedDate.getMonth() &&
                      day.getFullYear() === selectedDate.getFullYear();

                    const dayKey = formatDateKey(day);
                    const hasBill = bills.some((b) => b.date === dayKey);

                    return (
                      <button
                        key={idx}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setSelectedDate(day)}
                        className={`h-7 w-7 mx-auto rounded-lg flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-violet-600 text-white font-bold shadow-sm"
                            : "hover:bg-gray-100 text-gray-700"
                        } relative font-medium`}
                      >
                        {day.getDate()}
                        {hasBill && !isSelected && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bills List for Selected Date - spans 5 cols */}
              <div className="md:col-span-5 border-l border-gray-100 md:pl-4 flex flex-col justify-between min-h-[150px]">
                <div className="space-y-2.5 text-left">
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Bills on {selectedDateKey}
                  </h4>

                  {billsForSelectedDate.length === 0 ? (
                    <p className="text-xs text-gray-400 font-medium py-3">
                      No bills due on selected date.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {billsForSelectedDate.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200/80 text-xs"
                        >
                          <span className="font-semibold text-gray-800">{bill.title}</span>
                          <span className="font-bold text-gray-900 tabular-nums">₹{bill.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Add Bill Form */}
            <form onSubmit={handleAddBill} className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-3 border-t border-gray-100">
              <Input
                placeholder="Bill title"
                value={billTitle}
                onChange={(e) => setBillTitle(e.target.value)}
                className="text-xs h-9 border-gray-200 rounded-lg focus-visible:ring-violet-500 font-medium"
              />
              <Input
                placeholder="Amount"
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="text-xs h-9 border-gray-200 rounded-lg focus-visible:ring-violet-500 font-medium"
              />
              <Input
                type="date"
                value={billDate}
                onChange={(e) => setBillDate(e.target.value)}
                className="text-xs h-9 border-gray-200 rounded-lg text-gray-700 font-medium"
              />
              <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-medium h-9 text-xs rounded-lg shadow-sm">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Bill
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
