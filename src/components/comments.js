import React from "react"
import CommentsSection from "./CommentsSection";

export default function Comments({postId,count}) {

    const [isVisible, setIsVisible] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    const countComments=Object.keys(comments).length

    const toggleComments = () => {  
        if(isVisible)  {            
        fetch('http://localhost:8081/comments/postid/' + postId)
        .then(response => response.json()).then(
            data => {setComments(data);
            }
        )
        }
        setIsVisible(!isVisible);
    }
    // const {commentslist,commentsCount}=comments;

    return (
        <>
            {/* <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" /> &nbsp;Like</button> */}
            <l onClick={toggleComments} type="button" className="detailsPost">&nbsp;Comments ({countComments!=0? countComments :count})</l>
            <br></br>
            <br></br>
            {(isVisible) ? <CommentsSection comments={comments} postId={postId} setComments={setComments} /> : ""}
        </>
    );
}