import React, { useContext, useState } from 'react';
import firebase from '../utils/firebaseConfig';
import { UidContext } from './UidContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


toast.configure();

const Create = () => {

    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [wod, setWod] = useState('');
    const [time, setTime] = useState('');

    const uid = useContext(UidContext);

    const createProg = () => {
        const progsDB = firebase.database().ref("progsDB");
        const prog = {
            uid,
            name,
            content,
            wod,
            time
        };

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

        setName('');
        setContent('');
        setWod('');
        setTime('')
    }

    return (
        <>
            <div className="create">
                <div className="form-app">
                    <div className="form-input-app">
                        <input 
                            type="text"
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
                            rows="5"
                            placeholder="Renforcement Musculaire"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}  
                        />
                        <textarea
                            rows="5"
                            placeholder="Workout of the day"
                            value={wod}
                            onChange={(e) => setWod(e.target.value)}  
                        />
                    </div>
                </div>
                <button className="btn-create-app" onClick={createProg}>Créer <span><FontAwesomeIcon icon={faArrowRight} /></span></button>
            </div>
        </>
    );
};

export default Create;