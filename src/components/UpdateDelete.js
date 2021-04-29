import React, { useContext, useState } from 'react';

import firebase from '../utils/firebaseConfig';
import { UidContext } from './UidContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


toast.configure();

const UpdateDelete = ({ item }) => {

    const [update, setUpdate] = useState(false);
    const [nameUpdate, setNameUpdate] = useState(null);
    const [contentUpdate, setContentUpdate] = useState(null);
    const [wodUpdate, setWodUpdate] = useState(null);
    const [timeUpdate, setTimeUpdate] = useState(null);

    const uid = useContext(UidContext);

    // user auth
    const authorCheck = () => {
        if (item.uid === uid) {
          return true;
        } else {
          return false;
        }
      };
      authorCheck();

    // update todo
    const updateProg = () => {
        let prog = firebase.database().ref("progsDB").child(item.id);

        if(nameUpdate !== null){
            prog.update({
                name: nameUpdate,
            });
        }
        if(contentUpdate !== null){
            prog.update({
                content: contentUpdate,
            });
        }
        if(wodUpdate !== null){
            prog.update({
                wod: wodUpdate,
            });
        }
        if(timeUpdate !== null){
            prog.update({
                time: timeUpdate,
            });
        }
        setUpdate(false);

        // toastify settings
        const notifyUpdate = () => {
            toast.success(`Séance modifier`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
              });
        }
        notifyUpdate();
    }

    // delete todo
    const deleteProg = () => {
        let prog = firebase.database().ref('progsDB').child(item.id);

        // toastify
        const notifyDelete = () => {
            toast.warning(`Séance supprimer`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
        notifyDelete();

        prog.remove(); 
        authorCheck();
    }

    return (

            <div className="container-app">
                {
                    authorCheck() && (
                        <div className="card-app">
                            <div className="card-button-app">
                                <p className="card-title-app">{item.name}</p>
                                <div className="btn-update-app">
                                    <p><FontAwesomeIcon icon={faClock} /> {item.time} min</p>
                                </div>
                            </div>
                            <div className="card-app-prog">
                                <span>Renforcement musculaire</span>
                                <p className="card-content-app">{item.content}</p>
                                <span>W.O.D</span>
                                <p className="card-wod-app">{item.wod}</p>
                            </div>
                            <div className="footer-card">
                                <div className="btn-update-app">
                                    <button onClick={() => setUpdate(!update)}><FontAwesomeIcon icon={faPencilAlt} /> Modifier</button>
                                </div>
                                <div className="btn-update-app">
                                    <button onClick={deleteProg}><FontAwesomeIcon icon={faTrashAlt} /> Supprimer</button>
                                </div>
                            </div>
                        </div>
                    )
                    
                }
                
                {
                    update && 
                    <div className="update-delete">
                        <div className="input-update-delete">
                            <input
                                type="text"
                                defaultValue={item.name}
                                onChange={(e) => setNameUpdate(e.target.value)}
                            />
                            <input
                            type="number"
                            defaultValue={item.time}
                            onChange={(e) => setTimeUpdate(e.target.value)}
                            />
                        </div>
                        <textarea
                                defaultValue={item.content}
                                onChange={(e) => setContentUpdate(e.target.value)}
                            />
                        <textarea
                                defaultValue={item.wod}
                                onChange={(e) => setWodUpdate(e.target.value)}
                            />
                        <button onClick={updateProg}>Modifier <span><FontAwesomeIcon icon={faArrowRight} /></span></button>
                    </div>
                }
            </div>

    );
};

export default UpdateDelete;