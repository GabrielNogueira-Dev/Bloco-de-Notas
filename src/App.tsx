import { useState,useEffect,useRef, useMemo } from 'react'
import './App.css'

function App() {
  
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});


  const inputRef = useRef<HTMLInputElement>(null)
//const firstrander = useRef(true)

  const [input,setInput] = useState("")
  const [tasks,setTasks] = useState(['Estudar react + Typescript',
    'Comprar pao ao meio dia',
    'Estudar ingles a noite'
  ])

  const [editTask,setEditTask] = useState({
    enable:false,
    tasks: ''
  })
  //Para salvar
useEffect(()=>{
 const salvarNoLocal = localStorage.getItem("@nota")
if(salvarNoLocal){
 setTasks(JSON.parse(salvarNoLocal));

 const savedChecks = localStorage.getItem("@checkstorage");
 if (savedChecks) {
   setCheckedItems(JSON.parse(savedChecks));
 }
}
},[])
//tanto faz um ou outro apenas para minha fixação:
/* | para segundo efect,sempre que sofre alteraçôes
useEffect(()=>{
if(firstrander.current){
firstrander.currente = false return
}
  localStorage.setItem("@nota",JSON.stringify(tasks)
   console.log("UseEffect chamado..")
},[tasks])

*/
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
  
inputRef.current?.focus()

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

const totalTarefas = useMemo (()=>{
  return tasks.length

},[tasks])


function checkf(taskId: string){
  const updated = {
    ...checkedItems,
    [taskId]: !checkedItems[taskId],
  };
  setCheckedItems(updated);
    localStorage.setItem("@checkstorage", JSON.stringify(updated));


}

  return (

      <div className='container'>
        <section className='secadd'>
     <h1 className='title1'>Criando Delete-Edite-Adicionar</h1>
<hr className='hr'/> 
<h1 className='espacar'>Bloco de Notas</h1>
<input className='add' placeholder='Digite uma tarefa'
value={input}
onChange={(e) => setInput(e.target.value)}
ref={inputRef}/>

<button className='butonadd' onClick={handleRegistrar}>{editTask.enable ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
</section>

<strong>Você tem {totalTarefas} tarefas hoje:</strong>
<br/>
 { tasks.map( (item,index)=> (
<section className='secdelete' key={item}>
  <input onChange={()=> checkf(item)} className='check' type="checkbox" id={item} value={item} checked={checkedItems[item] || false}></input>
  
  <span >{item}</span>
  <button  onClick={()=> handleEdite(item)}>Editar</button>
  <button onClick={()=> handleDelete(item)}>Excluir</button>
</section>
 ))}
      </div>
    

  )
}

export default App
