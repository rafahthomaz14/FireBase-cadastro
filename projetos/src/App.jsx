import React, { useState, useEffect } from 'react'
import { db } from './FirebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
function App() {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [telefone, setTelefone] = useState('')
  const [listas, setListas] = useState([])
  const [editCliente, setEditCliente] = useState('')

  //Listar clientes 
  useEffect(() => {
    async function ListarClientes() {
      const docRef = onSnapshot(collection(db, 'cliente'), (snapshot) => {
        let todasLista = []

        snapshot.forEach((doc) => {
          todasLista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            telefone: doc.data().telefone,
          })
        })

        setListas(todasLista)
      })

    }
    ListarClientes()
  }, [])



  // Cadastrar clientes
  async function cadastro() {
    await addDoc(collection(db, 'cliente'), {
      nome: nome,
      idade: idade,
      telefone: telefone,

    })
      .then(() => {
        toast.success('Cliente cadastrado!')
        setNome('')
        setIdade('')
        setTelefone('')
      })
      .catch((error) => {
        alert('Erro' + error)
      })
  }

  //Editar Clientes
  async function Edit() {
    const docRef = doc(db, 'cliente', editCliente)
    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      telefone: telefone,
    })
      .then(() => {
        toast.success('Cliente atualizado !')
        setEditCliente('')
        setNome('')
        setIdade('')
        setTelefone('')
      })
      .catch((error) => {
        toast.danger('Erro' + error)
      })
  }

  //Remover Clientes
  async function Remover(id) {
    const docRef = doc(db, 'cliente', id)
    await deleteDoc(docRef)
      .then(() => {
        toast.success('Cliente Removido!')
      })
      .catch((error) => {
        toast.danger('Erro' + error)
      })
  }


  return (
    <div className='container'>
      <ToastContainer autoClose={3000} />
      <div className="row">
        <div className="form col-lg-4  col-sm-12">
          <h3>Formulário</h3>

          <h5>Id do Cliente : </h5>
          <input type="text" placeholder='Selecione o ID para Editar ...' value={editCliente} onChange={(e) => setEditCliente(e.target.value)} />

          <h5>Nome :</h5>
          <input type="text" placeholder='Digite o Nome ...' value={nome} onChange={(e) => setNome(e.target.value)} />

          <h5>Idade :</h5>
          <input type="text" placeholder='Digite ...' value={idade} onChange={(e) => setIdade(e.target.value)} />

          <h5>Telefone :</h5>
          <input type="text" placeholder='Digite o Telefone ...' value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          <button className='botao mt-3' onClick={cadastro}>Cadastrar</button>
          <button className='botao' onClick={Edit}>Editar</button>
        </div>
        <div className="col-lg-8  col-sm-12">
          <h3>Lista de Clientes</h3>
          <div className="table-container">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listas.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.idade} anos</td>
                    <td>{item.telefone}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => Remover(item.id)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App
