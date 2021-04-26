import React, { useContext, useState } from 'react';
import firebase from '../utils/firebaseConfig';
import { UidContext } from './UidContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

const Create = () => {

    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [wod, setWod] = useState('');

    const uid = useContext(UidContext);

    const createProg = () => {
        const progsDB = firebase.database().ref("progsDB");
        const prog = {
            uid,
            name,
            content,
            wod,
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
        }

        notify();

        progsDB.push(prog);

        setName('');
        setContent('');
        setWod('');
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
                    </div>
                    <div className="form-input-app">
                        <textarea
                            rows="7"
                            placeholder="Renforcement Musculaire"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}  
                        />
                        <textarea
                            rows="7"
                            placeholder="Workout of the day"
                            value={wod}
                            onChange={(e) => setWod(e.target.value)}  
                        />
                    </div>
                </div>
                <button className="btn-create-app" onClick={createProg}>Créer</button>
            </div>
        </>
    );
};

export default Create;