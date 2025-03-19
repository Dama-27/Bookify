import React, { useState } from 'react';

const TeacherCategoryView = () => {
  const [subjectFilter, setSubjectFilter] = useState('All');
  
  const subjects = ['All', 'Math', 'Science', 'English', 'History', 'Arts'];
  
  const teachers = [
    {
      id: 1,
      name: 'Prof. Lisa Johnson',
      service: 'Mathematics',
      subject: 'Math',
      image: '/path/to/teacher1.jpg'
    },
    {
      id: 2,
      name: 'Mr. Thomas Brown',
      service: 'Physics',
      subject: 'Science',
      image: '/path/to/teacher2.jpg'
    },
    {
      id: 3,
      name: 'Ms. Grace Miller',
      service: 'Literature',
      subject: 'English',
      image: '/path/to/teacher3.jpg'
    },
    {
      id: 4,
      name: 'Dr. Samuel Lee',
      service: 'Biology',
      subject: 'Science',
      image: '/path/to/teacher4.jpg'
    },
    {
      id: 5,
      name: 'Prof. Anna White',
      service: 'World History',
      subject: 'History',
      image: '/path/to/teacher5.jpg'
    },
    {
      id: 6,
      name: 'Ms. Olivia Davis',
      service: 'Visual Arts',
      subject: 'Arts',
      image: '/path/to/teacher6.jpg'
    }
  ];

  const filteredTeachers = subjectFilter === 'All' 
    ? teachers 
    : teachers.filter(teacher => teacher.subject === subjectFilter);

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Education Professionals</h3>
        
        <div className="flex space-x-2">
          {subjects.map(subject => (
            <button
              key={subject}
              className={`px-3 py-1 rounded-md text-sm ${
                subjectFilter === subject 
                  ? 'bg-cyan-400 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSubjectFilter(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 items-center">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-lg p-4 border border-gray-100 items-center">
            <div className="place-items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img 
                  src="/api/placeholder/100/100" 
                  alt={`Teacher ${teacher.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{teacher.name}</h4>
                <p className="text-gray-600">{teacher.service}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {teacher.subject}
              </span>
              <button className="bg-cyan-400 text-white px-4 py-1 rounded-full text-sm hover:bg-cyan-500 transition">
                Book Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCategoryView;