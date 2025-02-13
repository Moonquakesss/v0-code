"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PromptCard from "./prompt-card"
import PromptModal from "./prompt-modal"
import AddPromptForm from "./add-prompt-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from "lucide-react"

const categories = [
  { id: "all", name: "所有 Prompt" },
  { id: "prd", name: "PRD 转设计" },
  { id: "frontend", name: "前端开发" },
  { id: "backend", name: "后端 API" },
]

const initialPrompts = [
  { id: 1, title: "生成 PRD 线框图", category: "prd", content: "创建产品需求文档的线框图..." },
  { id: 2, title: "React 组件结构", category: "frontend", content: "设计 React 组件结构..." },
  { id: 3, title: "RESTful API 端点", category: "backend", content: "生成 RESTful API 端点..." },
]

export default function PromptMarket() {
  const [prompts, setPrompts] = useState(initialPrompts)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt)
    setIsModalOpen(true)
  }

  const handleAddPrompt = (newPrompt) => {
    setPrompts([...prompts, { ...newPrompt, id: prompts.length + 1 }])
    setIsAddFormOpen(false)
  }

  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="搜索 Prompt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <Button
          onClick={() => setIsAddFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> 添加 Prompt
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-blue-50 p-1 rounded-lg mb-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-3 py-1.5 text-sm rounded-md transition-all duration-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts
                .filter((prompt) => category.id === "all" || prompt.category === category.id)
                .map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} onClick={() => handlePromptClick(prompt)} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {filteredPrompts.length === 0 && <p className="text-center text-gray-500">没有找到匹配的 Prompt</p>}
      {selectedPrompt && (
        <PromptModal prompt={selectedPrompt} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isAddFormOpen && <AddPromptForm onSubmit={handleAddPrompt} onCancel={() => setIsAddFormOpen(false)} />}
    </div>
  )
}

