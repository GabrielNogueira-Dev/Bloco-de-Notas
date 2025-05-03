import { useState,useEffect } from 'react'
import './App.css'

function App() {
  
  const [input,setInput] = useState("")
  const [tasks,setTasks] = useState(['Estudar react',
    'Comprar pao meio dia',
    'Estudar ingles a noite'
  ])
  const [editTask,setEditTask] = useState({
    enable:false,
    tasks: ''
  })
  
useEffect(()=>{
 const salvarNoLocal = localStorage.getItem("@nota")
if(salvarNoLocal){
 setTasks(JSON.parse(salvarNoLocal))
}
},[])

//primeiro botao = adicionar
  function handleRegistrar(){
if(!input){
  alert("adicione alguma tarefa")
  return
}if(editTask.enable){
  handleSaveEdite();
  return
}
localStorage.setItem("@nota",JSON.stringify([...tasks,input]))
setTasks(tarefas => [...tarefas,input])
setInput("")

  }
//segundo botao = deletar
  function handleDelete(itemdel:string){
const removetarefa = tasks.filter(task => task !== itemdel)
setTasks(removetarefa)
localStorage.setItem("@nota",JSON.stringify(removetarefa))
  }

  //terceiro botao = editar
function handleEdite(itemedit:string){
setInput(itemedit)
setEditTask({
  enable:true,
  tasks:itemedit
})

}
//quarta ainda do botao edite.feito para salvar e editar e nao adicionar novamente. 
function handleSaveEdite(){
/*preciso achar posicao*/

const findIndexTask = tasks.findIndex( task => task === editTask.tasks)
const allTasks = [...tasks]

allTasks[findIndexTask] = input
setTasks(allTasks)

setEditTask({
  enable:false,
tasks:''})
setInput("")
localStorage.setItem("@nota",JSON.stringify(allTasks))
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

<button className='butonadd' onClick={handleRegistrar}>{editTask.enable ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
</section>

 { tasks.map( (item,index)=> (
<section className='secdelete' key={item}>
  <span >{item}</span>
  <button onClick={()=> handleEdite(item)}>Editar</button>
  <button onClick={()=> handleDelete(item)}>Excluir</button>
</section>
 ))}
      </div>
    

  )
}

export default App
