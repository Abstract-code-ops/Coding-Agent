import React from 'react'
import { Allotment } from 'allotment'
import CodeEditorClientComponent from './codeEditorClientComponent'
import { Terminal } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

interface EditorPaneProps {
    lessonId: string;
    output: string[];
    setOutput: React.Dispatch<React.SetStateAction<string[]>>;
}


export const Console = ({ output, setOutput }: { output: string[], setOutput: React.Dispatch<React.SetStateAction<string[]>> }) => {
    return (
        <div className="h-full bg-[#1e1e1e] border-t border-[#2d2d2d] flex flex-col font-mono">
            {/* Console Header */}
            <div className="bg-[#252526] px-4 py-1 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Console Output</span>
            <Button className="cursor-pointer text-red-500 active:scale-95" variant="outline" size="sm" onClick={() => setOutput(["System initialized..."])}>
                Clear
            </Button>
            </div>

            {/* Output Area */}
        
            <ScrollArea className="p-3 flex-1 w-full rounded-md border border-[#2d2d2d] bg-[#1e1e1e]">
                <div className="p-4 text-sm text-green-400 selection:bg-green-900 overflow-x-auto">
                {output.map((line, index) => (
                    <div key={index} className="mb-1 leading-relaxed whitespace-pre-wrap">
                        <span className="mr-2 opacity-50 select-none">{">"}</span>
                        {line}
                    </div>
                    ))
                }
                </div>
            </ScrollArea>
        </div>
    );
    };

const EditorPane = (
    { lessonId, output, setOutput }: EditorPaneProps
) => {
    console.log("Editor Pane")

  return (

    <Allotment.Pane className='h-full' minSize={300}>
        <Allotment vertical>
            <Allotment.Pane minSize={200}>
                <CodeEditorClientComponent lessonId={lessonId} setOutput={setOutput} />
            </Allotment.Pane>
            
            <Allotment.Pane preferredSize={200} minSize={100}>
                <div className="h-full bg-[#1e1e1e] border-t border-[#2d2d2d] flex flex-col font-mono">
                    <div className="bg-[#252526] px-4 py-1 text-[10px] text-gray-400 uppercase font-bold flex items-center">
                        <Terminal className="mr-2" size={16} /> Terminal
                    </div>
                    <div className="flex-1 p-4 text-sm text-green-400 overflow-y-auto">
                        <Console output={output} setOutput={setOutput} />
                    </div>
                </div>
            </Allotment.Pane>
        </Allotment>
    </Allotment.Pane>
  )
}

export default EditorPane