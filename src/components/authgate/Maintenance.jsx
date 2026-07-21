import { useEffect } from "react";

const LOGO_SRC = "/assets/logos/FullLogo_Transparent_NoBuffer.png";

export default function Maintenance(){

    useEffect(() => {
      const img = new Image();
      img.src = LOGO_SRC;
    })

    return (
        <div className="logInContainer">
            <img src={LOGO_SRC} alt="logo" />

            <p>Site closed for maintenance</p>
        </div>
    )
}