// Creating an Angular component that renders a div with the message that will come from the React app.
// Once received, the Angular app will send a response to the React app. This is rendered on the React side.
import { Component, ChangeDetectorRef, Inject } from '@angular/core'
import e from '../event-bus'

@Component({
  selector: 'AngularApp',
  template: `
		<div style="margin-top: 100px;">
      <h1>This was written in Angular</h1>
      <p>{{message}}</p>
		</div>
	`,
})

//the ChangeDetectorRef goes into the constructor. The change of the message comes from the Eev event so we have to tell Angular to render it.
//The ngAfterContentInit is a method from the Agnular Component Lifecycle and is called after all content has rendered for the first time.
//Inside, listen for the Eev event by calling an Eev instance 'on' method & listen for a 'message' event that comes from React.
//Then, change the 'message' by using this.changeDetector.detectChanges() Angular is told to re-render it
//The returnMessageToReactWhenReceived function is a customized function that sends a message back to React.
export default class AngularApp {
    message: string = "Message from React should appear here"
  
    constructor(@Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef) {}
  
    ngAfterContentInit() {
      e.on('message', message => {
        this.message = message.text
        this.changeDetector.detectChanges()
        this.returnMessageToReactWhenReceived()
      })
    }
  
    returnMessageToReactWhenReceived() {
      e.emit('received', { text: 'Hello, React! -Angular' })
    }
  }