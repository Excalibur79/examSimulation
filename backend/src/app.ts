import express from 'express';

import teacherRoutes from './routes/api/teacher/route';
import studentRoutes from './routes/api/student/route';
import examRoutes from './routes/api/exam/route';

import db from './database/dbConnection';

const app = express();

app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/exam', examRoutes);

//connecting database
db.connect((err) => {
  if (err) throw err;
  else console.log('Database Connected !');
});
//===================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servre started on port ${PORT}`);
});