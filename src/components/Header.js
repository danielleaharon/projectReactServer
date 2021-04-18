import React, { useState } from 'react';
import { signout, isAuth } from '../actions/auth';
import { useHistory, Route } from 'react-router-dom';
import signup from '../pages/signup';


// import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Search2, setSearch2] = useState(false);
    const [Search3, setSearch3] = useState(false);




    const history = useHistory();

    const toggle = () => setIsOpen(!isOpen);
    const RefSearch1 = React.useRef("");
    const RefSearch2 = React.useRef("");
    const RefSearch3 = React.useRef("");
  


    const Search = e => {
        e.preventDefault();
     
        props.setData(true)



    }
    const handel=name=>e=>{
        props.setData(false)
        props.setSearchInput({...props.searchInput,[name]:(e.target.value)})

    }
    const moreSearch = () => {
        if (Search2) {
            setSearch3(!Search3)

        } else {
            setSearch2(!Search2)
        }


    }
    const lessSearch = () => {
        if (Search3) {
            setSearch3(!Search3)

        } else {
            setSearch2(!Search2)
        }


    }
    return (
        <Route>
            <div>
                <Navbar className="light" light expand="md">
                    
                        <NavLink href="/" className="font-weight-bold">WRITE IT {props.data ?  <p>Search result.. </p> : ''}</NavLink>
                  
                    <br></br>
                    {/* {props.data ?  <p>Search result.. </p> : ''} */}

                    <NavLink>
                    <form className="Search" onSubmit={Search}>
                  
                            <input onChange={handel('search1')} className="Search2" type="text" placeholder="Search.." name="search1" />
                            {Search2 ? (<><i id="pluse" class="fa fa-plus"></i> <input ref={RefSearch2} onChange={handel('search2')}className="Search2" type="text" placeholder="Search.." name="search2" /></>) : ''}
                            {Search3 ? <><i id="pluse" class="fa fa-plus"></i> <input ref={RefSearch3}onChange={handel('search3')} className="Search2" type="text" placeholder="Search.." name="search3" /></> : ''}
                            {(Search2 || Search3) ? <button type="button" className="more-less-btn" onClick={lessSearch}><i class="fa fa-minus-square"></i></button> : ''}

                            {(Search2 && Search3) ? '' : <button type="button" className="more-less-btn" onClick={moreSearch}><i class="fa fa-plus-square"></i></button>}

                            <button type="submit"  className="more-less-btn" ><i className="fa fa-search"></i></button>
                        </form>
                    </NavLink>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav lang="en" className="ml-auto" navbar>
                            {!isAuth() && (<React.Fragment>
                                <NavItem>
                                    {/* <Route path="/signup" component={signup} >                              <NavLink >Signup </NavLink> */}
                                    <NavLink href='/signup'  >Signup

                          </NavLink>

                                </NavItem>
                                <NavItem>

                                    <NavLink href='/signin' >Signin</NavLink>


                                </NavItem>
                            </React.Fragment>
                            )}


                            {isAuth() && (<React.Fragment>
                                <NavItem>

                                    <NavLink href='/postlist' >My posts</NavLink>


                                </NavItem>
                                <NavItem>

                                    <NavLink onClick={() => signout(() => history.goBack('/signin'))} >Signout</NavLink>

                                </NavItem>

                            </React.Fragment>
                            )}


                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
          

        </Route>
    );
}


export default Header;