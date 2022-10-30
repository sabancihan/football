import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function LoginButton() {


  const router = useRouter()


  const deleteUserData = async () => {
    const csrfToken = await getCsrfToken()

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
      console.log(data.error)
    } else {
      //send to login page with router
      router.push('/api/auth/signin')


      
    }
  }


  const { data: session } = useSession()
  if (session) {
    return (
    <main style={{backgroundColor: "#D6FFF6",height:"100vh"}}>
      <nav className="navbar navbar-light navbar-expand-md py-3" style={{backgroundColor: '#6D6A75'}}>
      
      <div className="container"><a className="navbar-brand d-flex align-items-center" href="#"><span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
              <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
              <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z" />
            </svg></span><span>Scoutff</span></a><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-2"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
        <div className="collapse navbar-collapse" id="navcol-2" style={{backgroundColor: '#6D6A75'}}><input type="search" style={{/*position: 'absolute', *//*alignSelf: 'center', *//*alignItems: 'center', *//*textAlign: 'center', */marginLeft: '400px'}} />
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown show"><a className="dropdown-toggle nav-link" aria-expanded="true" data-bs-toggle="dropdown" href="#">Me&nbsp;</a>
              <div className="dropdown-menu show" data-bs-popper="none"><a className="dropdown-item" href="#">Profile</a><a className="dropdown-item" href="#">Messages</a><a className="dropdown-item" href="#">Privacy &amp; Security</a></div>
            </li>
            <li className="nav-item"><a className="nav-link" href="#">⭐ Favourite Players&nbsp;</a></li>
            <li onClick={() => signOut()} className="nav-item"><a className="nav-link" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
      

      </nav>
      <div className="container" style={{backgroundColor: '#D6FFF6', marginTop: '100px'}}>
        <div style={{marginLeft: '300px', marginRight: '300px'}}>
          <div className="row" style={{borderStyle: 'double'}}>
            <div className="col-xxl-3">
              <h1 style={{textAlign: 'right', marginTop: '10px', fontSize: '20px'}}>Email:</h1>
            </div>
            <div className="col-xxl-5">
              <h1 style={{textAlign: 'left', marginTop: '10px', fontSize: '20px'}}>{session.user?.email}</h1>
            </div>
            <div className="col"><button className="btn btn-primary" type="button" style={{margin: '10px'}}>Change email</button></div>
          </div>
          <div className="row" style={{borderStyle: 'double'}}>
            <div className="col-xxl-3" style={{margin: '10px'}}>
              <h1 style={{textAlign: 'right', marginTop: '10px', fontSize: '20px'}}>Password:</h1>
            </div>
            <div className="col-xxl-5">
              <h1 style={{textAlign: 'left', marginTop: '10px', fontSize: '20px'}}>****************</h1>
            </div>
            <div className="col"><button className="btn btn-primary" type="button" style={{margin: '10px'}}>Change password</button></div>
          </div>
          <div className="row" style={{borderStyle: 'double'}}>
            <div className="col-xxl-3">
              <h1 style={{textAlign: 'right', marginTop: '10px', fontSize: '20px'}}>Favorite Team:</h1>
            </div>
            <div className="col-xxl-4">
              <h1 style={{textAlign: 'left', marginTop: '10px', fontSize: '20px'}}>Tuzlaspor</h1>
            </div>
          </div>
          <div className="row" style={{borderStyle: 'none'}}>
            <div className="col-xxl-3" style={{margin: '10px'}}>
              <h1 style={{textAlign: 'right', marginTop: '10px', fontSize: '20px'}} />
            </div>
            <div className="col-xxl-5">
              <h1 style={{textAlign: 'left', marginTop: '10px', fontSize: '20px'}} /><button onClick={() => deleteUserData()} className="btn btn-primary" type="button" style={{margin: '10px'}}>Delete my account</button>
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
      <p>You are not signed in</p>
    </div>
  )
}