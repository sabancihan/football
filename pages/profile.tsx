import { unstable_getServerSession } from "next-auth"
import { decode, getToken } from "next-auth/jwt"
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import  { useRouter } from "next/router"
import { GetServerSideProps } from "next/types"
import React, { useEffect, useState } from "react"
import { authOptions } from "./api/auth/[...nextauth]"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from '../components/navbar';

interface Props {
  csrfToken: string,
  token: string,
}


export const getServerSideProps : GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(context.req, context.res,authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }





  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}


/*export function navigateToLeaderboards(){
  const router = useRouter()
  router.push('/super')

}*/

export default function LoginButton({ csrfToken } : Props) {




  const router = useRouter()




  const deleteUserData = async () => {
    if (!csrfToken) {
      return
    }

    const res = await fetch('/api/auth/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        csrfToken: csrfToken,
      }),
    })
    const data = await res.json()
    if (data.error) {
    } else {
      //send to login page with router
      router.push('/api/auth/signin')


      
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    const currentTarget = e.currentTarget

   





    //Get name password and email from form
    //currentTarget has property of name, email, password

    const target = e.currentTarget as typeof e.currentTarget & {
      name: { value: string };
      password: { value: string };
    };




    const name = target.name.value
    const password = target.password.value

    // if all of the fields are empty, do nothing
    if (!name  && !password) {
      return
    }





    await signIn("update-account", { name : name,password : password, redirect: false })


    

  }


  const { data: session } = useSession()
  if (session) {
    return (
    <main style={{backgroundColor: "#D3D3D3",height:"100vh"}}>
        <Navbar></Navbar>
        <div className="container" style={{backgroundColor: '#D3D3D3', marginTop: '100px'}}>
        <div style={{marginInlineStart: '425px', marginInlineEnd: '300px'}}>

          <form onSubmit={handleUpdate}>
          <div className="row" style={{borderStyle: 'double', width: '500px'}}>
            <div className="col-xxl-3" style={{margin: '10px'}}>
              <h1 style={{textAlign: 'right', marginTop: '10px', fontSize: '20px'}}>Name:</h1>
            </div>
            <div className="col-xxl-4">
            <input  className="form-control" type="text"  name="name" style={{marginTop: '12px'}} placeholder={session.user?.name ?? "Something is very wrong"} />
            </div>
          </div>


          <div className="row" style={{borderStyle: 'double', width: '500px' }}>
            <div className="col-xxl-3" style={{margin: '10px'}}>
              <h1 style={{textAlign: 'right', marginTop: '10px', fontSize: '20px'}}>Password:</h1>
            </div>
            <div className="col-xxl-4">
              <input  className="form-control" type="password" name="password"  style={{marginTop: '12px'}}  placeholder="************"  />
              
            </div>
          </div>
         

          <input type="hidden" id="csrfToken" name="csrfToken" defaultValue={csrfToken} />

          <input type="submit" value="Save Changes" style={{marginTop: '5px'}}/>

          
          </form>

          <div className="row" style={{borderStyle: 'none'}}>
            <div className="col-xxl-3" style={{margin: '10px'}}>
              <h1 style={{textAlign: 'right', marginTop: '10px', fontSize: '20px'}} />
            </div>
            <div className="col-xxl-5">

              <h1 style={{textAlign: 'left', marginTop: '10px', fontSize: '20px'}} /><button onClick={() => deleteUserData()} className="btn btn-primary" type="button" style={{margin: '10px',backgroundColor:"red"}}>Delete my account</button>
            </div>
            <div className="col" />
          </div>
        </div>
        <div style={{marginLeft: '300px', marginRight: '300px'}} />
      </div>
      </main>
      


    )
  }
  return (
    <div >
      <p>Loading ....</p>
    </div>
  )
}
