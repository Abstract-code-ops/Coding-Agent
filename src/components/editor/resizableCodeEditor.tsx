"use client"
import { useEffect, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeEditorClientComponent from './codeEditorClientComponent';
import { MessageSquare, Code2, Terminal } from "lucide-react";

interface ResizableEditorLayoutProps {
  lessonId: string;
}

export default function ResizableEditorLayout({ lessonId }: ResizableEditorLayoutProps) {

    const [activeTab, setActiveTab] = useState<'editor' | 'console' | 'chat'>('editor');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

    if (!isMobile){
        return (
    <Allotment>
      {/* LEFT PANEL: Editor & Console */}
      <Allotment.Pane minSize={300}>
        <Allotment vertical>
          <Allotment.Pane minSize={200}>
             <CodeEditorClientComponent lessonId={lessonId} />
          </Allotment.Pane>
          
          <Allotment.Pane preferredSize={200} minSize={100}>
            <div className="h-full bg-[#1e1e1e] border-t border-[#2d2d2d] flex flex-col font-mono">
              <div className="bg-[#252526] px-4 py-1 text-[10px] text-gray-400 uppercase font-bold">
                Console Output
              </div>
              <div className="flex-1 p-4 text-sm text-green-400 overflow-y-auto">
                {`> System initialized...`}
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>

      {/* RIGHT PANEL: Chat */}
      <Allotment.Pane preferredSize={400} minSize={200}>
        <div className="h-full bg-[#21252b] p-4 text-white">
          chat logic
        </div>
      </Allotment.Pane>
    </Allotment> );}

    return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e]">
      {/* Active Content Area */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "editor" ? (
          <div className="h-full flex flex-col">
            <CodeEditorClientComponent lessonId={lessonId} />
            {/* We could add a small collapsible terminal here too */}
          </div>
        ) : (
          <div className="h-full bg-[#21252b] p-4 text-white">
            chat logic
          </div>
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