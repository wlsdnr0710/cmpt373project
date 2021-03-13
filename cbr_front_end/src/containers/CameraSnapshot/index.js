import React, { useEffect, useRef, useState } from "react";
import CameraSVG from "../../assets/svg/camera.svg";
import "./style.css";

const CameraSnapshot = ({ storeImage }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [isCameraSnapshotEnabled, setIsCameraSnapshotEnabled] = useState(false);

    useEffect(() => {
        if (!doesSupportMediaDevice() || !isCameraSnapshotEnabled) {
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
            setStream(null);
        };

        return turnOffCamera;
    }, [stream, isCameraSnapshotEnabled]);

    const doesSupportMediaDevice = () => {
        return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
    };

    const requestToOpenCamera = () => {
        const videoConstraint = {
            facingMode: {
                ideal: "user"
            },
        };

        navigator.getUserMedia({audio: false, video: videoConstraint}, stream => {
            setStream(stream);
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }, error => {

        });
    };

    const getCameraSnapshotPlaceholder = () => {
        return (
            <div className="camera-snapshot-placeholder">
                <img className="camera-icon" src={CameraSVG} alt="camera-icon" />
                <button className="primary-button" onClick={onClickEnableCamera}>Enable Camera</button>
            </div>
        );
    };

    const onClickEnableCamera = () => {
        setIsCameraSnapshotEnabled(true);
    };

    const getCameraSnapshotUI = () => {
        return (
            <div>
                <div style={{display: isPhotoTaken ? "none" : "block"}}>
                    <video ref={videoRef} width="320" height="240" >
                    </video>
                </div>
                <div style={{display: isPhotoTaken ? "block" : "none"}}>
                    <canvas ref={canvasRef} width="320" height="240" >
                    </canvas>
                </div>
                <div className="button-action">
                    {getActionButton()}
                </div>
            </div>
        );
    };

    const getActionButton = () => {
        if (isPhotoTaken) {
            return (
                <button className="secondary-button" onClick={onClickReset}>Reset</button>
            );
        } else {
            return (
                <div>
                    <button className="primary-button" onClick={onClickTakePhoto}>Take Photo</button>
                    <button className="secondary-button" onClick={onClickDisableCamera}>Disable Camera</button>
                </div>
            );
        }
    };

    const onClickReset = () => {
        setIsPhotoTaken(false);
    };

    const onClickTakePhoto = () => {
        setIsPhotoTaken(true);
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 320, 240);
        if (storeImage) {
            storeImage(canvasRef.current.toDataURL());
        }
    };

    const onClickDisableCamera = () => {
        setIsCameraSnapshotEnabled(false);
    };

    return (
        <div className="camera-snapshot">
            {isCameraSnapshotEnabled ? getCameraSnapshotUI() : getCameraSnapshotPlaceholder()}
        </div>
    );
};

export default CameraSnapshot;
