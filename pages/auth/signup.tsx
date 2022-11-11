import { InferGetServerSidePropsType } from "next"
import { CtxOrReq } from "next-auth/client/_utils"
import {  getSession, signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export default function SignUp({  }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [errorMessages, setErrorMessages] = useState<string>("")

    const router = useRouter()


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    

    const target = e.currentTarget as typeof e.currentTarget & {
      email: { value: string }
      password: { value: string }
      passwordConfirm: { value: string }
      name: { value: string }
    }


    if (target.password.value !== target.passwordConfirm.value) {
      setErrorMessages("Passwords do not match")
      return
    }


    const result = await signIn('register',
    {
      redirect: false,
      email: target.email.value,
      name: target.name.value,
      password: target.password.value,
    })

    if (result && result.error) {
      setErrorMessages(result.error)

    } else {
      router.push('/profile')
    }

 
  

    


  }
 


    return (
        <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>CS308-Register-Sprint0</title>
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css?h=f1a8fe9e98944b9d682ec5c3efac8f17" />
        
        <div className="container">
          {/* Start: Login Form Basic */}
          <section className="position-relative py-4 py-xl-5">
            <div className="container">
              <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <h2>Register</h2>
                  <p className="w-lg-50" />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                  <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                      <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                      </div>
                      <form onSubmit={handleFormSubmit} className="text-center" method="post">
                        <div className="mb-3"><input required className="form-control" type="text" name="name" placeholder="Name" /></div>
                        <div className="mb-3"><input required className="form-control" type="email" name="email" placeholder="Email" /></div>
                        <div className="mb-3"><input required className="form-control" type="password" name="password" placeholder="Password" /></div>
                        <div className="mb-3"><input required className="form-control" type="password" name="passwordConfirm" placeholder="Confirm Password" /></div>
                        
                        <div className="mb-3"><button  className="btn btn-primary d-block w-100" type="submit">Register</button></div>
                      </form>
                      <Link href="/auth/signin">
                        <a className="text-decoration-none">Already have an account? Sign in</a>
                      </Link>
                      {errorMessages && <div className="text-danger">{errorMessages}</div>}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End: Login Form Basic */}
        </div>
      </div>
    )

    
}

export  const getServerSideProps = async (context : CtxOrReq  ) => {
    const session = await getSession(context)


    
    if (session) {
        return {
        redirect: {
            destination: '/main',
            permanent: false,
        },
        }
    }
    
    return {
        props: {  },
    }
    }
