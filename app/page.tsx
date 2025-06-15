"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BusTicket from "./components/bus-ticket"

interface TicketData {
  passengerName: string
  from: string
  boardingTime: string
  to: string
  price: string
  busNumber: string
  seatNumber: string
  date: string
  colorScheme: string
  transportCorp: string
}

const colorSchemes = [
  { id: "red", name: "Classic Red", colors: ["#dc2626", "#ef4444", "#fecaca"] },
  { id: "blue", name: "Ocean Blue", colors: ["#1e40af", "#3b82f6", "#bfdbfe"] },
  { id: "green", name: "Forest Green", colors: ["#166534", "#22c55e", "#bbf7d0"] },
  { id: "purple", name: "Royal Purple", colors: ["#7c3aed", "#a855f7", "#ddd6fe"] },
  { id: "orange", name: "Sunset Orange", colors: ["#ea580c", "#f97316", "#fed7aa"] },
  { id: "teal", name: "Ocean Teal", colors: ["#0f766e", "#14b8a6", "#ccfbf1"] },
  { id: "indigo", name: "Deep Indigo", colors: ["#4338ca", "#6366f1", "#c7d2fe"] },
]

const transportCorporations = [
  { id: "UPSRTC", name: "UPSRTC", fullName: "Uttar Pradesh State Road Transport Corporation" },
  { id: "HRST", name: "HRST", fullName: "Haryana State Transport" },
  { id: "PUNBUS", name: "PUNBUS", fullName: "Punjab State Transport" },
  { id: "RSRTC", name: "RSRTC", fullName: "Rajasthan State Road Transport Corporation" },
  { id: "JKSRTC", name: "JKSRTC", fullName: "Jammu & Kashmir State Road Transport Corporation" },
  { id: "DTC", name: "DTC", fullName: "Delhi Transport Corporation" },
]

export default function BusTicketGenerator() {
  const [ticketData, setTicketData] = useState<TicketData>({
    passengerName: "",
    from: "",
    boardingTime: "",
    to: "",
    price: "",
    busNumber: "",
    seatNumber: "",
    date: "",
    colorScheme: "red",
    transportCorp: "UPSRTC",
  })

  const [showTicket, setShowTicket] = useState(false)

  // Add this useEffect after the state declarations
  useEffect(() => {
    if (showTicket && ticketData.passengerName) {
      const title = `${ticketData.from}-${ticketData.to}-${formatDate(ticketData.date)}-${ticketData.boardingTime}-${ticketData.passengerName}`
      document.title = title
    } else {
      document.title = "Bus Ticket Generator"
    }
  }, [showTicket, ticketData])

  const handleInputChange = (field: keyof TicketData, value: string) => {
    setTicketData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowTicket(true)
  }

  const resetForm = () => {
    setShowTicket(false)
    setTicketData({
      passengerName: "",
      from: "",
      boardingTime: "",
      to: "",
      price: "",
      busNumber: "",
      seatNumber: "",
      date: "",
      colorScheme: "red",
      transportCorp: "UPSRTC",
    })
  }

  const loadSampleData = () => {
    setTicketData({
      passengerName: "RAJAN KAPOOR",
      from: "ANAND VIHAR",
      boardingTime: "08:30",
      to: "MUZAFFARNAGAR",
      price: "420.00",
      busNumber: "UP03 6388",
      seatNumber: "07C",
      date: "2024-06-14",
      colorScheme: "red",
      transportCorp: "UPSRTC",
    })
  }

  // Add formatDate function before the return statement
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    return `${day}${month}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">Bus Ticket Generator</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Generate professional bus tickets with customizable designs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Form Section - spans 1 column on large screens, full width on mobile */}
          <Card className="lg:col-span-1 shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Ticket Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="transportCorp" className="text-sm font-medium">
                    Transport Corporation
                  </Label>
                  <Select
                    value={ticketData.transportCorp}
                    onValueChange={(value) => handleInputChange("transportCorp", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select transport corporation" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportCorporations.map((corp) => (
                        <SelectItem key={corp.id} value={corp.id}>
                          <div className="flex flex-col py-1">
                            <span className="font-medium text-sm">{corp.name}</span>
                            <span className="text-xs text-gray-500 hidden sm:block">{corp.fullName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="passengerName" className="text-sm font-medium">
                    Passenger Name
                  </Label>
                  <Input
                    id="passengerName"
                    value={ticketData.passengerName}
                    onChange={(e) => handleInputChange("passengerName", e.target.value)}
                    placeholder="Enter passenger name"
                    className="mt-1"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from" className="text-sm font-medium">
                      From
                    </Label>
                    <Input
                      id="from"
                      value={ticketData.from}
                      onChange={(e) => handleInputChange("from", e.target.value)}
                      placeholder="Departure city"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="to" className="text-sm font-medium">
                      To
                    </Label>
                    <Input
                      id="to"
                      value={ticketData.to}
                      onChange={(e) => handleInputChange("to", e.target.value)}
                      placeholder="Destination city"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="boardingTime" className="text-sm font-medium">
                      Boarding Time
                    </Label>
                    <Input
                      id="boardingTime"
                      type="time"
                      value={ticketData.boardingTime}
                      onChange={(e) => handleInputChange("boardingTime", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={ticketData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price (Inc. Tax)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={ticketData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="420.00"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="busNumber" className="text-sm font-medium">
                      Bus Number
                    </Label>
                    <Input
                      id="busNumber"
                      value={ticketData.busNumber}
                      onChange={(e) => handleInputChange("busNumber", e.target.value)}
                      placeholder="UP03 6388"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="seatNumber" className="text-sm font-medium">
                      Seat Number
                    </Label>
                    <Input
                      id="seatNumber"
                      value={ticketData.seatNumber}
                      onChange={(e) => handleInputChange("seatNumber", e.target.value)}
                      placeholder="07C"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="colorScheme" className="text-sm font-medium">
                    Color Scheme
                  </Label>
                  <Select
                    value={ticketData.colorScheme}
                    onValueChange={(value) => handleInputChange("colorScheme", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorSchemes.map((scheme) => (
                        <SelectItem key={scheme.id} value={scheme.id}>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {scheme.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span className="text-sm">{scheme.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Button type="submit" className="flex-1 text-sm sm:text-base">
                    Generate Ticket
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={loadSampleData}
                    className="flex-1 text-sm sm:text-base"
                  >
                    Load Sample Data
                  </Button>
                  {/* {showTicket && (
                    <Button type="button" variant="outline" onClick={resetForm} className="text-sm sm:text-base">
                      Reset
                    </Button>
                  )} */}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Ticket Preview Section */}
          {showTicket && (
            <div className="lg:col-span-2 flex flex-col items-center space-y-4 sm:space-y-6">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Generated Ticket</h2>
                <p className="text-sm sm:text-base text-gray-600">Your ticket is ready for download and printing</p>
              </div>

              {/* Mobile-friendly ticket container */}
              <div className="w-full overflow-x-auto bg-white p-2 sm:p-6 rounded-lg shadow-xl border">
                <div className="min-w-[850px]">
                  <BusTicket
                    data={ticketData}
                    colorScheme={colorSchemes.find((s) => s.id === ticketData.colorScheme)!}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <Button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                  size="lg"
                >
                  🖨️ Print Ticket
                </Button>
                <Button onClick={resetForm} variant="outline" size="lg" className="text-sm sm:text-base">
                  🔄 Generate New
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
