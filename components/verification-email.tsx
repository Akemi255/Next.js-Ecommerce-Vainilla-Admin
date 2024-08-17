
const VerificationEmail = ({ verificationLink, email }: { verificationLink: string; email: string }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', color: '#333', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#f6f6f6', padding: '20px' }}>
                <div style={{ backgroundColor: '#fff', maxWidth: '600px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '24px', margin: '0 0 20px' }}>Verifica tu correo electrónico</h1>
                        <p style={{ fontSize: '16px', marginBottom: '40px', color: '#555' }}>
                            Hola, <strong>{email}</strong>.<br />
                            Gracias por registrarte. Para completar tu registro, por favor verifica tu dirección de correo electrónico haciendo clic en el botón de abajo.
                        </p>
                        <a href={verificationLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#4CAF50', color: '#fff', padding: '12px 24px', fontSize: '16px', borderRadius: '4px', textDecoration: 'none' }}>
                            Verificar mi correo
                        </a>
                    </div>
                    <div style={{ backgroundColor: '#f6f6f6', padding: '20px', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#888' }}>
                            Si no solicitaste este correo, puedes ignorarlo de manera segura.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationEmail;
