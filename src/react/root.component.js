//import React and Eev
import React from 'react'
import e from '../event-bus'

//make a constructor and a component state object
export default class Root extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            //message=key. The text will be replaced when the Angualar app message is sent through.
            message: 'Angular Goes Here'
        }
        this.messageHandler = this.messageHandler.bind(this)
    }
//lifecycle listens for event that will be received from the Angular app after Angular app receives message from React app.
    componentDidMount() {
        e.on('received', this.messageHandler)
    }
    componentDidMount() {
        e.off('received', this.messageHandler)
    }
    messageHandler(message) {
         this.setState({
            message: message.text
            })
    }

    myMessage() {
         e.emit('message', { text: 'Hello World! I am React!'})
        }
//Renders H1, p, and a button. The onClick event will send the message to the Angular Component.
//The componentDidUnmount removes the event handler when the React app is unmounted and saves memory.
    render() {
        return (
            <div style={{marginTop: '10px'}}>
                 <h1>React was written here!</h1>

                 <p>
                    <button onClick={this.myMessage}>
                    This sends myMessage to Angular!
                    </button>
                </p>

                 <p>
                      {this.state.message}
                </p>
            </div>
        )
    }
}