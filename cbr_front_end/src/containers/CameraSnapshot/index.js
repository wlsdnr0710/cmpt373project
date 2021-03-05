import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const CameraSnapshot = props => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [facingMode, setFacingMode] = useState("user");

    useEffect(() => {
        if (!doesSupportMediaDevice()) {
            return;
        }

        if (stream === null) {
            requestToOpenCamera();
        }

        const turnOffCamera = () => {
            if (stream === null) {
                return;
            }

            const tracks = stream.getTracks();
            for (const index in tracks) {
                const track = tracks[index];
                track.stop();
            }
        };

        return turnOffCamera;
    }, [stream]);

    const doesSupportMediaDevice = () => {
        return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
    };

    const requestToOpenCamera = () => {
        const videoConstraint = {
            facingMode: {
                ideal: "user" // Or environment
            },
        };

        navigator.getUserMedia({audio: false, video: videoConstraint}, stream => {
            setStream(stream);
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }, error => {

        });
    };

    const onClickTakePhoto = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 320, 240);
    };

    return (
        <div className="camera-snapshot">
            <div>
                <video ref={videoRef} width="320" height="240" >
                </video>
            </div>
            <div>
                <canvas ref={canvasRef} width="320" height="240" >
                </canvas>
            </div>
            <div>
                <button onClick={onClickTakePhoto}>Take Photo</button>
            </div>
        </div>
    );
};

export default CameraSnapshot;
