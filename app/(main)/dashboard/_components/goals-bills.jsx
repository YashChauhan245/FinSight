"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function GoalsAndBills({ showGoals = true, showBills = true }) {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 18)); // July 18, 2026
  const [viewDate, setViewDate] = useState(new Date(2026, 6, 1)); // Month view date

  const [bills, setBills] = useState([]);
  const [billTitle, setBillTitle] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billDate, setBillDate] = useState("2026-07-18");

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
        <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 text-left">
            <CardTitle className="text-lg font-bold text-slate-900 font-manrope">
              Savings Goals
            </CardTitle>
            <p className="text-xs text-slate-500">Track your target and progress.</p>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <p className="text-sm text-slate-400 font-medium">
              No goals yet. Add one from the goals action.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Right Column: Bill Due Calendar */}
      {showBills && (
        <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 text-left">
            <CardTitle className="text-lg font-bold text-slate-900 font-manrope">
              Bill Due Calendar
            </CardTitle>
            <p className="text-xs text-slate-500">Track due dates and payment reminders.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Calendar Grid - spans 7 cols */}
              <div className="md:col-span-7 space-y-3">
                {/* Month Navigation */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm font-bold text-slate-800">
                    {monthNames[month]} {year}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      suppressHydrationWarning
                      className="h-7 w-7 text-slate-500"
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      suppressHydrationWarning
                      className="h-7 w-7 text-slate-500"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Day Labels */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-1">
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
                        className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-slate-900 text-white font-bold"
                            : "hover:bg-slate-100 text-slate-700"
                        } relative`}
                      >
                        {day.getDate()}
                        {hasBill && !isSelected && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bills List for Selected Date - spans 5 cols */}
              <div className="md:col-span-5 border-l border-slate-100 md:pl-4 flex flex-col justify-between min-h-[160px]">
                <div className="space-y-3 text-left">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Bills on {selectedDateKey}
                  </h4>

                  {billsForSelectedDate.length === 0 ? (
                    <p className="text-xs text-slate-400 font-medium py-4">
                      No bills due on selected date.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {billsForSelectedDate.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs"
                        >
                          <span className="font-semibold text-slate-800">{bill.title}</span>
                          <span className="font-bold text-slate-900">Rs {bill.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Add Bill Form */}
            <form onSubmit={handleAddBill} className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
              <Input
                placeholder="Bill title"
                value={billTitle}
                onChange={(e) => setBillTitle(e.target.value)}
                className="text-xs h-9 border-slate-200"
              />
              <Input
                placeholder="Amount"
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="text-xs h-9 border-slate-200"
              />
              <Input
                type="date"
                value={billDate}
                onChange={(e) => setBillDate(e.target.value)}
                className="text-xs h-9 border-slate-200 text-slate-700"
              />
              <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-9 text-xs">
                Add Bill
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
