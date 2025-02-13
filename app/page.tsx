import PromptMarket from "../components/prompt-market"

export default function Home() {
  return (
    <main className="container mx-auto p-4 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Prompt 市场</h1>
      <PromptMarket />
    </main>
  )
}

