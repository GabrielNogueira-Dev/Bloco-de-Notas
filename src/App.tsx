import { useState } from 'react'
import './App.css'

function App() {
const [tasks,setTasks] = useState(['Estudar react',
  'Comprar pao meio dia',
  'Estudar ingles a noite'
])

  return (

      <div className='container'>
     <h1 className='title1'>Criando Delete-Edite-Adicionar</h1>

<hr className='hr'/> 
<h1 className='espacar'>Bloco de Notas</h1>
<input className='add' placeholder='Digite uma tarefa'/>
 { tasks.map( (item,index)=> (
<section key={item}>
  <span >{item}</span>
</section>
 ))}
      </div>
    

  )
}

export default App
