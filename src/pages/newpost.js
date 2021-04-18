import React from "react";
import { isAuth } from '../actions/auth';

export default function NewPostBox({ posts, setPosts }) {
    const { username } = isAuth();
    const [isToggled, setIsToggled] = React.useState(false);


    const onClick = () => {
        if(categoryRef.current.value!=""&& titleRef.current.value!="" && inputRef.current.value!=""){
            setIsToggled(false);
        fetch('http://localhost:8081/posts/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: categoryRef.current.value,
                username: username,
                content: inputRef.current.value,
                title:titleRef.current.value
            })
        }).then(response => response.json()).then(
            data => {
                if (data.status === "success") {
                    inputRef.current.value = '';
                    setPosts([data.value].concat(posts));
                }
            }
        )
        }
        else{

            setIsToggled(true);
        }

    }
    const showMessage=()=> isToggled ? <div className="alert alert-danger"> missing argument  </div>:'';

    const inputRef = React.useRef(null);
    const categoryRef = React.useRef(null);
    const titleRef = React.useRef(null);

    // function handleSelect(elm)
    // {
    //     {categoryRef}= elm;
    // }
    return (
        <div className="w3-row-padding">
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                    <div className="w3-container w3-padding">
                    {showMessage()}
                        <br></br>
                        <input ref={titleRef} placeholder="title" className="textareatitle" />
<br></br>
<br></br>
                        <textarea ref={inputRef} placeholder="What's on your mind?" className="textarea" />
                       <br></br>
                       <br></br>
                        <label  className="category" for="category" >Choose a category:</label>
                        <select name="category" id="category"ref={categoryRef}>
                            <option value="Love">Love</option>
                            <option value="Work">Work</option>
                            <option value="Studies">Studies</option>
                            <option value="Other">Other</option>
                        </select>
                        <br></br>
                        <br></br>
                    

                    <div className="buttonUpdatePost">
                        <button onClick={onClick} type="button" className="buttonPostpublish"> &nbsp;Published</button>
                        </div>
                        <br>
                        </br>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    );
}