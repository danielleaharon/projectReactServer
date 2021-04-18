import React from "react";
// import io from "socket.io-client";
import NewPost from "./newpost";
// const socket = io.connect("http://localhost:8081");
import Layout from '../components/Layout';
import PostlistComponent from '../components/postlistComponent';
import { isAuth } from '../actions/auth';
import { useHistory } from 'react-router-dom';
import ImgBackground from '../background.png';



const PostlistSearch = ({ data, posts }) => {

    // const hi = useHistory();
    console.log("PostlistSearch");
    const [postsfilter, setPostsfilter] = React.useState([]);
    let arr = [];
    // let params = (new URL(document.location)).searchParams;
    // const params =data;

    // data.map((key,search)=>{
    //     console.log("s:"+search)
    //     if(search!=null && search!=""){
    //         arr.push(search);
    //     }

    // })
    // setPostsfilter(posts);
    const { search1, search2, search3 } = data;
    if (search1 != null && search1 != '') {
        arr.push(search1);
    
    }
    if (search2 != null && search2 != '') {
        arr.push(search2);

    }
    if (search3 != null && search3 != '') {
        arr.push(search3);
    }
    if (arr.length == 0) {
        console.log("error");
    }
    React.useEffect(() => {
        fetch('http://localhost:8081/posts/')
            .then(response => response.json()).then(
                data => {setPostsfilter(data.filter((item) => {
                    console.log("item; " + item)
                    const category = item.category.toLowerCase();
                    const username = item.username.toLowerCase();
                    const commentsCount = Object.keys(item.comments).length
            
                    const c = cheakeFilter(category, username, commentsCount);
                    console.log(c)
            
                    return c;
            
                }))

                 }
            )

    }, []);

const setPostList=()=>{
    console.table(postsfilter)
    setPostsfilter(postsfilter.filter((item) => {
        console.log("item; " + item)
        const category = item.category.toLowerCase();
        const username = item.username.toLowerCase();
        const commentsCount = Object.keys(item.comments).length

        const c = cheakeFilter(category, username, commentsCount);
        console.log(c)

        return c;

    }))
 
}
    function cheakeFilter(category, username, commentsCount) {

        const size = arr.length;
        const arrTemp=[...arr];
        console.log("size1 in:" + arrTemp);

        if (size == 1) {
            console.log("size1 in:" + size);
            const filter = arrTemp.pop().toLowerCase();
            console.log("username in:" + username.includes(filter));

            const result1 = (username.includes(filter) || category.includes(filter)|| commentsCount == (filter));
            console.log("result1 in:" +result1);

            return (result1);
        }
        else if (size == 2) {

            const filter = arrTemp.pop().toLowerCase();
            const filter2 = arrTemp.pop().toLowerCase();
            const result1 = (username.includes(filter) || category.includes(filter) || commentsCount == (filter));
        
            const result2 = (category.includes(filter2) || username.includes(filter2) && commentsCount == (filter2) );
          
            return (result1 && result2);
        }
        else if (size == 3) {

            const filter = arrTemp.pop().toLowerCase();
            const filter2 = arrTemp.pop().toLowerCase();
            const filter3 = arrTemp.pop().toLowerCase();

            return ( (username.includes(filter) ||category.includes(filter) ||commentsCount == (filter)) &&
                (category.includes(filter2) || username.includes(filter2) || commentsCount == (filter2) )&&
                (category.includes(filter3) || username.includes(filter3) || commentsCount == (filter3)))
            
        }
        else {
            console.log("size2222 in:" + size);

            return true;

        }
    }

    return (
        <>
            <div>


                {/* <div className="w3-container w3-card w3-white w3-round w3-margin" ><br />
                    <div className='w3-right w3-opacity'>
                    <button className="buttonNewPost" onClick={onClick}> Upload new post</button>

                        </div>
                       <h6>Name: </h6> <h3 className="title">{name}</h3>
                        <hr className="w3-clear" />
                        <h6> Email : </h6>
                        <h6>  {email}</h6>
                        <br></br>

                        <h6> Posts number:  {count} </h6>
                    <br/>
                    </div>

                    {newPost ? (<><NewPost posts={posts} setPosts={setPosts} /> <br/></>): ''}
                    <div className="w3-container2 w3-card w3-gray w3-round w3-margin">
                    <h2 className="allpostTitle">My posts</h2>
                    </div> */}
                {/* {props.start ?<div> start </div>:<div> stop </div>} */}


                <PostlistComponent posts={postsfilter} />


            </div>


        </>
    );
}

export default PostlistSearch;
