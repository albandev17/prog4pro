import React from 'react';
import Progs from './Progs'
import Create from './Create'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuFooter from './MenuFooter';
import firebase from '../utils/firebaseConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";


toast.configure();

const Main = () => {
    let signoutToastMsg = () => {
        if (firebase.auth().signOut()){
            toast.info(`Vous êtes déconnecter !`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        } else {
            toast.info(`Erreur veuillez réessayer !`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        }
    }
    return (
        <>
        <header>
            <nav>
                <div className="header-banner">
                    <div>
                            <h1 className="title-app">Prog 4 pro</h1>
 
                            <span>{firebase.auth().currentUser.displayName}</span>
      
                    </div>
                    <div className="logout-app" onClick={signoutToastMsg}><FontAwesomeIcon className="icon-app" icon={faPowerOff} /></div>
                </div>
            </nav>
        </header>
        <Create />
        <Progs />
        <MenuFooter />
        </>
    );
};

export default Main;