import { useState } from 'react'
import { Allotment } from "allotment";
import { ChatInput, ChatInputSubmit, ChatInputTextArea } from '@/components/ui/chat-input';
import { cn } from '@/lib/utils';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatPane = () => {

  const [input, setInput] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<{role: "user" | "assistant", content: string}[]>([])

  const handleSubmit = () => {
    setMessages(
      prev => [...prev, {role: "user", content: input}]
    )
    setInput("")

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMessages(
        prev => [...prev, {role: "assistant",
          content: `Hello! I am Sensei Bot. I've updated my systems to support full-width Markdown rendering. Let's verify the new components:

### 1. Text & Lists
Testing the alignment of standard prose and nested lists:
* **Bold Text** for emphasis.
* *Italic Text* for secondary notes.
* A nested list to check indentation:
    1. First sub-item.
    2. Second sub-item.

### 2. Code Syntax Highlighting
Here is a React snippet to check the **vscDarkPlus** theme and block padding:

\`\`\`tsx
import React from 'react';

export const SenseiLogo = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="h-[75px] w-[75px]">
      {isLoading ? <video src="/AIdumb.webm" autoPlay loop muted /> : <img src="/AIready.png" />}
    </div>
  );
};
\`\`\`

\`\`\`python
import time
start_time = time.time()

# Code to measure goes here
for i in range(20):
    if i % 2 == 0:
        print(i, end=" ")

end_time = time.time()
time_taken = end_time - start_time
print(f"\\nTime: {time_taken} seconds")
\`\`\`

### 3. Data Tables
Since I am now **full-width**, this table should span the entire chat area without being squeezed:

| Component | Status | Styling Detail |
| :--- | :--- | :--- |
| **Markdown** | ✅ Active | Using react-markdown with Remark GFM. |
| **Syntax** | ✅ Active | Prism highlighting for code blocks. |
| **Tables** | ✅ Active | Custom Tailwind borders and zebra-striping. |
| **Input** | ✅ Active | Auto-resizing textarea with hidden scrollbar. |

### 4. Inline Elements
You can also see \`inline_code_snippets\` highlight correctly within a sentence, and long URLs like https://www.this-is-a-very-long-test-url-to-verify-that-word-wrap-is-working-perfectly-on-your-new-full-width-layout.com should wrap to the next line automatically.`
        }]
      )
    }, 3000)
  }

  return (
    <Allotment.Pane className='h-full w-full bg-[#252526] md:p-3 flex flex-col' preferredSize={400} minSize={200}>
        <div className="shrink-0 flex flex-col md:flex-row md:gap-2 pt-1 pb-3 px-6 text-white font-bold items-center">
          <div className="relative h-16 w-16 md:h-18.75 md:w-18.75 shrink-0">
            <img
              src="/AIready.png"
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-300",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              alt="ready"
            />
            
            <video
              src="/AIdumb.webm"
              autoPlay
              loop
              muted
              playsInline
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-300",
                isLoading ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
          <div className="text-center text-lg md:text-xl flex-2 mt-6">
            {"HI! I AM SENSEI BOT!! :)"}
          </div>
        </div>
        {messages.length > 0 ? (
          <div className="flex-1 flex flex-col gap-4 p-2 md:p-6 overflow-y-auto no-scrollbar w-full">
            {
              messages.map((message, index) => (
                <div className={cn(
                  "p-4 text-white wrap-break-word",
                  message.role === "user" ? "max-w-[95%] md:max-w-[70%] bg-[#3b3b3b] rounded-md rounded-tr-none ml-auto" : "w-full"
                )}
                key={index}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // 1. Text & Paragraphs
                      p: ({ children }) => <p className="mb-4 last:mb-0 leading-7">{children}</p>,
                      
                      // 2. Lists
                      ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
                      
                      // 3. Tables
                      table: ({ children }) => (
                        <div className="my-6 overflow-x-auto rounded-lg border border-zinc-700">
                          <table className="w-full text-sm text-left">{children}</table>
                        </div>
                      ),
                      thead: ({ children }) => <thead className="bg-zinc-800/50 text-zinc-300">{children}</thead>,
                      th: ({ children }) => <th className="px-4 py-2 font-semibold border-b border-zinc-700">{children}</th>,
                      td: ({ children }) => <td className="px-4 py-2 border-b border-zinc-700/50">{children}</td>,

                      // 4. Code Snippets
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <div className="my-4 rounded-md overflow-hidden text-sm">
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{ margin: 0, padding: '1.5rem' }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-pink-400" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ))
            }
          </div>
        )
        :(<div className="flex-1 flex justify-center items-center p-6 text-xl md:text-2xl text-white font-extrabold">
          How Can I Help You Today ?
        </div>)}
        <div className="text-white shrink-0 pb-4 px-2">
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSubmit}
            onStop={() => setLoading(false)}
          >
            <ChatInputTextArea placeholder='Type your messages here...' />
            <ChatInputSubmit loading={isLoading} className='cursor-pointer text-white'/>
          </ChatInput>
        </div>
    </Allotment.Pane>
  )
}

export default ChatPane