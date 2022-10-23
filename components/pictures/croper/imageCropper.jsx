import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';
import $ from 'jquery';
import getCroppedImg from './cropTool';
import { TOKEN } from '../../token/identityToken';
import { requestUrl } from '../../../API/requestUrl';

const ImageCropper = (props) => {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const uploadImage = useCallback((image) => {
        let data = new FormData();
        data.append("file", image);
        
        $.ajax({
            url: `${requestUrl}/image/setAvatar/`,
            type: "post",
            headers: {
                "Authorization": "Bearer " + TOKEN.access_token,
            },
            data: data,
            processData: false,
            contentType: false,

            success: (resp) => {
                if(resp.result === "success") {
                    window.location.href = "/";
                }
                else {
                    props.setNoticeInfo(resp.result); //失败原因
                }
            }
        })
    }, [props]);

    const croppedImage = useCallback(async () => {
        props.setCropperDisplay(false); // 关闭剪切框
        const image = await getCroppedImg( // blob对象
            props.src,
            croppedAreaPixels,
            rotation
        );

        uploadImage(image); // 上传图片
    }, [croppedAreaPixels, rotation, props, uploadImage]);

    return (  
        <ImageCropperStyle>
            <div className="d-flex justify-content-center pt-5">
                <div className="col-12 col-md-6 col-xl-5 py-4 card">
                    <div className='mb-2 crop-head' />
                    <div className="mb-3 crop-title">请选择合适的区域作为头像</div>
                    
                    <div className="px-4 crop-controller">
                        <div className="crop-area">
                            <Cropper
                                image={props.src}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                showGrid={false}

                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                objectFit="contain"
                            />
                        </div>
                        
                        <div className="row justify-content-center pt-3">
                            <button onClick={(e) => croppedImage()} className='p-2 col-md-3 crop-button'>裁剪</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </ImageCropperStyle>
    );
}
 
const ImageCropperStyle = styled.div`
    & {
        background-color: rgba(255, 255, 255, .7);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1600;
    }

    & .crop-head {
        border-bottom: 3px solid #3CB2D6;
    }

    & .crop-title {
        font-size: 18px;
        text-align: center;
        color: #737373;
    }

    & .crop-area {
        border: 1px solid #F9F9F9;
        border-radius: 5px;
    }

    & .crop-area > div {
        border-radius: 5px;
        position: relative;
    }

    & .crop-area img {
        display: block;
        position: relative;
        max-width: 100%;
        max-height: 400px;
    }

    & .crop-button {
        background-color: #3CB2D6;
        font-weight: bold;
        color: white;
        border: none;
        border-radius: 5px;
        display: block;
    }

    & .crop-button:hover {
        background-color: #09b3eb;
    }
`

export default ImageCropper;