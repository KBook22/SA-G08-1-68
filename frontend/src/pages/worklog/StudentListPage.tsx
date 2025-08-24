// StudentListPage.tsx
import React from "react";
import "./studentList.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { useState } from 'react'
import "./Modal"
import TimeRecordModal from './Modal'

/*==========================================*/
const students = [
  { id: 1, name: "กิตติพงศ์ ศรีวงศ์" },
  { id: 2, name: "พิชญา รัตนกูล" },
  { id: 3, name: "ธนภัทร มหาพร" },
  { id: 4, name: "ศศิธร พงษ์เจริญ" },
  { id: 5, name: "อนุชา สุวรรณชัย" },
  { id: 6, name: "มานะ วันนี้" },
];

const StudentListPage: React.FC = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

 

  return (
    <div className="page-container">
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <div className="student-left">
              <div className="student-avatar"><IoPersonCircleOutline /></div>
              <div className="student-info">
                <strong>{student.name}</strong>
                <span className="student-detail" >รายละเอียดงาน <FaChevronDown style={{marginBottom:"-3px"}}/></span>
              </div>
            </div>
            <div className="student-right">
              <i className="kebab-icon"><GoKebabHorizontal /></i>
              <button className="save-button"  onClick={handleOpenModal}> บันทึกเวลา</button>
            </div>

            <TimeRecordModal isOpen={isModalOpen} onClose={handleCloseModal} />

          </div>
        ))}
      </div>
    </div>
    
  );
};

export default StudentListPage;