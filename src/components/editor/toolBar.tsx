import React from 'react'
import { useRef } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useLessonStore } from '@/lib/store/useLessonStore';

interface ToolBarProps {
  lessonId: string;
  onClear: () => void;
  onDownload: () => void;
  onSave: () => void;
  onAdd?: () => void;
  onRename: () => void;
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { upload?: boolean; lessonId?: string }
>(({ className, title, children, upload, lessonId, ...props }, ref) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const addFile = useLessonStore((state) => state.addFileToLesson)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, lessonId: string) => {
    console.log("file upload triggered")
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const newFile = {
        id: crypto.randomUUID(),
        name: file.name,
        content: content
      }
      addFile(lessonId, newFile)
    }
    reader.readAsText(file);
  }

  return (
    <li>
        {upload ? (
          <div className='relative'>
            <div
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-gray-700 transition-colors",
                className
              )}
              onClick={() => inputRef.current?.click()}
            >
              <div className="text-sm font-medium leading-none text-gray-200">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                {children}
              </p>
            </div>
            <input 
              type="file" 
              className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
              ref={inputRef}
              onChange={(e) => handleFileUpload(e, lessonId || "")}
            />
          </div>
        ):(
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-gray-700 transition-colors",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none text-gray-200">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-gray-400">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      )}
    </li>
  )
})
ListItem.displayName = "ListItem"

const ToolBar = ({ lessonId, onClear, onDownload, onSave, onAdd, onRename }: ToolBarProps) => {
  return (
    <div className='flex items-center justify-between px-6 py-2 text-sm text-white bg-[#21252b] border-b border-gray-900'>
        <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem> 
                  <NavigationMenuTrigger className="h-8 bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white data-[state=open]:bg-gray-700 focus:bg-gray-700">
                    File
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-gray-700 bg-[#21252b]">
                    <ul className="grid w-50 gap-1 p-2 bg-[#21252b] text-white border border-gray-700 rounded-md">
                      <ListItem href="#" title="New File" onClick={onAdd} />
                      <ListItem href="#" title="Open File" upload={true} lessonId={lessonId} />
                      <ListItem href="#" title="Save" onClick={onSave} />
                      <ListItem href="#" title="Download" onClick={onDownload} />
                      <ListItem href="#" title="Rename" onClick={onRename} />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-8 bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white data-[state=open]:bg-gray-700 focus:bg-gray-700">
                    Edit
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-gray-700 bg-[#21252b]">
                    <ul className="grid w-[200px] gap-1 p-2 bg-[#21252b] text-white border border-gray-700 rounded-md">
                      <ListItem href="#" title="Undo" />
                      <ListItem href="#" title="Redo" />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
        </div>
        <div className="flex items-center gap-2 mr-4">
            <Button className='bg-transparent border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors cursor-pointer'
            onClick={onClear}
            >
                Clear All
            </Button>
            <Button className='bg-transparent border border-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors cursor-pointer'
            >
                Run Code
            </Button>
        </div>
    </div>
  )
}

export default ToolBar