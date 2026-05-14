'use client'

import { useState } from "react";
import { useAuthStore } from "../_store/store/auth.store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { login } = useAuthStore();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            router.push("/dashboard/students")
        } catch (error) {
            setError(`Credenciales invalidas, por favor intenta de nuevo`);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="bg-slate-700 min-h-screen flex items-center justify-center text-slate-300 selection:bg-blue-600 selection:text-slate-100">

            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Dash<span className="text-blue-500">Students</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your student's application</p>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-lg font-semibold mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm text-slate-400 mb-1">Email</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-200 text-slate-900 placeholder-slate-500 border border-gray-500 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                                placeholder="email@mail.com"
                                />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="w-full bg-slate-200 text-slate-900 placeholder-slate-500 border border-gray-500 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                required
                                placeholder="********"
                                />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 disabled:cursor-not-allowed font-semibold py-2 px-4 rounded text-sm transition-colors"
                        >
                            Ingresar
                        </button>

                    </form>

                </div>

            </div>


        </div>
    );
}