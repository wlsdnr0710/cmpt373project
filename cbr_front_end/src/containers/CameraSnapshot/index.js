import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const CameraSnapshot = props => {
    const videoRef = useRef(null);
    const [facingMode, setFacingMode] = useState("user");
    const [doesSupportMedia, setDoesSupportMedia] = useState(false);

    useEffect(() => {
        if (!supportMediaDevice) {
            return;
        }
        setDoesSupportMedia(true);
        getUserPermissionForVideo();
    }, []);

    const supportMediaDevice = () => {
        return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
    };

    const getUserPermissionForVideo = () => {
        navigator.mediaDevices.getUserMedia({video: true})
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            });
    };

    const getConstraint = () => {
        return {
            video: {
                facingMode: facingMode
            }
        };
    };

    return (
        <div className="camera-snapshot">
            <div>
                <video ref={videoRef}>
                </video>
            </div>
            <div>
                <button>Take Photo</button>
            </div>
        </div>
    );
};

export default CameraSnapshot;
