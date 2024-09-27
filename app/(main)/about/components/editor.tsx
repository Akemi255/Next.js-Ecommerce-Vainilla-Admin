"use client"

import { useState } from "react"
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Editor() {
    const [text, setText] = useState("")
    const [selection, setSelection] = useState({ start: 0, end: 0 })
    const [textColor, setTextColor] = useState("#000000")

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement
        setSelection({ start: target.selectionStart, end: target.selectionEnd })
    }

    const applyFormatting = (format: string) => {
        const before = text.substring(0, selection.start)
        const selected = text.substring(selection.start, selection.end)
        const after = text.substring(selection.end)

        let formattedText = ""
        switch (format) {
            case "bold":
                formattedText = `${before}**${selected}**${after}`
                break
            case "italic":
                formattedText = `${before}*${selected}*${after}`
                break
            case "underline":
                formattedText = `${before}_${selected}_${after}`
                break
            case "bullet-list":
                formattedText = `${before}\n- ${selected}${after}`
                break
            case "numbered-list":
                formattedText = `${before}\n1. ${selected}${after}`
                break
            case "h1":
                formattedText = `${before}\n# ${selected}${after}`
                break
            case "h2":
                formattedText = `${before}\n## ${selected}${after}`
                break
            case "h3":
                formattedText = `${before}\n### ${selected}${after}`
                break
            default:
                formattedText = text
        }

        setText(formattedText)
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextColor(e.target.value)
        const colorCode = e.target.value.slice(1)
        applyFormatting(`color-${colorCode}`)
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => applyFormatting("bold")}
                    aria-label="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => applyFormatting("italic")}
                    aria-label="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => applyFormatting("underline")}
                    aria-label="Underline"
                >
                    <Underline className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => applyFormatting("bullet-list")}
                    aria-label="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => applyFormatting("numbered-list")}
                    aria-label="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="Headings">
                            <Heading1 className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => applyFormatting("h1")}>
                            <Heading1 className="h-4 w-4 mr-2" /> Heading 1
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => applyFormatting("h2")}>
                            <Heading2 className="h-4 w-4 mr-2" /> Heading 2
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => applyFormatting("h3")}>
                            <Heading3 className="h-4 w-4 mr-2" /> Heading 3
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative">
                    <input
                        type="color"
                        value={textColor}
                        onChange={handleColorChange}
                        className="sr-only"
                        id="text-color"
                    />
                    <label htmlFor="text-color" className="cursor-pointer">
                        <Button variant="outline" size="icon" aria-label="Text Color">
                            <Palette className="h-4 w-4" />
                        </Button>
                    </label>
                </div>
            </div>
            <Textarea
                value={text}
                onChange={handleTextChange}
                onSelect={handleSelect}
                placeholder="Escribe aquí"
                className="min-h-[300px] text-lg leading-relaxed resize-y"
                aria-label="Text editor content"
            />
        </div>
    )
}