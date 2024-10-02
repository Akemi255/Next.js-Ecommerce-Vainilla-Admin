"use client"
import Editor from './editor';
import { Policies } from '@prisma/client';

interface AboutUsSectionProps {
    initialData?: Policies;
}

export default function PoliciesSection({ initialData }: AboutUsSectionProps) {

    return (
        <>
            <Editor initialData={initialData} />
        </>
    )

}
