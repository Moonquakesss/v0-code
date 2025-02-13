"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddPromptForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, category, content })
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-800 mb-4">添加新 Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Prompt 标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border-blue-200 focus:border-blue-400 transition-all duration-300"
          />
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger className="border-blue-200 focus:border-blue-400 transition-all duration-300">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prd">PRD 转设计</SelectItem>
              <SelectItem value="frontend">前端开发</SelectItem>
              <SelectItem value="backend">后端 API</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Prompt 内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[150px] border-blue-200 focus:border-blue-400 transition-all duration-300"
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-blue-300 text-blue-600 hover:bg-blue-100 transition-colors duration-300"
            >
              取消
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
              添加 Prompt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

