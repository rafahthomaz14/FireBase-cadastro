import './App.css'
import { db } from './firebaseConnection'
import { doc, collection, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'

function App() {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [telefone, setTelefone] = useState('')


  //adicionar cliente 
  async function Cadastro() {
    const docRef = addDoc(collection(db,'cliente'),{
      nome:nome,
      idade:idade,
      telefone:telefone,

    })
    .then(()=>{
      alert('Cliente adicionado!')
      setNome('')
      setIdade('')
      setTelefone('')
    })
    .catch((error)=>{
      alert('Erro' + error)
    })
  }
  return (
    <>
      <h1>Formulário de Cadastro</h1>

      <h4>Nome :</h4>
      <input type="text" placeholder='Digite o nome...' value={nome} onChange={(e)=>setNome(e.target.value)} />
    
      <h4>Idade :</h4>
      <input type="text" placeholder='Digite a idade...' value={idade} onChange={(e)=>setIdade(e.target.value)} />

      <h4>Telefone :</h4>
      <input type="text" placeholder='Digite o telefone...' value={telefone} onChange={(e)=>setTelefone(e.target.value)} />

      <button onClick={Cadastro}>Cadastrar</button>
    </>
  )
}

export default App
