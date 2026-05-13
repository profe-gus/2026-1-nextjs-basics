"use client"
import studentService from "@/app/services/student.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

 interface StudentForm {
        name:string;
        age:number;
        email:string;
        gender:string;
}

export default function EditarEstudiantePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const [student, setStudent] = useState<StudentForm>({
        name:"",
        age:0,
        email: "",
        gender: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(()=> {
        if(id){
            const fetchStudent = async () => {
                try{
                    const data = await studentService.getById(id);
                    setStudent({
                        name: data.name,
                        age: data.age,
                        email: data.email,
                        gender: data.gender
                    });
                }catch(error){
                    console.error(`Error al obtener los datos del estudiante`, error)
                } finally {
                    setLoading(false);
                }
            };
            fetchStudent();
        }
    },[id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === "age"){
            setStudent(prev => ({...prev, [name]: Number(value)}));
        }else {
            setStudent(prev => ({...prev, [name]: value}));
        }
    }

    const handleSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault();
        if(!id) return;
        setUpdating(true);
        try{
            await studentService.update(id, student);
            alert("Los datos se han actualizado correctamente.");
            router.push("/dashboard/students")
        }catch(error){
            console.log(`Error al actualizar datos del estudiante`, error);
        } finally { 
            setUpdating(false);
        }
    }

   if (loading) return <div className="flex justify-center items-center min-h-screen">Cargando estudiante...</div>

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-slate-200 p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-4">Editar estudiante</h1>
        <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 block">Nombre:</label>
            <input 
                type="text"
                id="name"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="age" className="text-gray-700 block">Edad:</label>
            <input 
                type="text"
                id="age"
                name="age"
                value={student.age}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 block">Correo electronico:</label>
            <input 
                type="text"
                id="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="gender" className="text-gray-700 block">Genero:</label>
            <select 
                name="gender" 
                id="gender"
                value={student.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="">Seleccione un valor</option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
            </select>

        </div>
        <button
            type="submit"
            disabled={updating}
            className="w-full bg-slate-700 text-white p-2 rounded disabled:opacity-50"
            >{updating ? "Actualizando" : "Actualizar"}</button>
      </form>
    </div>
  );
}