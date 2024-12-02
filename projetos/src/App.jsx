import './App.css'
import { db } from './firebaseConnection'
import { doc, collection, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'

function App() {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [telefone, setTelefone] = useState('')
  const [lista, setListas] = useState([])

  //adicionar cliente 
  async function Cadastro() {
    const docRef = addDoc(collection(db, 'cliente'), {
      nome: nome,
      idade: idade,
      telefone: telefone,

    })
      .then(() => {
        alert('Cliente adicionado!')
        setNome('')
        setIdade('')
        setTelefone('')
      })
      .catch((error) => {
        alert('Erro' + error)
      })
  }


  //Listar clientes 
  useEffect(() => {
    //cria a function
    async function ListarClientes() {
      //define a nova variavel
      let NovaLista = []
      // chamar onSnapshot passando o snapshot
      const docRef = onSnapshot(collection(db, 'cliente'), (snapshot) => {
        //percorrer a lista usando o forEach
        snapshot.forEach((doc) => {
          //adicionando os itens a nova variavel com o push 
          NovaLista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            telefone: doc.data().telefone,

          })
        })
        setListas(NovaLista)
      })
    }
    ListarClientes()
  }, [])



  return (
    <>
      <h1>Formulário de Cadastro</h1>

      <h4>Nome :</h4>
      <input type="text" placeholder='Digite o nome...' value={nome} onChange={(e) => setNome(e.target.value)} />

      <h4>Idade :</h4>
      <input type="text" placeholder='Digite a idade...' value={idade} onChange={(e) => setIdade(e.target.value)} />

      <h4>Telefone :</h4>
      <input type="text" placeholder='Digite o telefone...' value={telefone} onChange={(e) => setTelefone(e.target.value)} />

      <button onClick={Cadastro}>Cadastrar</button>
      <hr />
      <h1>Lista dos Clientes Cadastrado </h1>
      {lista.map((item) => {
        return (
          <div>
            <h4>{item.id}</h4>
            <h4>{item.nome}</h4>
            <h4>{item.idade}</h4>
            <h4>{item.telefone}</h4>
          </div>
        )
      })}
    </>
  )
}

export default App
