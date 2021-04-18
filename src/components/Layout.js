import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { SearchMode } from './Header';
import Search from '../pages/postlistSearch';


import { BrowserRouter, Route, Switch } from "react-router-dom";

const Layout = ({ children ,posts}) => {
    const [state, setstate] = useState(false);
    // const [searchInput, setSearchInput] = useState([]);
    const [searchInput,setSearchInput]=useState({
        search1: '',
        search2: '',
        search3: '',
    
    });
   

    return (
        <BrowserRouter>
            <React.Fragment>
                <Header data={state} setData={setstate} setSearchInput={setSearchInput} searchInput={searchInput} />
               
                {state ? (<Search data={searchInput}  posts={posts}/>) :
               ( <>{ children }</>)
                    
                }
                <br></br>
                <br></br>






            </React.Fragment>
            <div className="footer">
                <p>by Danielle Aharon, Rafi Admoni</p>
            </div>
        </BrowserRouter>



    );
}
export default Layout