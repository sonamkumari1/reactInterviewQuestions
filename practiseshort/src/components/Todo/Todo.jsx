import React, { useState } from 'react'

function Todo() {
    const [todo,setTodo]=useState("")
    const [list, setList]=useState([])

    const addTodo=()=>{
        setList([...list, todo])
        setTodo(" ")
    }

    const deleteTodo=(_,index)=>{
      setList(list.filter((_,i)=>i !== index))
    }
  return (
    <div>
      <input type='text' value={todo} onChange={(e)=>setTodo(e.target.value)} />
      <button onClick={addTodo}>add</button>

      <ul>
        {
            list.map((item,index)=>(
                <li key={index}>
                    {item}
                    <button onClick={()=>deleteTodo(index)}>delete</button>
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default Todo
