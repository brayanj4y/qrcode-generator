"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, RefreshCw } from "lucide-react"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("")
  const [qrValue, setQrValue] = useState("")
  const [error, setError] = useState("")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [fgColor, setFgColor] = useState("#000000")

  const generateQR = () => {
    if (!url) {
      setError("URL REQUIRED")
      return
    }

    // Simple URL validation
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`)
      setQrValue(url)
      setError("")
    } catch (e) {
      setError("INVALID URL")
    }
  }

  const downloadQR = () => {
    if (!qrValue) return

    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "brutalist-qr.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-[70%] max-w-md border-4 border-black">
        <div className="bg-black text-white p-2 font-mono text-xs uppercase tracking-wider">BRUTALIST QR GENERATOR</div>

        <div className="p-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="url" className="text-xs uppercase font-mono">
              URL
            </label>
            <div className="flex gap-1">
              <Input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="ENTER URL"
                className="flex-1 h-8 border-2 border-black rounded-none text-xs font-mono placeholder:text-gray-500"
              />
              <Button
                onClick={generateQR}
                className="h-8 bg-black text-white rounded-none hover:bg-gray-800 text-xs font-mono"
              >
                GENERATE
              </Button>
            </div>
            {error && <p className="text-xs text-red-600 font-mono mt-1">{error}</p>}
          </div>

          <div className="flex gap-2 text-xs">
            <div className="flex items-center gap-1">
              <label htmlFor="bg" className="uppercase font-mono">
                BG
              </label>
              <Input
                id="bg"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-6 h-6 p-0 border-2 border-black rounded-none"
              />
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="fg" className="uppercase font-mono">
                FG
              </label>
              <Input
                id="fg"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-6 h-6 p-0 border-2 border-black rounded-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center border-2 border-black p-2 bg-gray-100">
            {qrValue ? (
              <div className="relative">
                <QRCodeSVG
                  id="qr-code"
                  value={qrValue}
                  size={180}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={true}
                />
                <Button
                  onClick={downloadQR}
                  className="absolute -bottom-3 -right-3 h-8 w-8 p-0 bg-black text-white rounded-none hover:bg-gray-800"
                >
                  <Download size={14} />
                </Button>
              </div>
            ) : (
              <div className="h-[180px] w-[180px] border-2 border-dashed border-black flex items-center justify-center">
                <RefreshCw size={24} className="text-gray-400" />
              </div>
            )}
          </div>

          {qrValue && (
            <p className="text-[10px] font-mono text-center break-all border-t-2 border-black pt-2">{qrValue}</p>
          )}
        </div>
      </div>

      <div className="w-[70%] max-w-md border-4 border-black mt-4">
        <div className="bg-black text-white p-2 font-mono text-xs uppercase tracking-wider">
          YOU LIKED IT? CONNECT WITH ME
        </div>
        <div className="p-3 flex justify-between">
          <a
            href="https://github.com/brayanj4y"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs uppercase font-mono border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="arcs"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GITHUB
          </a>
          <a
            href="https://instagram.com/brayanj4y"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs uppercase font-mono border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="arcs"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            INSTAGRAM
          </a>
          <a
            href="https://linkedin.com/in/brayan-j4y"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs uppercase font-mono border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="arcs"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LINKEDIN
          </a>
        </div>
      </div>

      <p className="mt-4 text-[10px] uppercase font-mono text-gray-600">SCAN WITH ANY QR READER</p>
    </main>
  )
}
