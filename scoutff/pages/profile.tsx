import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
        <div >
            <form  className="border-2">
                <label className="">
                    <input  type="text" name="email" />
                </label>

            </form>
        </div>
    )
  }
  return (
    <div >
      <p>You are not signed in</p>
      <button className="border-" onClick={() => signIn()}>Sign in</button>
    </div>
  )
}