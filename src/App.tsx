import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TablaReservas } from './components/TablaReservas';
import { ModalRegistro } from './components/ModalRegistro';
import { HistorialPasadas } from './components/HistorialPasadas';
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
      // const data = await reservasApi.obtenerActivas();
      // setReservas(data);

      setReservas([
        { id_estudiante: '10111111', nombre: 'Estudiante 1', carrera: 'ISC', laboratorio: 'REDES', fecha_hora: '2026-03-24T15:00:00Z' },
        { id_estudiante: '11123123', nombre: 'Estudiante 2', carrera: 'ISC', laboratorio: 'Computación', fecha_hora: '2026-03-24T16:00:00Z' },
      ]);
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
    // await reservasApi.crearReserva(nuevaReserva);
    setReservas([...reservas, nuevaReserva]);
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