"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"

export default function PromptModal({ prompt, isOpen, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = () => {
    const markdownContent = `# ${prompt.title}\n\n${prompt.content}`
    const blob = new Blob([markdownContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${prompt.title.toLowerCase().replace(/\s+/g, "-")}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-800 mb-4">{prompt.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 bg-blue-50 p-4 rounded-lg shadow-inner">
          <p className="text-base text-gray-700 whitespace-pre-wrap">{prompt.content}</p>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="border-blue-300 text-blue-600 hover:bg-blue-100 transition-colors duration-300"
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "已复制！" : "复制"}
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-blue-300 text-blue-600 hover:bg-blue-100 transition-colors duration-300"
          >
            <Download className="mr-2 h-4 w-4" />
            导出 Markdown
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

