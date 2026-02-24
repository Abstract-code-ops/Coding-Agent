import CodeEditorClientComponent from '@/components/editor/codeEditorClientComponent'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function Page({
    params
}: PageProps
) {

    const { id } = await params

  return (
    <div>
        <CodeEditorClientComponent lessonId={id} />
    </div>
  )
}