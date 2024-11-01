"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { LexicalEditor } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import ToolbarPlugin from "@/plugins/toolbar-plugin";
import EditorTheme from "@/theme/editor-theme";
import { OnChangePlugin } from "@/plugins/onChange-plugin";
import { Policies } from "@prisma/client";

import { Button } from "@/components/ui/button";

const editorConfig = {
    namespace: "MyEditor",
    theme: EditorTheme,
    onError(error: Error) {
        console.error(error);
    },
};

interface EditorProps {
    initialData?: Policies
}

export default function Editor({ initialData }: EditorProps) {
    const [editorState, setEditorState] = useState<LexicalEditor | null>(null);
    const [loading, setloading] = useState(false);


    // Función que se llama cuando el editor cambia
    function onChange(editorState: LexicalEditor) {
        setEditorState(editorState);
    }

    // Función para obtener el texto normal del estado del editor
    const getPlainText = (editorState: any): string => {
        const json = editorState.toJSON();
        const extractText = (node: any): string => {
            let text = '';
            if (node.children) {
                node.children.forEach((child: any) => {
                    text += extractText(child);
                });
            }
            if (node.type === 'text' && node.text) {
                text += node.text;
            } else if (node.type === 'paragraph') {
                text += '<br />'
            }
            return text;
        };
        return extractText(json.root);
    };

    // Función para guardar el contenido
    const handleSave = async () => {
        if (editorState) {
            try {
                setloading(true)
                const plainText = getPlainText(editorState);
                const response = await axios.post('/api/policies', {
                    text: plainText,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    toast.success('Contenido guardado');
                } else {
                    throw new Error('Error al guardar el contenido');
                }
            } catch (error) {
                toast.error('Ups... algo salió mal');
                console.error(error);
            }
            finally {
                setloading(false)
            }
        } else {
            toast.error('No hay contenido para guardar');
        }
    };

    const formatTextWithParagraphs = (text: string) => {

        const formattedText = text.replace(/(<br \/>)+/g, '<br />').trim();

        return formattedText.split(/<br \/>+/).map((line, index) => (
            line.trim() ? (
                <p key={index}>
                    {line}
                </p>
            ) : <br key={index} />
        ));
    };

    return (
        <>
            <LexicalComposer initialConfig={editorConfig}>
                <h1 className='text-center text-[30px] font-bold mt-3'>Texto de la sección</h1>
                <div className="editor-container rounded-lg shadow-sm p-4">
                    <ToolbarPlugin />
                    <div className="editor-inner">
                        <RichTextPlugin
                            placeholder={<span className="editor-placeholder">{initialData?.text && formatTextWithParagraphs(initialData.text) || "Escribe aquí"}</span>}
                            contentEditable={<ContentEditable className="editor-input p-1 border rounded-lg" />}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin />
                        <AutoFocusPlugin />
                        <OnChangePlugin onChange={onChange} />
                    </div>
                </div>
            </LexicalComposer>
            <div className="flex justify-center">
                <Button onClick={handleSave} disabled={loading}>Actualizar cambios</Button>
            </div>
        </>
    );
}
