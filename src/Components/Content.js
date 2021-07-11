import React, {useState} from "react";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import "../App.css";

function Content(props) {
    const [newtitle, setNewtitle] = useState("")
    const [newnote, setNewnote] = useState("")

    if(props.viewContent) {
        if(!props.editNote) {
            return(
                <div style={{width: "75vw", maxWidth: "75vw"}}>
                    <div className="dateflex">
                        <h1 className="newtitle">{props.displayNote.title}</h1>
                        <div>
                            <h2 className="date">{props.displayNote.date}</h2>
                            <button onClick={() => {
                                setNewtitle(props.displayNote.title)
                                setNewnote(props.displayNote.desc)
                                props.ChangeEdit()
                            }}className="editbutton">edit</button>
                            <button onClick={() => {
                                axios
                                    .delete(`http://127.0.0.1:8000/detail/${props.displayNote.id}/`)
                                .then(res => props.GetNotes())
                                setNewnote("")
                                setNewtitle("")
                                props.ChangeView()
                            }}className="deletebutton">delete</button>
                        </div>
                    </div>
                    <ReactMarkdown className="notecontent">{props.displayNote.desc}</ReactMarkdown>
                </div>
            )
        }
        else {
            return (
                <div>
                <div className="dateflex">
                    <h1 className="newtitle">Title:</h1>
                    <div>
                        <button onClick={() => {
                            axios
                            .put(`http://127.0.0.1:8000/detail/${props.displayNote.id}/`, {
                                "id": props.displayNote.id,
                                "title": newtitle,
                                "desc": newnote,
                                "date": props.displayNote.date
                            })
                            .then(res => props.GetNotes())
                            .then(res => props.RefreshNote(props.displayNote.id))
                            props.ChangeEdit()
                        }}className="savebutton">save</button>
                        <button onClick={() => {
                            setNewtitle("")
                            setNewnote("")
                            props.ChangeEdit()
                        }}className="cancelbutton">cancel</button>
                    </div>
                </div>
                <input type="text" value={newtitle} placeholder="Enter title" className="titlebox" onChange={event => {
                    setNewtitle(event.target.value)
                }}/>
                <h1 className="newtitle">Note:</h1>
                <textarea rows="20" value={newnote} placeholder="Enter markdown" className="notebox" onChange={event => {
                    setNewnote(event.target.value)
                }}></textarea>
            </div>
            )
        }
    }
    else {
        return(
            <div>
                <div className="dateflex">
                    <h1 className="newtitle">Title:</h1>
                    <button onClick={() => {
                        const today = new Date()
                        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                        props.PostNote({
                            "title": newtitle,
                            "desc": newnote,
                            "date": date
                        })
                        setNewtitle("")
                        setNewnote("")
                        props.GetNotes()
                    }}className="savebutton">save</button>
                </div>
                <input type="text" value={newtitle} placeholder="Enter title" className="titlebox" onChange={event => {
                    setNewtitle(event.target.value)
                }}/>
                <h1 className="newtitle">Note:</h1>
                <textarea rows="20" value={newnote} placeholder="Enter markdown" className="notebox" onChange={event => {
                    setNewnote(event.target.value)
                }}></textarea>
            </div>
        )   
    }
}

export default Content