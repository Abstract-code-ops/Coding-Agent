"use client";

import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@uiw/react-codemirror';
import { indentUnit } from '@codemirror/language';

const fontSizeTheme = EditorView.theme({
  '&': {
    fontSize: '16px',
  },
  '.cm-content': {
    fontFamily: 'Fira Code, monospace',
    fontSize: '16px',
  },
  '.cm-gutters': {
    fontSize: '14px',
  },
});

interface EditorProps {
  onChange: (value: string) => void;
  code: string
}

export default function Editor({ onChange, code }: EditorProps) {

  return (
    <div className="">
      <CodeMirror
        value={code}
        height="100vh"
        theme={oneDark}
        extensions={[
          python(),
          indentUnit.of("    "),
          fontSizeTheme
        ]}
        onChange={onChange}
      />
    </div>
  );
}