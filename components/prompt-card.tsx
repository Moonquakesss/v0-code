import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PromptCard({ prompt, onClick }) {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 ease-in-out border-blue-100 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-4">
        <CardTitle className="text-lg font-medium text-blue-700 truncate">{prompt.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <p className="text-sm text-gray-600 line-clamp-3">{prompt.content}</p>
      </CardContent>
    </Card>
  )
}

