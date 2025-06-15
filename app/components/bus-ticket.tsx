"use client"

import { useEffect, useRef } from "react"

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

interface ColorScheme {
  id: string
  name: string
  colors: string[]
}

interface BusTicketProps {
  data: TicketData
  colorScheme: ColorScheme
}

export default function BusTicket({ data, colorScheme }: BusTicketProps) {
  const barcodeRef = useRef<HTMLCanvasElement>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    return `${day} ${month}`
  }

  const formatTime = (timeString: string) => {
    return timeString || "00:00"
  }

  // Generate barcode data string
  const generateBarcodeData = () => {
    return `${data.passengerName}|${data.from}|${data.to}|${data.date}|${data.boardingTime}|${data.busNumber}|${data.seatNumber}|${data.price}`
  }

  // Generate barcode
  useEffect(() => {
    if (barcodeRef.current) {
      const canvas = barcodeRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const barcodeData = generateBarcodeData()
        const barWidth = 1.5
        const barHeight = 35

        canvas.width = 100
        canvas.height = barHeight

        ctx.fillStyle = "#000000"
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Generate barcode pattern
        for (let i = 0; i < 65; i++) {
          const charCode = barcodeData.charCodeAt(i % barcodeData.length)
          if (charCode % 3 === 0) {
            ctx.fillRect(i * 1.5, 0, barWidth, barHeight)
          }
        }
      }
    }
  }, [data])

  const [primary, secondary, accent] = colorScheme.colors

  // Bus icon SVG - smaller version for the ticket
  const BusIcon = ({ color = "#ffffff", size = 20 }: { color?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
    </svg>
  )

  return (
    <div className="print:shadow-none shadow-lg">
      {/* Ticket Container - Exact dimensions matching reference */}
      <div
        id="bus-ticket-print"
        className="relative bg-white print:shadow-none mx-auto"
        style={{
          width: "850px",
          height: "300px",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ddd",
        }}
      >
        {/* Header Section - Red background */}
        <div
          className="relative flex items-center justify-between"
          style={{
            background: primary,
            height: "70px",
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
        >
          {/* Left Bus Icon */}
          <div className="flex items-center">
            <BusIcon color="white" size={35} />
          </div>

          {/* Left Transport Corp Logo */}
          <div
            className="bg-white rounded flex items-center justify-center"
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              color: primary,
              width: "60px",
              height: "35px",
              marginLeft: "80px",
            }}
          >
            {data.transportCorp}
          </div>

          {/* Center TICKET text with triangular cutout */}
          <div className="relative">
            <div className="text-white font-bold tracking-widest" style={{ fontSize: "18px" }}>
              TICKET
            </div>
            {/* Triangular cutout effect */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                top: "100%",
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: `12px solid ${primary}`,
              }}
            />
          </div>

          {/* Right Transport Corp Logo */}
          <div
            className="bg-white rounded flex items-center justify-center"
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              color: primary,
              width: "60px",
              height: "35px",
              marginRight: "80px",
            }}
          >
            {data.transportCorp}
          </div>

          {/* Right Bus Icon */}
          <div className="flex items-center">
            <BusIcon color="white" size={35} />
          </div>
        </div>

        {/* Main Content Area - White background */}
        <div style={{ height: "150px", backgroundColor: "#ffffff", padding: "20px 30px" }}>
          <div className="grid grid-cols-3 gap-0 h-full">
            {/* Left Column */}
            <div style={{ paddingRight: "20px" }}>
              <div style={{ fontSize: "13px", color: "#333", marginBottom: "6px", fontWeight: "normal" }}>
                PASSENGER NAME :
              </div>
              <div
                style={{ fontSize: "28px", fontWeight: "bold", color: "#000", marginBottom: "20px", lineHeight: "1" }}
              >
                {data.passengerName.toUpperCase()}
              </div>
              <div style={{ fontSize: "13px", color: "#333", marginBottom: "6px", fontWeight: "normal" }}>
                BOARDING TIME :
              </div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#000", lineHeight: "1" }}>
                {formatTime(data.boardingTime)}
              </div>
            </div>

            {/* Center Column */}
            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <div style={{ fontSize: "13px", color: "#333", marginBottom: "6px", fontWeight: "normal" }}>FROM :</div>
              <div
                style={{ fontSize: "28px", fontWeight: "bold", color: "#000", marginBottom: "20px", lineHeight: "1" }}
              >
                {data.from.toUpperCase()}
              </div>
              <div style={{ fontSize: "13px", color: "#333", marginBottom: "6px", fontWeight: "normal" }}>TO :</div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#000", lineHeight: "1" }}>
                {data.to.toUpperCase()}
              </div>
            </div>

            {/* Right Column */}
            <div style={{ paddingLeft: "20px" }}>
              <div style={{ fontSize: "13px", color: "#333", marginBottom: "6px", fontWeight: "normal" }}>
                PASSENGER NAME :
              </div>
              <div
                style={{ fontSize: "28px", fontWeight: "bold", color: "#000", marginBottom: "20px", lineHeight: "1" }}
              >
                {data.passengerName.toUpperCase()}
              </div>

              {/* Compact FROM/TO with bus icon */}
              <div className="flex items-center justify-between" style={{ marginTop: "10px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#333", marginBottom: "2px" }}>FROM:</div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#000", lineHeight: "1.1" }}>
                    {data.from.split(" ")[0]?.toUpperCase() || ""}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#000", lineHeight: "1.1" }}>
                    {data.from.split(" ").slice(1).join(" ").toUpperCase()}
                  </div>
                </div>

                <BusIcon color={primary} size={24} />

                <div className="text-right">
                  <div style={{ fontSize: "11px", color: "#333", marginBottom: "2px" }}>TO:</div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#000", lineHeight: "1.1" }}>
                    {data.to.split(" ")[0]?.toUpperCase().substring(0, 7) || ""}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#000", lineHeight: "1.1" }}>
                    {data.to.split(" ").slice(1).join("").toUpperCase().substring(0, 6)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Light pink background with dashed separators */}
        <div
          style={{
            height: "80px",
            backgroundColor: accent,
            padding: "15px 30px",
            position: "relative",
          }}
        >
          {/* Top dotted/dashed line - more prominent */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "3px",
              background: `repeating-linear-gradient(to right, ${secondary} 0px, ${secondary} 8px, transparent 8px, transparent 16px)`,
            }}
          />

          <div className="grid grid-cols-12 gap-0 items-center h-full">
            {/* Price - 2 columns */}
            <div className="col-span-2">
              <div style={{ fontSize: "11px", color: "#333", marginBottom: "4px" }}>PRICE (INC. TAX)</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>₹ {data.price}</div>
            </div>

            {/* Vertical dotted separator */}
            <div className="col-span-1 flex justify-center">
              <div
                style={{
                  width: "3px",
                  height: "50px",
                  background: `repeating-linear-gradient(to bottom, ${secondary} 0px, ${secondary} 6px, transparent 6px, transparent 12px)`,
                }}
              />
            </div>

            {/* Bus - 2 columns */}
            <div className="col-span-2">
              <div style={{ fontSize: "11px", color: "#333", marginBottom: "4px" }}>BUS</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>{data.busNumber}</div>
            </div>

            {/* Vertical dotted separator */}
            <div className="col-span-1 flex justify-center">
              <div
                style={{
                  width: "3px",
                  height: "50px",
                  background: `repeating-linear-gradient(to bottom, ${secondary} 0px, ${secondary} 6px, transparent 6px, transparent 12px)`,
                }}
              />
            </div>

            {/* Seat - 1.5 columns */}
            <div className="col-span-1">
              <div style={{ fontSize: "11px", color: "#333", marginBottom: "4px" }}>SEAT:</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>{data.seatNumber}</div>
            </div>

            {/* Vertical dotted separator */}
            <div className="col-span-1 flex justify-center">
              <div
                style={{
                  width: "3px",
                  height: "50px",
                  background: `repeating-linear-gradient(to bottom, ${secondary} 0px, ${secondary} 6px, transparent 6px, transparent 12px)`,
                }}
              />
            </div>

            {/* Date - 1.5 columns */}
            <div className="col-span-1">
              <div style={{ fontSize: "11px", color: "#333", marginBottom: "4px" }}>DATE :</div>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>{formatDate(data.date)}</div>
            </div>

            {/* Barcode - 2 columns */}
            <div className="col-span-2 flex justify-end">
              <canvas ref={barcodeRef} style={{ border: "1px solid #999" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
