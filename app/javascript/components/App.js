import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Tasks from './Tasks'

class App extends React.Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/tasks" component={Tasks} />
                </Switch>
            </div>
        )
    }
}

export default App