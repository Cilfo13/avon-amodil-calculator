import { useState } from 'react';
import BotonDeBorrar from './BotonDeBorrar';
import "./Avon.css"
const Avon = () =>{
    const [descuento, setDescuento] = useState(20);
    const [producto, setProducto] = useState('')
    const [precio, setPrecio] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [productosTotales, setProductosTotales] = useState([])
    const [total, setTotal] = useState(0)
    const [error, setError] = useState("")


    const handleChangeCantidad = (e) =>{
        setCantidad(e.target.value)
    }

    const handleChangeDescuento = (event) => {
        console.log(event.target.value)
        setDescuento(event.target.value);
    };

    const handleChangeProducto = (e) =>{
        let productoAAgregar = e.target.value
        console.log(productoAAgregar)
        setProducto(productoAAgregar)
    }

    const handleChangePrecio = e =>{
        let precioAAgregar = e.target.value
        console.log(precioAAgregar)
        setPrecio(precioAAgregar)
    }
    const validarProducto = (objeto) =>{
        const {product, price, cant} = objeto
        if(product.length <= 0){
            throw new Error("Debe ponerle un nombre el producto")
        }
        if(price <= 0){
            throw new Error("Debe ponerle un precio el producto")
        }
        if(cant <= 0){
            throw new Error("Debe haber al menos un producto")
        }
    }
    const cerrarError = () =>{
        setError("")
    }
    const agregarElemento = event =>{
        event.preventDefault()
        let productosDelEstado = productosTotales
        let objetoAAgregar = {
            product : producto,
            price: precio*cantidad,
            discount: descuento,
            cant: cantidad
        }
        try {
            validarProducto(objetoAAgregar)
            productosDelEstado.push(objetoAAgregar)
            let totalActual = total
            let totalActualizado = totalActual + ((objetoAAgregar.price) * objetoAAgregar.discount)/100
            setTotal(totalActualizado)
            setProductosTotales(productosDelEstado)
            setError("")
        } catch (error) {
            setError(error.message)
        }finally{
            setPrecio("")
            setProducto("")
            setCantidad("")
        }
    }
    return(
        <div style={{display:"flex",justifyContent:"center", alignItems: "center", flexDirection: "column"}} >
            <h1  style={{color:"#800f2f", display:"flex",justifyContent:"center"}}>Avon calculator</h1>
            {
                error.length > 0 &&
                <p onClick={cerrarError} className='mensajeDeError' style={{visibility: error.length > 0 ? "visible" : "hidden", cursor:"pointer"}}>Ocurrio un error! {error} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </p>
            }
            
            <div style={{display:"flex",justifyContent:"center"}} className="divContainerAvon">
                <form style={{display:"flex",justifyContent:"center", flexDirection: "column", width:"90%"}}>
                    <label className='labelForInput'>Producto</label>
                    <input className='inputStyle' required placeholder='Producto' value={producto} onChange={handleChangeProducto}></input>

                    <label className='labelForInput'>Precio</label>
                    <input type="number" className='inputStyle' required placeholder='Precio' value={precio} onChange={handleChangePrecio}></input>

                    <label className='labelForInput'>Cantidad</label>
                    <input type="number" className='inputStyle' required placeholder='Cantidad' value={cantidad} onChange={handleChangeCantidad}></input>

                    <label className='labelForInput'>Descuento</label>
                    <select className='select-css' required value={descuento}  onChange={handleChangeDescuento}>
                        <option value="20" defaultValue>Hogar</option>
                        <option value="25">Belleza</option>
                    </select>

                    <button onClick={agregarElemento} className='buttonForm' type='submit'>Agregar</button>
                </form>
            </div>
            <div className='containerTable' >
            <table style={{width:"95%"}} className="tabla">
            <colgroup>
                <col class="column1"></col>
                <col class="columns2plus3" span="2"></col>
            </colgroup>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Ganancia</th>
                <th>Cant</th>
                <th>Borrar</th>
            </tr>
            {
                productosTotales.map(prod => {
                    let ganancia = (prod.price * prod.discount)/100
                        return(
                                <tr key={prod.product}>
                                    <td>{prod.product}</td>
                                    <td>{prod.price}</td>
                                    <td>{ganancia}</td>
                                    <td>{prod.cant}</td>
                                    <td><BotonDeBorrar nombre={prod.product} productosTotales={productosTotales} setProductosTotales={setProductosTotales} total={total} setTotal={setTotal}/>
                                    </td>
                                </tr>
                        )
                    })
            }
            <tr>
                <th>Total de Ganancia = {total}</th>
            </tr>
        </table>
            </div>
            
        </div>
    )
}

export default Avon;