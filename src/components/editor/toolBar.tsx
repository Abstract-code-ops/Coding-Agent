import { Button } from '../ui/button'
import { Play, Brackets, Download } from 'lucide-react';
import Link from 'next/link'

interface ToolBarProps {
  lessonId: string;
  onDownload: () => void;
  onRename: () => void;
  onClear: () => void;
}

const ToolBar = ({ lessonId, onDownload, onClear, onRename }: ToolBarProps) => {
  return (
    <div className='flex items-center justify-between pl-3 pr-4 py-2 text-sm text-white bg-[#21252b] border-b border-gray-900'>
      <div className="flex items-center gap-1">
        {/* Always Visible */}
        <Button
          variant="link"
          className='text-white cursor-pointer border border-white h-8 px-2 text-xs mr-2'
          asChild
        >
          <Link
            href="/lessons"
          >
            {"< "} Back
          </Link>
        </Button>
      </div>

      {/* DESKTOP ACTION ITEMS: DOWNLOAD, RENAME */}
      <div className="hidden min-[426px]:flex items-center gap-2">
        <Button className='bg-transparent border border-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition-colors cursor-pointer h-8' onClick={onDownload}>
          Download
        </Button>
        <Button className='bg-transparent border border-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition-colors cursor-pointer h-8' onClick={onRename}>
          Rename
        </Button>
      </div>

      {/* MOBILE ACTION ITEMS: DOWNLOAD, RENAME */}
      <div className="flex min-[426px]:hidden items-center gap-2">
        <Button className='bg-transparent border border-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition-colors cursor-pointer h-8' onClick={onDownload}>
          <Download size={16} />
        </Button>
        <Button className='bg-transparent border border-gray-600 rounded-md hover:bg-gray-600 hover:text-white transition-colors cursor-pointer h-8' onClick={onRename}>
          <Brackets size={16} />
        </Button>
      </div>

      {/* DESKTOP ACTION BUTTONS: Hidden at 425px and below */}
      <div className="hidden min-[426px]:flex items-center gap-2">
        <Button 
          className='bg-transparent border border-red-600 rounded-md hover:bg-red-600 
                    hover:text-white transition-colors cursor-pointer h-8'
          onClick={onClear}
          >
          Clear Code
        </Button>
        <Button className='bg-transparent border border-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors cursor-pointer h-8'>
          Run Code
        </Button>
      </div>

      {/* MOBILE ACTION BUTTONS: Visible at 425px and below */}
      <div className="flex min-[426px]:hidden items-center gap-2">
        <Button 
            className='bg-transparent border border-red-600 rounded-md hover:bg-red-600 
                          hover:text-white transition-colors cursor-pointer h-8'
            onClick={onClear}>
          Clear Code
        </Button>
        <Button className='bg-transparent border border-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors cursor-pointer h-8'>
          <Play size={16} />
        </Button>
      </div>
    </div>
  )
}

export default ToolBar