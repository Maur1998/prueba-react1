import { useEffect, useState } from "react"

export const Buscador = ({info, setInfoFiltrada}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInfoFiltrada(info.filter((res) => res.name.includes(input)))
  },[input]);



  return (
    <>
      <form className="d-flex justify-content-center">
        <input type="text" className="input form-control" placeholder="Buscar Pókemon" value={input} onChange={(e) => setInput(e.target.value)}/>
      </form>
    </>
  )
}
