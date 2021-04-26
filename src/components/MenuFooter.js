import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";

const MenuFooter = () => {
    return (
        <footer>
            <div>
                <li className="new-prog"><FontAwesomeIcon icon={faHome} /></li>
                <span>Accueil</span>
            </div>

          <div>
                <li className="new-prog"><FontAwesomeIcon icon={faChartBar} /></li>
                <span>Suivi</span>
          </div>
        </footer>
    );
};

export default MenuFooter;