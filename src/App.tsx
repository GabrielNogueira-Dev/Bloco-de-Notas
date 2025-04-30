import { useState } from 'react'
import './App.css'

function App() {
  const [input,setInput] = useState("")
  const [tasks,setTasks] = useState(['Estudar react',
    'Comprar pao meio dia',
    'Estudar ingles a noite'
  ])

  function handleRegistrar(){
if(!input){
  alert("adicione alguma tarefa")
  return
}
setTasks(tarefas => [...tarefas,input])
setInput("")
  }

  function handleDelete(itemdel:string){
const removetarefa = tasks.filter(task => task !== itemdel)
setTasks(removetarefa)
  }

  return (

      <div className='container'>
        <section className='secadd'>
     <h1 className='title1'>Criando Delete-Edite-Adicionar</h1>
<hr className='hr'/> 
<h1 className='espacar'>Bloco de Notas</h1>
<input className='add' placeholder='Digite uma tarefa'
value={input}
onChange={(e) => setInput(e.target.value)}/>

<button className='butonadd' onClick={handleRegistrar}>Adicionar Tarefa</button>
</section>

 { tasks.map( (item,index)=> (
<section className='secdelete' key={item}>
  <span >{item}</span>
  <button onClick={()=> handleDelete(item)}>Excluir</button>
</section>
 ))}
      </div>
    

  )
}

export default App
