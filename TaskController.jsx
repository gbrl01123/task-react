var React = require('react');



var Task = React.createClass({

    getInitialState: function () {
        return { doneState: false };
    },

    handleCheck: function() {
        this.setState({doneState: !this.state.doneState});
    },

    render: function() {
        var description = this.props.description;
        var done = this.state.doneState;
        return (
            <tr>
                <td>{description}</td>
                <td>{done ? "Done" : "To-do"}</td>
                <td><input type="checkbox" checked={done} onChange={this.handleCheck} /></td>
            </tr>
        );
    }

});



var TaskTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.tasks.forEach(function(task) {
            rows.push(<Task description={task.description} /> );
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});



var TaskAdder = React.createClass({
    getInitialState: function() {
        return {
            inputText : "Add a task..."
        };
    },

    handleAdd: function() {
        this.props.addHandler(this.refs.addInput.getDOMNode().value);
    },

    render: function() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Add a task..."
                    ref="addInput">
                </input>
                <button onClick={this.handleAdd}>+</button>
            </form>
        );
    }
});



var TaskController = React.createClass({
    getInitialState: function() {
        return {
            newTasks : [],
        };
    },

    handleTaskAdd: function(taskDescription) {
        var allTasks = this.state.newTasks;
        allTasks.push({description: taskDescription, done: false});

        this.setState({
            newTasks : allTasks
        });
    },

    render: function() {
        return (
            <div>
                <TaskAdder addHandler={this.handleTaskAdd} />
                <TaskTable tasks={this.state.newTasks} />
            </div>
        );
    }
});



module.exports = TaskController;