import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TablaReservas } from './components/TablaReservas';
import { ModalRegistro } from './components/ModalRegistro';
import { HistorialPasadas } from './components/HistorialPasadas';
import { reservasApi } from './api/cliente';
import type { Reserva } from './types';

// Definimos los tipos de vistas posibles
type Vista = 'activas' | 'pasadas';

function App() {
  const [vistaActual, setVistaActual] = useState<Vista>('activas');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  const cargarReservas = async () => {
    setCargandoDatos(true);
    try {
      // Llamada real a tu API en AWS para traer datos de DynamoDB
      const data = await reservasApi.obtenerActivas();
      setReservas(data || []);
    } catch (error) {
      alert('Error al cargar las reservas activas');
    } finally {
      setCargandoDatos(false);
    }
  };

  useEffect(() => {
    if (vistaActual === 'activas') {
      cargarReservas();
    }
  }, [vistaActual]);

  const handleCrearReserva = async (nuevaReserva: Reserva) => {
    // Guardamos en DynamoDB a través de API Gateway
    await reservasApi.crearReserva(nuevaReserva);
    // Recargamos la lista desde la base de datos para ver el nuevo registro
    await cargarReservas();
  };

  return (
    <div className="app-container">
      <Header onVerPasadasClick={() => setVistaActual('pasadas')} />

      {vistaActual === 'activas' ? (
        <>
          {cargandoDatos ? (
            <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando reservas...</p>
          ) : (
            <TablaReservas
              reservas={reservas}
              onAgregarClick={() => setIsModalOpen(true)}
            />
          )}

          {isModalOpen && (
            <ModalRegistro
              onClose={() => setIsModalOpen(false)}
              onSave={handleCrearReserva}
            />
          )}
        </>
      ) : (
        <HistorialPasadas onVolver={() => setVistaActual('activas')} />
      )}
    </div>
  );
}

export default App;