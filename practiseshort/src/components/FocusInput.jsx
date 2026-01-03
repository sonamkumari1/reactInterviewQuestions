import React, { useRef } from 'react'

function FocusInput() {
 const inputRef=useRef()
   return (
     <div>
       <input type='text' ref={inputRef} />
       <button onClick={()=>inputRef.current.focus()}>click</button>
     </div>
   )
}

export default FocusInput
