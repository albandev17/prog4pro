import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


import firebase from '../utils/firebaseConfig';
import { UidContext } from './UidContext';
import { StyledFirebaseAuth } from 'react-firebaseui';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";

const CreateCardio = () => {

        const [name, setName] = useState('');
        const [cardio, setCardio] = useState('');
        const [time, setTime] = useState('');
    
        const [isSignedIn, setIsSignedIn] = useState(false);
        const [uid, setUid] = useState(null);
    
        // config user
        const uiConfig = {
            signInFlow: "popup",
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
              signInSuccessWithAuthResult: () => false,
            },
          };
        
          useEffect(() => {
            firebase.auth().onAuthStateChanged((user) => {
              setIsSignedIn(!!user);
              setUid(user.uid);
            });
          }, []);
    
        // create todo
        const createProg = () => {
            const progsDB = firebase.database().ref("progsDB");
            const prog = {
                uid,
                name,
                cardio,
                time
            };
    
            //toastify settings
            const notify = () => {
                toast(`Séance ajouter`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            };
    
            notify();
    
            progsDB.push(prog);
    
            // reset form
            setName('');
            setCardio('');
            setTime('')
        }

    return (
        <UidContext.Provider value={uid}>
            {isSignedIn ? (
                <>
                    <header>
                        <nav>
                            <div className="header-banner">
                                <NavLink to="/">
                                    <div className="logout-app" ><FontAwesomeIcon className="icon-app" icon={faHome} /></div>
                                </NavLink>
                            </div>
                        </nav>
                    </header>

                    <div className="create">
                        
                            <div className="create-app">
                                <h1>Nouvelle séance</h1>
                                <div className="form-app">
                                    <div className="form-input-app">
                                        <input 
                                            type="datetime"
                                            placeholder="Date" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <input 
                                            type="number"
                                            placeholder="Durée de la séance"
                                            value={time}
                                            min="1" max="10"
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-textarea-app">
                                        <textarea
                                            rows="20"
                                            placeholder="Votre séance"
                                            value={cardio}
                                            onChange={(e) => setCardio(e.target.value)}  
                                        /> 
                                    </div>
                                    <NavLink to="/">
                                        <button className="btn-create-app" onClick={createProg}>Créer <span><FontAwesomeIcon icon={faArrowRight} /></span></button>
                                    </NavLink>

                                </div>
                                
                        </div>
                    </div>

            </>
            ) : (
                <div className="login-page">
                    <h1>Prog 4 Pro</h1>
                    <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                    />
                </div>
            )}

            <NavLink to="/">
                <h5 className="back-to-home">Revenir à l'accueil</h5>
            </NavLink>

        </UidContext.Provider>
    );
};

export default CreateCardio;