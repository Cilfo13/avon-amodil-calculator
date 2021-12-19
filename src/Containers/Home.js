import { useState } from 'react';
import Avon from '../Components/Avon';
import Amodil from '../Components/Amodil';
import "./Home.css"
const Home = () => {
    const [changeMode, setChangeMode] = useState(true);
    const cambiarEstado = ()=>{
            setChangeMode(!changeMode)
    }
    return(
        <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"center"}}>
                <h3 style={{margin:"30px", color:"#800f2f"}} >Avon</h3>
                <div>
                    <label style={{marginTop:"30px"}} className="switch">
                        <input type="checkbox" onChange={cambiarEstado}></input>
                        <span className="slider round"></span>
                    </label>
                </div>
                <h3 style={{margin:"30px", color:"#800f2f"}}>Amodil</h3>
            </div>
            
            {
                changeMode ? <Avon/> : <Amodil/>
            }
        </div>
    )
}
export default Home;