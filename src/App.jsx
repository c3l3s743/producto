import { Component } from 'react'
import axios from 'axios';
import './App.css'

export default class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      categoria_id: "",
      productos:[],
      categorias:[]
    }
  }

  buscarCategorias(){
   //const url = "https://productos.ctpoba.edu.ar/api/categorias"
   const url = "http://10.0.4.103:3000/api/categorias"
   
    axios.get(url)
    .then((resp) => {
      this.setState({categorias: resp.data.categorias})
    })
    .catch((error) => {
      console.log(error)
    })
  }

    buscarProductos(categoria_id){
      const url = "http://10.0.4.103:3000/api/productos"
      const config={
    params:{categoria_id}
    }
    axios.get(url, config)
      .then((resp) => {
        this.setState({productos: resp.data.productos})
      })
      .catch((error) => {
        console.log(error)
      })
      
    
  }

render(){
  return (
  <div>
    <span>APP</span>
  <input type="button" 
    value="Buscar Categorias"
    onClick={() => this.buscarCategorias()} />

   <input type="button" 
    value="Buscar Productos"
    onClick={() => this.buscarProductos(this.state.categoria_id)} />

  <select 
    value={this.state.categoria_id}
    onChange={(e)=> this.setState ({categoria_id:e.target.value})}
  >
    {
      this.state.categorias.map((categoria,index)=>
      <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)
    }
  </select>
  <h3>{this.state.categoria_id}</h3>
  {this.state.productos.map((productos, index)=>
    <span key={productos.id}> {productos.nombre}</span>)}
  </div> 

  )
}

}