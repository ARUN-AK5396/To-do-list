import React, { useState, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { BsFillTagsFill } from 'react-icons/bs';
import { LiaComments } from 'react-icons/lia';
import Middle_card from './MiddleCard/Middle_card';
import ThirdCard from './ThirdCard/ThirdCard';
import './HomeScreenStyles.css';

function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Simulate fetching todos from somewhere (e.g., localStorage)
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Function to calculate the total number of tasks for a given category
  const getTotalTasksByCategory = (category) => {
    return todos.filter((todo) => todo.category === category).length;
  };

  // Function to filter todos by date
  const filterTodosByDate = (date) => {
    return todos.filter((todo) => todo.date === date);
  };

  const tabLabels = ['Today', 'Tomorrow', '2023-09-07', '2023-09-08', '2023-09-09'];

  return (
    <div className="main_container">
      <div className="first_column_container">
        <div className="general_container">
          <h6 className="line">.</h6>
          <div className="top_container">
            <h2 className="text_header">General</h2>
            <h5 className="text_sub_header">
              {getTotalTasksByCategory('General')} Tasks
            </h5>
          </div>
        </div>
        <div className="general_container">
          <h6 className="line1">.</h6>
          <div className="top_container">
            <h2 className="text_header">Meeting</h2>
            <h5 className="text_sub_header">
              {getTotalTasksByCategory('Meeting')} Tasks
            </h5>
          </div>
        </div>
        <div className="general_container">
          <h6 className="line2">.</h6>
          <div className="top_container">
            <h2 className="text_header">Trips</h2>
            <h5 className="text_sub_header">
              {getTotalTasksByCategory('Trips')} Tasks
            </h5>
          </div>
        </div>
        <div className="create_new_group">
          <div className="icon_container">
            <IoIosAdd size={30} />
          </div>
          <h3>Create New Group</h3>
        </div>
        <div className="action_container">
          <div className="row1">
            <div className="today_container">
              <div className="icon1_container">
                <AiFillStar size={22} />
              </div>
              <h4>Today</h4>
            </div>
            <div className="tomorrow_container">
              <div className="icon2_container">
                <BsCalendarDate size={20} />
              </div>
              <h4>Tomorrow</h4>
            </div>
          </div>
          <div className="row2">
            <div className="bottom_icon_container">
              <AiOutlineCalendar size={24} color="#04bab4" />
            </div>
            <div className="bottom_icon_container">
              <HiOutlineBellAlert size={24} color="#fc6304" />
            </div>
            <div className="bottom_icon_container">
              <BsFillTagsFill size={24} color="#0ab6fa" />
            </div>
            <div className="bottom_icon_container">
              <LiaComments size={24} color="#ea0afa" />
            </div>
          </div>
        </div>
        <div className="bottom_container">
          <h3 className="txt1">Design</h3>
          <h3 className="txt2">Home</h3>
          <h3 className="txt3">Add tag</h3>
        </div>
      </div>
      <div className="second_column_container">
        <Middle_card />
      </div>
      <div className="third_column_container">
        <ThirdCard
          todos={filterTodosByDate(tabLabels[activeTab])}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="final_container">.</div>
      <div className="final_container">.</div>
    </div>
  );
}

export default HomeScreen;
