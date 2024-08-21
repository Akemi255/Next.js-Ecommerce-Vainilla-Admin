"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/actions/email-actions";
import toast from "react-hot-toast";

export default function VerifyEmailBox({
    searchParams,
    message,
    email
}: {
    searchParams: { token: string, email?: string },
    message: boolean,
    email: string | undefined
}) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [displayMessage, setDisplayMessage] = useState<string | null>(null);
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        if (message) {
            setLoadingButton(true)
            setDisplayMessage("Correo electrónico verificado exitosamente, será redireccionado.");
            setTimeout(() => {
                router.push("/")
            }, 3000);
        }

        setLoading(false);
    }, [message, router]);

    const sendEmail = async () => {
        const emailToSend = searchParams.email || email;

        if (!emailToSend) {
            setDisplayMessage("No se proporcionó un correo electrónico.");
            return;
        }

        try {
            await sendVerificationEmail(emailToSend);
            setDisplayMessage("Correo de verificación enviado.");
            toast.success("Correo de verificación enviado");
        } catch (error) {
            setDisplayMessage("Algo salió mal al enviar el correo.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h1 className="text-2xl font-semibold mb-4">Verifique su correo electrónico</h1>

                {loading ? (
                    <p className="text-gray-600">Verificando...</p>
                ) : (
                    <p className={`mb-6 ${displayMessage?.includes('problema') ? 'text-red-500' : 'text-green-500'}`}>
                        {displayMessage}
                    </p>
                )}

                <Button
                    disabled={loadingButton}
                    onClick={sendEmail}
                    className="mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Enviar correo de verificación
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
