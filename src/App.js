import React, {Component} from "react";
import Sidebar from "./Components/Sidebar";
import Content from "./Components/Content";
import axios from 'axios';
import "./App.css"

class App extends Component {


    constructor() {
        super()
        this.state = {
            notes: [],
            viewContent: false,
            displayNote: {},
            editNote: false
        }
        this.PostNote = this.PostNote.bind(this)
        this.GetNotes = this.GetNotes.bind(this)
        this.ChangeView = this.ChangeView.bind(this)
        this.viewNote = this.viewNote.bind(this)
        this.ChangeEdit = this.ChangeEdit.bind(this)
        this.RefreshNote = this.RefreshNote.bind(this)
    }

    GetNotes = () => {
        
        fetch("http://127.0.0.1:8000/note/",
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => this.setState({notes: json}))

    }

    PostNote = (item) => {
        fetch('http://127.0.0.1:8000/note/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        })
        .then(() => this.GetNotes())
    }

    ChangeView = () => {
        this.setState(prevState => {
            const newview = !prevState.viewContent
            return {
                viewContent: newview
            }
        })
    }

    viewNote = (item) => {
        this.setState({
            displayNote: item
        })
    }

    ChangeEdit = () => {
        this.setState(prevState => {
            const newedit = !prevState.editNote
            return {
                editNote: newedit
            }
        })
    }

    RefreshNote = (id) => {
        axios
            .get(`http://127.0.0.1:8000/detail/${id}/`)
            .then(res => this.setState({ displayNote: res.data }))
    }

    componentDidMount() {
        this.GetNotes()
    }
   
    render() {
        return(
            <div className="pageflex">
                <div className="sidebar">
                    <Sidebar notes={this.state.notes} viewContent={this.state.viewContent} ChangeView={this.ChangeView}
                     viewNote={this.viewNote} ChangeEdit={this.ChangeEdit} editNote={this.state.editNote}/>
                </div>
                <div>
                    <Content notes={this.state.notes} viewContent={this.state.viewContent} displayNote={this.state.displayNote}
                    PostNote={this.PostNote} GetNotes={this.GetNotes} ChangeView={this.ChangeView} editNote={this.state.editNote}
                    ChangeEdit={this.ChangeEdit} RefreshNote={this.RefreshNote}/>
                </div>
            </div>
    )}
}

export default App