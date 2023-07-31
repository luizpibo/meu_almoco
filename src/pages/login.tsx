import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [view, setView] = useState('sign-in')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        setView('check-email')
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await supabase.auth.signInWithPassword({
            email,
            password,
        })
        router.push('/')
        router.refresh()
    }

    return (
        <>
            <Link href="/">Back</Link>
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 bg-zinc-900 rounded-lg shadow-lg py-4">
                {view === 'check-email' ? (
                    <p className="text-center">
                        Confirme seu <span className="font-bold">{email}</span>.
                    </p>
                ) : (
                    <form
                        className="flex-1 flex flex-col w-full justify-center gap-2"
                        onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}
                    >
                        <label className="text-md" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-6"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="email@example.com"
                        />
                        <label className="text-md" htmlFor="password">
                            Senha
                        </label>
                        <input
                            className="rounded-md px-4 py-2 bg-inherit border mb-6"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="••••••••"
                        />
                        {view === 'sign-in' && (
                            <>
                                <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                                    Login
                                </button>
                                <p className="text-sm text-center">
                                    Não tem conta?
                                    <button
                                        className="ml-1 underline"
                                        onClick={() => setView('sign-up')}
                                    >
                                        Cadastro.
                                    </button>
                                </p>
                            </>
                        )}
                        {view === 'sign-up' && (
                            <>
                                <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                                    Cadastrar
                                </button>
                                <p className="text-sm text-center">
                                    Já possui conta?
                                    <button
                                        className="ml-1 underline"
                                        onClick={() => setView('sign-in')}
                                    >
                                        Login
                                    </button>
                                </p>
                            </>
                        )}
                    </form>
                )}
            </div>
        </>
    )
}