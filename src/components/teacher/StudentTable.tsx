import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MoreVertical, Mail, RefreshCw, Download, 
  CheckCircle2, Clock, AlertCircle, Eye,
  Filter
} from 'lucide-react';
import { useStudentStore } from '../../hooks/useStudentStore';
import type { Student } from '../../types/teacher';

type Props = {
  searchQuery: string;
  onViewDetails?: (student: Student) => void;
};

export default function StudentTable({ searchQuery, onViewDetails }: Props) {
  const students = useStudentStore((state) => state.students);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Students</h2>
        <div className="flex items-center gap-4">
          {/* Grade Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${selectedGrade === grade
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {grade}
              </button>
            ))}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-gray-200">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <img
                src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`}
                alt={student.name}
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div>
                <h3 className="font-medium text-gray-800">{student.name}</h3>
                <div className="text-sm text-gray-500">
                  {student.grade} Grade • {student.email || 'No email'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Parent Status */}
              <div className={`px-3 py-1 rounded-full flex items-center gap-1
                ${student.parentInviteStatus === 'accepted' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {student.parentInviteStatus === 'accepted' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                <span className="text-sm capitalize">{student.parentInviteStatus}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {onViewDetails && (
                  <button 
                    onClick={() => onViewDetails(student)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {/* Send parent invite */}}
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Students Found
            </h3>
            <p className="text-gray-600">
              {searchQuery || selectedGrade
                ? "No students match your search criteria"
                : "Get started by adding your first student"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}