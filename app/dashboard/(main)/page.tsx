"use client"
import { Result, User } from "@/app/interfaces/user-response.interface";
import userService from "@/app/services/user.service";
import { useEffect, useState } from "react";

export default function MainPage() {

  const [users, setUsers] = useState<Result[]>([]);



  useEffect(() => {

    const getUsers = async () => {
      try{
        const userResponse = await userService.getUsers();
        setUsers(userResponse.results)
      }catch(error){
        console.log(error)
      }
    }

    getUsers();
  }, [])

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible">

            <table className="table border-separate space-y-6 text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3">Nombre completo</th>
                  <th className="p-3">Genero</th>
                  <th className="p-3">Direccion</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Celular</th>
                  <th className="p-3">Foto</th>
                </tr>
              </thead>
              <tbody>
                {
                    users ? users.map(user => (
                      <tr>
                        <td className="p-3">{user.name.first}</td>
                        <td className="p-3">Masculino</td>
                        <td className="p-3">Calle falsa 123</td>
                        <td className="p-3">gus@mail.com</td>
                        <td className="p-3">3123456789</td>
                        <td className="p-3">http://foto.com</td>
                      </tr>
                    )): ""
                  }
                
              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>
  );
}