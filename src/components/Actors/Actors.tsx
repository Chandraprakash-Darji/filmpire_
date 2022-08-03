import React from "react";
import { useParams } from "react-router-dom";

const Actors = () => {
    const { id } = useParams();
    
    return <div>Actors</div>;
};

export default Actors;
