import React, { useEffect, useState } from 'react';
import firebase from '../utils/firebaseConfig';
import UpdateDelete from './UpdateDelete';


const Progs = () => {

    const [progList, setProgList] = useState([]);

    useEffect(() => {
        const progsDB = firebase.database().ref('progsDB');

        progsDB.on("value", (snapshot) => {
            console.log(snapshot.val());
            let previousList = snapshot.val();
            let list = [];
            for(let id in previousList){
                list.push({id, ...previousList[id]})
            }
            setProgList(list);
        });
    }, []);

    return (
        <div>
            <ul>
                {progList &&
                    progList.map((item, index) => (
                        <UpdateDelete item={item} key={index} />
                    ))
                }
            </ul>
        </div>
    );
};

export default Progs;