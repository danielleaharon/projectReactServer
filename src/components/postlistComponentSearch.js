import React from "react"
import Post from "./post"

export default function PostList2({ posts }) {

    // console.table(posts);
    return (
        <>
            {posts.map((data, key) => {
                return <Post key={key} post={data}  />
            })}
        </>
    );
}