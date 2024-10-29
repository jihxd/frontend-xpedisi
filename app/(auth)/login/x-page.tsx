import LoginForm from './_components/login-form'
import { Image as ImageIcon } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-background lg:grid lg:grid-cols-2">
      <div className="relative hidden items-center justify-center bg-muted lg:flex lg:max-h-screen">
        <ImageIcon className="h-32 w-32 opacity-30" />
      </div>

      <LoginForm />
    </div>
  )
}
