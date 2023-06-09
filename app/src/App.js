import './App.css'
import React, { useEffect, useState } from 'react';
import { api } from './Services/api';
import {FaRegTrashAlt} from "react-icons/fa"


function App() {
  const [Carregando, setCarregando] = useState(false)
  const [Atividades, setAtividades] = useState();
  const [novaAtividade, setnovaAtividade] = useState('');
  const [novoValor, setnovoValor] = useState();
  const [Editando, setEditando] = useState(false);

  const valorInput = (e) => {
    setnovaAtividade(e.target.value);
  };

  const pegarAtividade = async () => {
    try {
        const res = await api.get("/")
        setAtividades(res.data)
        setCarregando(true)
        console.log(res.data)
        
    }
    catch (erro){
      console.log(erro)
    }
  }

  // const pegarAtividadeId = async (_id) => {
  //   try{
  //     const id = item._id
  //     const data = {
  //       _id: id
  //     }
  //     console.log(id)
  //     const res = await api.get("/", data)
  //     }

  //   catch (erro){
  //     console.log(erro)
  //   }
  // }

  const adicionarAtividade = async (_id) => {
    try {
      const data = {
        descricao: novaAtividade
      };
      const res = await api.post("/", data);
      console.log(res)
      setnovaAtividade('');

  }
    catch (erro){
      console.log(erro)
    }
    
    setnovaAtividade('');
  };

  const delAtividade = async (_id) => {
    try {
      console.log(_id)
      
      const res = await api.delete("/"+_id);
      console.log(res)
  }
    catch (erro){
      console.log(erro)
    }

  };

  //  const editarAtividade = async (_id, novoValor) => {
  //   try {
  //     setEditando(true)
  //     console.log(Editando)
  //     const res = await api.patch("/"+_id, novoValor);
  //     console.log(res)
      
  // }
  //   catch (erro){
  //     console.log(erro)
  //   }
  // }
    
  //   const Update = (_id) => {
  //     return (
  //       <li>
  //         <input onChange={valorInput} value={novaAtividade} type="text"/>
  //         <button onClick={() => editarAtividade(_id, valorInput)}>Salvar</button>
  //       </li>
  //     );

  //   }
  
  
    
  
  useEffect(() => {
    pegarAtividade()
  },
  [adicionarAtividade, delAtividade])


  return (
    <main >
      <div className='container'>
        <div className='container-titulo'>
          <h1>Task List</h1>
        </div>
        <div className='container-form'>
          <input type="text" value={novaAtividade} onChange={valorInput} placeholder='O que deseja fazer hoje? ' />
          <button onClick={adicionarAtividade}>Adicionar</button>
        </div>
        <div className='container-listaTarefas'>
          <h2>Lista de tarefas</h2>
        </div>
        <div className='container-mostrarTarefas'>

        {Carregando === true?(
          Atividades?.map((item, index) => (
          <div className='container-mostrarTarefas-list' key={index}>
            <div key={index} className="container-mostrarTarefas-list-atividades">
                <p>{item.descricao}</p>
            </div>
            <div className='container-mostrarTarefas-list-bttn'>
              <FaRegTrashAlt onClick={() => delAtividade(item._id)}/>
            </div>
          </div>
          ))
            
        ):(
          <h1>Carregando</h1>
        )}

        </div>
      </div>  
    </main>

    
  );
}

export default App;


