import { create } from "zustand";
import { Student, StudentStore } from "../interfaces/types";
import studentService from "@/app/services/student.service";

export const useStudentStore = create<StudentStore>()((set) => ({
    student:[],
    getStudent: async(limit:number, offset: number = 1) => {
        const student: Student[] = await studentService.getall(limit, offset);
        return set((state) => ({...state, student})) 
    }
}))

