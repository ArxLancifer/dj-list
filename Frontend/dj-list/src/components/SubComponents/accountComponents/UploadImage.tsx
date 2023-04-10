import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { CloudArrowUpFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IToken } from "../../../interfaces/UserInterfaces";
import { RootState } from "../../store";
function UploadImage() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState<string>("");
    const userTokens = useSelector(
        (state: RootState) => state.userData.userInfo.userTokens
    );
    const imageRef = React.useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string>("");

    const userToken = (userTokens as IToken).createdUserToken;
    function fileNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { files } = e.target;
        const filename = files as FileList;
        setFileName(filename[0].name);
    }
    async function uploadSubmitHandler(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        //@ts-ignore
        const file = imageRef.current?.files[0];

        if (!file) {
            setError("Image is required");
            return;
        }

        const formData = new FormData();
        formData.append("userAvatar", file!);
        formData.append("userToken", userToken);
        try {
            const response = await axios.post<AxiosResponse>(
                `${process.env.REACT_APP_API_BASE_URL}/accountsettings/uploadavatar`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            
            navigate("/accountsettings/accountinformation");       
            
            
        } catch (error) {
            if((axios.isAxiosError(error))){
                console.log(error)
                setError("Image did not upload");
            }
        }
    }

    return (
        <div className="text-light">
            {error && <Alert variant="danger">{error}</Alert>}
            <h4>Upload profile picture</h4>
            <form
                action={`${process.env.REACT_APP_API_BASE_URL}/accountsettings/uploadavatar`}
                encType="multipart/form-data"
                method="post"
            >
                <label htmlFor="file-upload" className="custom-file-upload">
                    <CloudArrowUpFill className="fs-5" />
                    <span className="ms-2">Upload</span>
                </label>
                <i className="ms-2">{fileName}</i>
                <input
                    ref={imageRef}
                    onChange={fileNameHandler}
                    id="file-upload"
                    name="userAvatar"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                />
                <Button
                    onClick={uploadSubmitHandler}
                    className="d-block my-2"
                    size="sm"
                    variant="success"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default UploadImage;
