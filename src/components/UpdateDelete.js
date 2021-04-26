import React, { useContext, useState } from 'react';
import firebase from '../utils/firebaseConfig';
import { UidContext } from './UidContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


toast.configure();

const UpdateDelete = ({ item }) => {

    const [update, setUpdate] = useState(false);
    const [nameUpdate, setNameUpdate] = useState(null);
    const [contentUpdate, setContentUpdate] = useState(null);
    const [wodUpdate, setWodUpdate] = useState(null);

    const uid = useContext(UidContext);

    const authorCheck = () => {
        if (item.uid === uid) {
          return true;
        } else {
          return false;
        }
      };
      authorCheck();

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

        setUpdate(false);

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

    const deleteProg = () => {
        let prog = firebase.database().ref('progsDB').child(item.id);

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
                                    <button onClick={() => setUpdate(!update)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                    <button onClick={deleteProg}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </div>
                            </div>
                            <div className="card-app-prog">
                                <span>Renforcement musculaire</span>
                                <p className="card-content-app">{item.content}</p>
                                <span>W.O.D</span>
                                <p className="card-wod-app">{item.wod}</p>
                            </div>
                        </div>
                    )
                    
                }
                
                {
                    update && 
                    <div>
                        <textarea
                            defaultValue={item.content}
                            onChange={(e) => setContentUpdate(e.target.value)}
                        />
                        <textarea
                            defaultValue={item.wod}
                            onChange={(e) => setWodUpdate(e.target.value)}
                        />
                        <input
                            type="text"
                            defaultValue={item.name}
                            onChange={(e) => setNameUpdate(e.target.value)}
                        />
                        <button onClick={updateProg}>Modifier</button>
                    </div>
                }
            </div>

    );
};

export default UpdateDelete;