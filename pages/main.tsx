import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from '../components/navbar';
import Saha from '../components/saha';


export default function Main() {
    return(
        
        <main style={{backgroundColor: "#D3D3D3",height:"100vh"}}>
            
            <Navbar></Navbar>

            <div><Saha></Saha></div>




        </main>

        )
  }