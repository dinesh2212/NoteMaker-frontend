import React from "react";

function NoteCard(props) {
    return(
        <div onClick={() => {
                            if(props.editNote){
                                props.ChangeEdit()
                            }   
                            props.viewNote(props.notedetail)
                            if(props.viewContent===false){
                                props.ChangeView()
                            }}}
            className="notecard"> 
            <h2 className="cardheader">
                {props.notedetail.title}
            </h2>
        </div>
    )
}

export default NoteCard