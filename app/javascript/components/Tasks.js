import React from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            subtodos: [],
            inputValue: '',
            subInputValue: '',
            powerLevel: 10,
            subPowerLevel: 10,
            attackDmg: 10
        }
        this.handleChange = this.handleChange.bind(this)
    }

    getTodos() {
        axios.get('/api/v1/todos')
        .then(response => {
            this.setState({todos: response.data})
        })
        .catch(error => console.log(error))
    }

    getSubTodos() {
        axios.get('/api/v1/subtodos')
        .then(response => {
            this.setState({subtodos: response.data})
        })
        .catch(error => console.log(error))
    }

    createTodo = (e) => {
        if (e.key ==='Enter') {
            axios.post(`/api/v1/todos`, {todo: {title: this.state.inputValue, health: 100, power: this.state.powerLevel} })
            .then(response => {
                const todos = update(this.state.todos, {
                    $splice: [[0, 0, response.data]]
                })
            this.setState({
                todos: todos,
                inputValue: '',
                powerLevel: 10
            })
        })
        .catch(error => console.log(error))
        }
    }

    createSubTodo = (e, id) => {
        if (e.key ==='Enter') {
            axios.post(`/api/v1/subtodos`, {subtodo: {todo_id: id, title: this.state.subInputValue, health: 100, power: this.state.subPowerLevel} })
            .then(response => {
                const subtodos = update(this.state.subtodos, {
                    $splice: [[0, 0, response.data]]
                })
            this.setState({
                subtodos: subtodos,
                subInputValue: '',
                subPowerLevel: 10
            })
        })
        .catch(error => console.log(error))
        }
    }

    updateTodo = (e, id) => {
        axios.put(`/api/v1/todos/${id}`, {todo: {done: e.target.checked}})
        .then(response => {
            const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
            const todos = update(this.state.todos, {
                [todoIndex]: {$set: response.data}
            })
            this.setState({
                todos: todos
            })
        }).catch(error => console.log(error))
    }

    attackTodo = (id, dmg) => {
        axios.put(`/api/v1/todos/${id}`, {todo: {health: dmg}})
        .then(response => {
            const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
            let todos = update(this.state.todos, {
                [todoIndex]: {$set: response.data}
            })
            console.log(this.state.todos[todoIndex].health - 10)
            if(this.state.todos[todoIndex].health - 10 <= 0){
                this.deleteTodo(this.state.todos[todoIndex].id)
            }
            this.setState({
                todos: todos
            })
        })
        .catch(error => console.log(error))
    }

    deleteTodo = (id) => {
        axios.delete(`/api/v1/todos/${id}`)
        .then(response => {
            const todoIndex = this.state.todos.findIndex(x => x.id === id)
            const todos = update(this.state.todos, {
                $splice: [[todoIndex, 1]]
            })
            this.setState({
                todos: todos
            })
        })
        .catch(error => console.log(error))
    }


    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    }

    componentWillMount() {
        this.getTodos()
        this.getSubTodos()
    }

    render() {
        return (
            <div>
                <h1>Task Defender</h1>
                <form className="inputContainer">
                    Task:
                    <input 
                        name="inputValue"
                        type="text" 
                        placeholder="Spawn a task" 
                        maxLength="50" 
                        onKeyPress={this.createTodo}
                        value={this.state.inputValue} 
                        onChange={this.handleChange}
                    />
                    Powerlevel: 
                    <input
                        name="powerLevel"
                        type="text" 
                        maxLength="10" 
                        onKeyPress={this.createTodo}
                        value={this.state.powerLevel} 
                        onChange={this.handleChange}
                    />
                </form>
                <div className="listWrapper">
                    <ul className="taskList">
                        {this.state.todos.map((todo) => {
                            return(
                                <li className="task" todo={todo} key={todo.id}>
                                    <input 
                                        className="taskCheckbox" 
                                        type="checkbox" 
                                        checked={todo.done} 
                                        onChange={(e) => this.updateTodo(e, todo.id)}
                                    />
                                    <label className="taskLabel">{todo.title}</label>
                                    <h5 className="powerLabel">Powerlevel: {todo.power}</h5>
                                    <h4 className="taskHealth">Health: {todo.health}%</h4>
                                    <form className="inputContainer">
                                        Task:
                                        <input 
                                            name="subInputValue"
                                            type="text" 
                                            placeholder="Spawn a task" 
                                            maxLength="50" 
                                            onKeyPress={this.createSubTodo(todo.id)}
                                            value={this.state.subInputValue} 
                                            onChange={this.handleChange}
                                        />
                                        Powerlevel: 
                                        <input
                                            name="subPowerLevel"
                                            type="text" 
                                            maxLength="10" 
                                            onKeyPress={this.createSubTodo(todo.id)}
                                            value={this.state.subPowerLevel} 
                                            onChange={this.handleChange}
                                        />
                                        <button onClick={this.createSubTodo(todo.id)}>Add</button>
                                    </form>
                                    <div className="listWrapper">
                                        <ul className="taskList">
                                            {this.state.subtodos.map((subtodo) => {
                                                return(
                                                    <li className="task" subtodo={subtodo} key={subtodo.id}>
                                                        <input
                                                            className="taskCheckbox" 
                                                            type="checkbox" 
                                                            checked={subtodo.done} 
                                                            onChange={(e) => this.updateTodo(e, subtodo.id)}
                                                        />
                                                        <label className="taskLabel">{subtodo.title}</label>
                                                        <h5 className="powerLabel">Powerlevel: {subtodo.power}</h5>
                                                        <h4 className="taskHealth">Health: {subtodo.health}%</h4>
                                                        <span 
                                                            className="attackTaskBtn"
                                                            onClick={(e) => this.deleteTodo(todo.id)}
                                                        >
                                                        Delete
                                                        </span>
                                                        <span 
                                                            className="attackTaskBtn"
                                                            onClick={(e) => this.attackTodo(todo.id, todo.health - this.state.attackDmg)}
                                                        >
                                                        Attack
                                                        </span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <span 
                                        className="attackTaskBtn"
                                        onClick={(e) => this.deleteTodo(todo.id)}
                                    >
                                    Delete
                                    </span>
                                    <span 
                                        className="attackTaskBtn"
                                        onClick={(e) => this.attackTodo(todo.id, todo.health - this.state.attackDmg)}
                                    >
                                    Attack
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            
        )
    }
}

export default Tasks