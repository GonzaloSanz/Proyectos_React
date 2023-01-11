import { useEffect, useState } from 'react';

import Header from './components/Header';
import Button from './components/Button';
import { formatearDinero, calcularTotalPagar } from './helpers/index.js';

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(calcularTotalPagar(cantidad, meses));
  const [pago, setPago] = useState(0);

  useEffect(() => {
    setTotal(calcularTotalPagar(cantidad, meses));
  }, [cantidad, meses]);

  useEffect(() => {
    setPago(total / meses);
  }, [total]);

  const min = 0;
  const max = 20000;
  const step = 100;

  function handleChange(e) {
    setCantidad(Number(e.target.value));
  }

  function handleClickDecremento() {
    const valor = cantidad - step;

    if(valor < min) {
      Swal.fire({
        title: 'Error',
        text: 'La cantidad seleccionada no es válida',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Volver',
        showConfirmButton: true,
      });

      return;
    }

    setCantidad(valor);
  }

  function handleClickIncremento() {
    const valor = cantidad + step;

    if(valor > max) {
      Swal.fire({
        title: 'Error',
        text: 'La cantidad seleccionada no es válida',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Volver',
        showConfirmButton: true,
      });

      return;
    }

    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />

      <div className='flex justify-between my-6'>
        <Button 
          operador='-'
          funcion={handleClickDecremento}

        />
        <Button 
          operador='+'
          funcion={handleClickIncremento}
        />
      </div>

      <input type='range' className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600' min ={min} max={max} step={step} value={cantidad} onChange={handleChange}></input>
    
      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>{formatearDinero(cantidad)}</p>
    
      <h2 className='text-2xl font-extrabold text-gray-500 text-center mt-16'>
        Elige un <span className='text-indigo-600'>Plazo</span> a pagar
      </h2>

      <select className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500' value={meses} onChange={ e => setMeses(Number(e.target.value))}>
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className='mt-9 space-y-3 bg-gray-50 p-5 rounded-md'>
        <h2 className='text-2xl font-extrabold text-gray-500 text-center mb-5'>
          Resumen <span className='text-indigo-600'>de pagos</span>
        </h2>

        <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a Pagar</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Mensuales</p>

      </div>

    </div>
  );
}

export default App;
