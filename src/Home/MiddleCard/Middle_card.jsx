import React, { Component } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { IoIosAdd } from 'react-icons/io';

import './middlecardStyles.css';

class Middle_card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], 
      isPopupOpen: false, 
      newTodo: {
        date: '',
        category: '',
        text: '',
      },
      editingTodo: null,
    };
  }

  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupOpen: !prevState.isPopupOpen,
    }));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newTodo: {
        ...prevState.newTodo,
        [name]: value,
      },
    }));
  };

  addTodo = () => {
    const { date, category, text } = this.state.newTodo;
    if (date && category && text) {
      const newTodoItem = { date, category, text };
      this.setState((prevState) => ({
        todos: [...prevState.todos, newTodoItem],
        isPopupOpen: false, 
        newTodo: {
          date: '',
          category: '',
          text: '',
        },
      }));
      localStorage.setItem('todos', JSON.stringify([...this.state.todos, newTodoItem]));
      alert('To-do successfully added!');
    }
  };

  editTodo = (todo) => {
    this.setState({
      editingTodo: { ...todo },
    });
  };
  
  updateTodo = () => {
    const { todos, editingTodo } = this.state;
    const updatedTodos = todos.map((todo) =>
      todo === editingTodo ? { ...editingTodo } : todo
    );
    this.setState({ todos: updatedTodos, editingTodo: null }, () => {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    });
  };
  componentDidMount() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.setState({ todos: JSON.parse(storedTodos) });
    }
  }

  closePopup = () => {
    this.setState({ isPopupOpen: false });
    alert('Pop-up closed!');
  };

  render() {
    const { todos,isPopupOpen, newTodo,editingTodo } = this.state;
    const displayedTodos = todos.slice(0, 3);

    return (
      <div className='main_view'>
        <div className="top_card_container">
          {displayedTodos.map((todo, index) => (
            <div key={index} className="todo-card">
              <div className="edit_icon" onClick={() => this.editTodo(todo)}>
                <FiEdit2 size={22} />
              </div>
              <h5 className='type'>{todo.category}</h5>
              <div>
                <h3>{todo.text}</h3>
                <h4 className='date'>{todo.date}</h4>
              </div>
            </div>
          ))}

          {editingTodo && (
            <div className="todo-card">
              {/* Edit form for the to-do */}
              <input
                type="date"
                name="date"
                value={editingTodo.date}
                onChange={(e) =>
                  this.setState({
                    editingTodo: { ...editingTodo, date: e.target.value },
                  })
                }
                placeholder="Date"
              />
              <select
                name="category"
                value={editingTodo.category}
                onChange={(e) =>
                  this.setState({
                    editingTodo: { ...editingTodo, category: e.target.value },
                  })
                }
              >
                <option value="">Select Category</option>
                <option value="Meeting">Meeting</option>
                <option value="Trip">Trip</option>
                <option value="General">General</option>
                <option value="Reading">Reading</option>
              </select>
              <input
                type="text"
                name="text"
                value={editingTodo.text}
                onChange={(e) =>
                  this.setState({
                    editingTodo: { ...editingTodo, text: e.target.value },
                  })
                }
                placeholder="To-do Text"
              />
              <button onClick={this.updateTodo}>Update To-do</button>
            </div>
          )}
        </div>

        <div className="bottom_card_container">
          <div className="create_new_group_col2" onClick={this.togglePopup}>
            <div className="icon_container">
              <IoIosAdd size={30} />
            </div>
            <h3>Add new To-do</h3>
          </div>
        </div>

        {isPopupOpen && (
          <div className="popup">
            <button className="close-btn" onClick={this.closePopup}>
              X
            </button>
            <h3>Add New To-do</h3>
            <input
              type="date"
              name="date"
              value={newTodo.date}
              onChange={this.handleInputChange}
              placeholder="Date"
            />
            <select
              name="category"
              value={newTodo.category}
              onChange={this.handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Meeting">Meeting</option>
              <option value="Trip">Trip</option>
              <option value="General">General</option>
              <option value="Reading">Reading</option>
            </select>
            <input
              type="text"
              name="text"
              value={newTodo.text}
              onChange={this.handleInputChange}
              placeholder="To-do Text"
            />
            <button onClick={this.addTodo}>Add To-do</button>
          </div>
        )}
      </div>
    );
  }
}

export default Middle_card;
