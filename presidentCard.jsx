import React from "react";
import "./presidents.css"
import PropTypes from "prop-types"
import debug from "sabio-debug";

function PresidentCard(props) {

    const _logger = debug.extend("Presidents");
    _logger("Presidents", props.prez);

    <div>
        <h1> President Card </h1>
    </div>
    const aPrezObj = props.prez
    console.log(props.prez);

    return (
        < div className="col-md-3" key={aPrezObj.id} >
            <div className="container" id="#presidentCards">
                <img src={aPrezObj.image} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="cardId">President: {aPrezObj.president}</h5>
                    <h3 className="card-title" >{aPrezObj.nm}</h3>
                    <p className="card-text" > Party: {aPrezObj.pp}</p>
                </div>
            </div>
            <br></br>

        </div>



    )

};

PresidentCard.propTypes =
{
    prez: PropTypes.shape({   
        president: PropTypes.string.isRequired,
        nm: PropTypes.string.isRequired,
        pp: PropTypes.number.isRequired,      
    })
};
export default PresidentCard;
