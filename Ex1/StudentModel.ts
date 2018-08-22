enum StudentGrade {
  HD = 85,
  D = 75,
  C = 65,
  P = 50,
  F = 0
}

interface Student {
  name: string;
  age: number;
  studentId: string;
  grade: StudentGrade;
}
