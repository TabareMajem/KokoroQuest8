import { create } from 'zustand';
import type { Student } from '../types/teacher';

type StudentStore = {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  removeStudent: (id: string) => void;
};

export const useStudentStore = create<StudentStore>((set) => ({
  students: [
    {
      id: '1',
      name: 'Sarah Johnson',
      grade: '5th',
      email: 'sarah@example.com',
      parentEmail: 'parent@example.com',
      parentInviteStatus: 'accepted',
      status: 'active',
      scores: {
        victim: 75,
        bystander: 45,
        perpetrator: 20
      },
      lastAssessment: '2024-03-15'
    },
    {
      id: '2',
      name: 'Michael Chen',
      grade: '5th',
      email: 'michael@example.com',
      parentEmail: 'parent2@example.com',
      parentInviteStatus: 'pending',
      status: 'active',
      scores: {
        victim: 30,
        bystander: 80,
        perpetrator: 15
      },
      lastAssessment: '2024-03-14'
    }
  ],
  addStudent: (student) => set((state) => ({
    students: [...state.students, student]
  })),
  updateStudent: (id, data) => set((state) => ({
    students: state.students.map(student =>
      student.id === id ? { ...student, ...data } : student
    )
  })),
  removeStudent: (id) => set((state) => ({
    students: state.students.filter(student => student.id !== id)
  }))
}));