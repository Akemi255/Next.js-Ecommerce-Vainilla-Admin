"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { verificateAccount } from "@/actions/auth-actions";
import { sendVerificationEmail } from "@/actions/email-actions";

export default function VerifyEmailPage({ searchParams }: {
    searchParams: { token: string, email: string };
}) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const verifyAccount = async () => {
            if (searchParams.token && searchParams.email) {
                setLoading(true);
                const result = await verificateAccount(searchParams.token, searchParams.email);
                if (result.success) {
                    setMessage("Correo electrónico verificado exitosamente cierre esta ventana.");
                }
                setLoading(false);
            }
        };

        verifyAccount();
    }, [searchParams]);

    const sendEmail = async () => {
        try {
            await sendVerificationEmail(searchParams.email);
            setMessage("Correo de verificación enviado.");
        } catch (error) {
            setMessage("Algo salió mal al enviar el correo.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h1 className="text-2xl font-semibold mb-4">Verifique su correo electrónico</h1>

                {loading ? (
                    <p className="text-gray-600">Verificando...</p>
                ) : (
                    <p className={`mb-6 ${message?.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}

                <Button
                    onClick={sendEmail}
                    className="mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Reenviar correo de verificación
                </Button>
                <Button
                    onClick={() => { router.push("/login") }}
                    className="w-full py-2 px-4 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
                >
                    Volver al inicio
                </Button>
            </div>
        </div>
    );
}
