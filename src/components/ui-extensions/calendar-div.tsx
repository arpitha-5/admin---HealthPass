"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

function getMonthDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days: Date[] = []
  
  const startPadding = firstDay.getDay()
  for (let i = startPadding - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i)
    days.push(prevDate)
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i))
  }
  
  const endPadding = 42 - days.length
  for (let i = 1; i <= endPadding; i++) {
    days.push(new Date(year, month + 1, i))
  }
  
  return days
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())
  const [selectedDate, setSelectedDate] = useState(selected)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = useMemo(() => getMonthDays(year, month), [year, month])

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    handleSelect(today)
  }

  const handleSelect = (date: Date) => {
    setSelectedDate(date)
    onSelect?.(date)
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToToday} className="text-xs">
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="h-9 flex items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month
          const isSelected = selectedDate && isSameDay(date, selectedDate)
          const isCurrentDay = isToday(date)
          const isWeekend = date.getDay() === 0 || date.getDay() === 6

          return (
            <div
              key={index}
              onClick={() => handleSelect(date)}
              className={cn(
                "h-10 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-all duration-200",
                !isCurrentMonth && "text-muted-foreground/50",
                isCurrentMonth && !isSelected && "hover:bg-muted",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90 font-medium",
                isCurrentDay && !isSelected && "ring-2 ring-primary/50",
                isWeekend && isCurrentMonth && !isSelected && "text-muted-foreground"
              )}
            >
              {date.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface CalendarEvent {
  id: string
  title: string
  date: Date
  type: "appointment" | "task" | "reminder"
}

interface CalendarWithEventsProps extends CalendarProps {
  events?: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

export function CalendarWithEvents({
  events = [],
  onEventClick,
  ...props
}: CalendarWithEventsProps) {
  const [currentDate, setCurrentDate] = useState(props.selected || new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    events.forEach((event) => {
      const key = event.date.toDateString()
      const existing = map.get(key) || []
      map.set(key, [...existing, event])
    })
    return map
  }, [events])

  const handleSelect = (date: Date) => {
    setCurrentDate(date)
    props.onSelect?.(date)
  }

  const days = useMemo(() => getMonthDays(year, month), [year, month])

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    handleSelect(today)
  }

  const eventColors = {
    appointment: "bg-blue-500",
    task: "bg-amber-500",
    reminder: "bg-green-500",
  }

  return (
    <div className={cn("w-full", props.className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToToday} className="text-xs">
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="h-9 flex items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month
          const isSelected = props.selected && isSameDay(date, props.selected)
          const isCurrentDay = isToday(date)
          const dayEvents = eventsByDate.get(date.toDateString()) || []

          return (
            <div
              key={index}
              onClick={() => handleSelect(date)}
              className={cn(
                "min-h-[80px] p-1 rounded-lg border transition-colors cursor-pointer",
                !isCurrentMonth && "bg-muted/30 border-transparent",
                isCurrentMonth && !isSelected && "bg-background border-border hover:border-primary/50",
                isSelected && "border-primary bg-primary/5"
              )}
            >
              <div
                className={cn(
                  "h-7 w-7 flex items-center justify-center rounded-md text-sm mb-1",
                  isCurrentDay && !isSelected && "bg-primary text-primary-foreground font-semibold",
                  isCurrentDay && isSelected && "bg-primary text-primary-foreground font-semibold",
                  isSelected && !isCurrentDay && "bg-primary/10 text-primary font-semibold",
                  !isCurrentMonth && "text-muted-foreground"
                )}
              >
                {date.getDate()}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick?.(event)
                    }}
                    className={cn(
                      "text-[10px] truncate px-1 py-0.5 rounded text-white",
                      eventColors[event.type]
                    )}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-muted-foreground px-1">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
