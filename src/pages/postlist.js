import React from "react";
// import io from "socket.io-client";
import NewPost from "./newpost";
// const socket = io.connect("http://localhost:8081");
import Layout from '../components/Layout';
import PostlistComponent from '../components/postlistComponent';
import { isAuth } from '../actions/auth';
import { useHistory } from 'react-router-dom';
import ImgBackground from '../background.png';



function Postlist() {

    const hi = useHistory();
    const [posts, setPosts] = React.useState([]);
    const [newPost, setNewPost] = React.useState(false);


    const { name,email } = isAuth();
    const count = Object.keys(posts).length

 
    // const [user, setUser] = React.useState({
    //     _id: _id
    // });
    // setUser(isAuth());

    const { _id } = isAuth();
    React.useEffect(() => {
        fetch('http://localhost:8081/posts/userid/' + _id)
            .then(response => response.json()).then(
                data => setPosts(data)
            )
    }, []);


    
    const onClick = () => {
        setNewPost(!newPost);
    }



    return (
        <>
            <div className="Postlist">
                <Layout>

                    <div className="w3-container w3-card w3-white w3-round w3-margin" ><br />
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
                    </div>
                    <PostlistComponent posts={posts}  />

                </Layout>
            </div>


        </>
    );
}

export default Postlist;
