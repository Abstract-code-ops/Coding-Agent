"use client"
import { act, useEffect, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeEditorClientComponent from './editorUI/codeEditorClientComponent';
import { MessageSquare, Code2, Terminal } from "lucide-react";
import ChatPane from "./chatUI/chatPane";
import EditorPane, { Console } from "./editorUI/editorPane";

interface CodeComponentLayoutProps {
  lessonId: string;
}

export default function CodeComponent({ lessonId }: CodeComponentLayoutProps) {

    const [activeTab, setActiveTab] = useState<'editor' | 'console' | 'chat'>('editor');
    const [isMobile, setIsMobile] = useState(false);

    const [output, setOutput] = useState<string[]>(["System initialized..."])

    useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

    if (!isMobile){
        console.log("Desktop Layout")
        return (
        <div className="h-screen w-full">
          <Allotment className="h-full">
            {/* LEFT PANEL: Editor & Console */}
            <EditorPane output={output} lessonId={lessonId} setOutput={setOutput} />
            {/* RIGHT PANEL: Chat */}
            <ChatPane />
          </Allotment>
        </div>
      );}

    return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e]">
      {/* Active Content Area */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "editor" ? (
          <div className="h-full flex flex-col">
            <CodeEditorClientComponent lessonId={lessonId} setOutput={setOutput} />
          </div>
        ) : (
          activeTab === "console" ? (
            <div className="h-full flex flex-col  bg-[#21252b] p-4 text-white overflow-auto">
              <Console output={output} setOutput={setOutput} />
            </div>
          ): (
            <div className="h-full bg-[#21252b] p-4 text-white">
              <ChatPane/>
          </div>
          )
        )}
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="h-16 bg-[#252526] border-t border-[#333] flex items-center justify-around px-6">
        <button 
          onClick={() => setActiveTab("editor")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "editor" ? "text-blue-500" : "text-gray-400"}`}
        >
          <Code2 size={20} />
          <span className="text-[10px] font-bold uppercase">Editor</span>
        </button>

        <button
          onClick={() => setActiveTab("console")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab == "console" ? "text-blue-500": "text-gray-400"}`}
          >
            <Terminal size={20}/>
            <span className="text-[10px] font-bold uppercase">Console</span>
          </button>
        
        <button 
          onClick={() => setActiveTab("chat")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "chat" ? "text-blue-500" : "text-gray-400"}`}
        >
          <MessageSquare size={20} />
          <span className="text-[10px] font-bold uppercase">AI Chat</span>
        </button>
      </nav>
    </div>
  );
}