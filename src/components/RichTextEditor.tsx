"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { ArchiveX, Bold, ChevronUp, Heading2, Italic, List, ListOrdered, Quote, Redo2, UnderlineIcon, Undo2 } from "lucide-react";


import { JSX, useCallback } from "react";

type RichTextEditorProps = {
  content: string;
  onChange: (html: string) => void;
};

const MenuButton = ({
  onClick,
  isActive,
  icon,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  icon: JSX.Element;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg transition-all duration-200 hover:bg-primary/10 ${isActive
      ? "bg-primary text-white shadow-sm"
      : "text-primary/70 hover:text-primary"
      }`}
  >
    {icon}
  </button>
);

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      ImageExtension.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full mx-auto" },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 hover:opacity-80",
        },
      }),
      Placeholder.configure({
        placeholder: "Começa a escrever o teu artigo...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] px-6 py-4 focus:outline-none text-primary",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("URL de la imagen:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL del enlace:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-primary/20 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-primary/10 bg-primary/5">
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          icon={<Undo2 />}
          title="Desfazer"
        />
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          icon={<Redo2 />}
          title="Refazer"
        />

        <div className="w-px h-6 bg-primary/15 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon={<Bold />}
          title="Negrito"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon={<Italic />}
          title="Itálico"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          icon={<UnderlineIcon />}
          title="Sublinhado"
        />

        <div className="w-px h-6 bg-primary/15 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          icon={<Heading2 />}
          title="Título H2"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          icon={<Heading2 />}
          title="Título H3"
        />

        <div className="w-px h-6 bg-primary/15 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          icon={<List />}
          title="Lista"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          icon={<ListOrdered />}
          title="Lista ordenada"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          icon={<Quote />}
          title="Citação"
        />

        <div className="w-px h-6 bg-primary/15 mx-1" />

        {/* <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          icon="lucide:align-left"
          title="Alinhar esquerda"
        />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          icon="lucide:align-center"
          title="Centralizar"
        />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          icon="lucide:align-right"
          title="Alinhar direita"
        />

        <div className="w-px h-6 bg-primary/15 mx-1" />

        <MenuButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          icon="lucide:link"
          title="Link"
        />
        <MenuButton
          onClick={addImage}
          isActive={false}
          icon="lucide:image"
          title="Imagem"
        />

        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          isActive={false}
          icon="lucide:minus"
          title="Linha horizontal"
        /> */}

      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
