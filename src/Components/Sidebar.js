import React from "react";
import NoteCard from "./NoteCard";
import "../App.css";

function Sidebar(props) {
    const renderNotes = props.notes.map(note => (
        <NoteCard key={note.id} notedetail={note} viewNote={props.viewNote} ChangeView={props.ChangeView}
        viewContent={props.viewContent} ChangeEdit={props.ChangeEdit} editNote={props.editNote}/>
    ))

    return (
        <div>
            <h1 className="header">NOTEMAKER</h1>
            <h2 onClick={() => {if(props.viewContent === true) {
                props.ChangeView()
            }}} className="newnote">+ Create new note</h2>    
            {props.notes.length ? <h2 className="yournotes">YOUR NOTES</h2> : <div></div>}
            {renderNotes}
        </div>
    )
}

export default Sidebar