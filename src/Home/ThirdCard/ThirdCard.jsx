import React, { Component } from 'react';
import './ThirdCardStyle.css';

class TabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  handleTabClick = (tabNumber) => {
    this.setState({ activeTab: tabNumber });
  };

  renderTimeline() {
    const hours = Array.from({ length: 24 }, (_, i) => (i < 12 ? `${i + 1}am` : `${i - 11}pm`));
  
    return (
      <div className="timeline">
      {hours.map((hour, index) => (
        <div key={hour} className="hour">
          {hour}
          {index < hours.length - 1 && <div className="timeline-line"></div>}
        </div>
      ))}
    </div>
    );
  }

  render() {
    const tabLabels = ['Today', 'Tomorrow', '2023-09-07', '2023-09-08', '2023-09-09'];


    return (

        <div className="calender_View">
          <div className="tab-buttons">
            {tabLabels.map((label, index) => (
              <p
                key={label}
                onClick={() => this.handleTabClick(index)}
                className={this.state.activeTab === index ? 'active date_container' : 'date_container'}
              >
                {label}
              </p>
            ))}
          </div>
          <div className="tab-content">
            {this.state.activeTab !== null && (
              <div>
                <h2>This is {tabLabels[this.state.activeTab]}</h2>
                {this.renderTimeline()}
                <div className="todo-card-container">
                  {this.props.todos
                    .filter((todo) => todo.date === tabLabels[this.state.activeTab])
                    .map((todo, index) => (
                      <div key={index} className="todo-card">
                        {/* Render your to-do card here */}
                        <h5 className='type'>{todo.category}</h5>
                        <div>
                          <h3>{todo.text}</h3>
                          <h4 className='date'>{todo.date}</h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
    );
  }
}

export default TabView;
