import React from 'react';

interface HeaderProps {
    onVerPasadasClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onVerPasadasClick }) => {
    return (
        <header style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Asumimos que tienes el logo en la carpeta public/ */}
                <img src="/logo-pucmm.png" alt="Logo PUCMM" style={{ height: '50px' }} />

                <button
                    onClick={onVerPasadasClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#009688',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Registros Pasados
                </button>
            </div>

            <h1 style={{ textAlign: 'center', marginTop: '20px', color: '#333' }}>
                Reservas de Laboratorio- EICT
            </h1>
        </header>
    );
};