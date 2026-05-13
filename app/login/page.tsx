'use client'

import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthStore } from "../_store/store/auth.store";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const {login} = useAuthStore();

const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
        await login(email, password);
        router.push("/dashboard/students")
    }catch(error){
        setError(`Credenciales invalidas, por favor intenta de nuevo`);
    }finally{
        setLoading(false);
    }
}



  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}