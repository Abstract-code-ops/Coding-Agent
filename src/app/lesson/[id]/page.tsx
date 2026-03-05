"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import GlobalAlert from '@/components/shared/GlobalAlertListener';

// Dynamically import the entire layout wrapper
const ResizableEditorLayout = dynamic(
  () => import('@/components/editor/resizableCodeEditor'),
  { 
    ssr: false,
    loading: () => <div className="h-screen w-full bg-[#1e1e1e] animate-pulse" /> 
  }
);

interface PageProps {
    params: Promise<{ id: string }>
}

export default function Page({ params }: PageProps) {
    const { id } = React.use(params);

    return (
        <div className='w-full h-screen overflow-hidden'>
            <ResizableEditorLayout lessonId={id} />
            <GlobalAlert />
        </div>
    );
}