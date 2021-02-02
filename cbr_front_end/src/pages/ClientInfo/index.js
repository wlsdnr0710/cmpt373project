import React from "react";
import "./styles.css";
import avatar from "./avatar.png";


const ClientInfo = () => {
    return (
        <div>
            {/* <p className="test">This is ClientPage page.</p> */}
            <img src={avatar} alt="img" height="200" width="200"/>
            <button>
                New Visit 
            </button>
            <button>
                Survey 
            </button>
            <h1>
                Name
            </h1>
            <p>
                ID <br />
                Zone <br />
                Gender <br />
                Age <br />
            </p>
            <h1>
                Risk
            </h1>
            <p>
                Health <br />
                Education <br />
                Social <br />
            </p>

            <h1>
                Disability and Ailment(s)
            </h1>
            <ul>
                <li>Amputee </li>
                <li>Polio </li>
                <li>Spinal cord injury </li>
            </ul>
            <button>
                Edit 
            </button>

            
        </div>
    );
};

export default ClientInfo;