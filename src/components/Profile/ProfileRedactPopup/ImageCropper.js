import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cropper from "react-cropper";
import firebase from "firebase";
import fileUploader from '../../../actions/fileUploader';
import "cropperjs/dist/cropper.css";
import closeIcon from '../../../img/close.svg';
import uploadIcon from '../../../img/upload.svg';


class ImageCropper extends Component {
    cropUserImage = (file, maxWidth, maxHeight, imageType) => {
        this.props.onDeactivateCropper()
        console.log(file)
        setTimeout(()=>{
            if (file !== undefined){
                this.props.onActivateCropper(file, maxWidth, maxHeight, imageType)
            }
        }, 0)
    }

    loadImageToFirebase = (image, imageType) =>{
        console.log(image)
        if (image !== undefined){
            const storageRef = fileUploader.storage().ref()
            const fileRef = storageRef.child('user-' + imageType + this.props.userState.user.id)
            fileRef.put(image).then((response)=>{
                fileRef.getDownloadURL()
                .then((response) => {
                    console.log(response)
                    if (imageType === 'avatar'){
                        this.props.onChangeAvatar(response)
                    }
                    else if(imageType === 'personal-background'){
                        this.props.onChangePersonalBackground(response)
                    }
                })
            })
        }

    }
    
    getCropperData = () => {
        this.props.onDeactivateCropper()

        if (typeof this.props.cropperData.instance !== "undefined") {
          const croppedImage = this.dataURLtoBlob(this.props.cropperData.instance.getCroppedCanvas().toDataURL());
          this.loadImageToFirebase(croppedImage, this.props.cropperData.imageType)
        }
    };

    dataURLtoBlob = (dataurl) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }


    loadUserImage = (e, imageType) =>{
        const file = e.target.files[0];
        this.loadImageToFirebase(file, imageType)
    }

    deactivateCropper = () =>{
        this.props.onDeactivateCropper()
    }

    render() {
        if (!this.props.cropperFile){
            if(this.props.cropperData.imageType === 'avatar'){
                this.props.onSetCropperFile('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54')
            }
            else this.props.onSetCropperFile('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-background.png?alt=media&token=1c91f99c-c236-4a28-b291-bfc2263df45b')
        }


        return this.props.cropperActive && this.props.cropperFile ? (
            <div className="cropper-block">
                <div
                    className={"cropper__img-preview " + this.props.cropperData.imageType}
                    style={{ width: this.props.cropperMaxWidth, height: this.props.cropperMaxHeight, overflow:"hidden"}}
                />

                <Cropper
                style={{ width: "100%", height: "400px", backgroundColor:"#fff" }}
                aspectRatio={this.props.cropperMaxWidth / this.props.cropperMaxHeight}

                preview=".cropper__img-preview"
                src={this.props.cropperFile}
                viewMode={1}
                dragMode='move'
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} 
                onInitialized={(instance) => {
                    this.props.setCropperInstance(instance);
                }}
                />
                
                <div className="cropper-controls">
                    <button className="cropper-upload-btn" onClick={this.getCropperData}>
                        <img src={uploadIcon} alt="uploadIcon"/>
                    </button>

                    <button className="cropper-close-btn" onClick={this.deactivateCropper}>
                        <img src={closeIcon} alt="closeIcon"/>
                    </button>
                </div>


            </div>
            
        ) : ('')
    }
}


const mapStateToProps = (state) => {
    return {
        cropperMaxWidth:state.profile.buf.cropper.maxWidth,
        cropperMaxHeight:state.profile.buf.cropper.maxHeight,
        cropperFile:state.profile.buf.cropper.file,
        cropperActive:state.profile.buf.cropper.state,
        cropperData:state.profile.buf.cropper,
        userState: state.user,

    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setCropperInstance: (instance) => {
            dispatch({type : 'SET_CROPPER_INSTANCE', payload:instance})
        },
        onChangeAvatar: (fileUrl)=>{
            dispatch({type : 'POPUP_REDACT_AVATAR_CHANGE', payload:fileUrl})
        },
        onChangePersonalBackground: (fileUrl)=>{
            dispatch({type : 'POPUP_REDACT_PERSONAL_BACKGROUND_CHANGE', payload:fileUrl})
        },
        onDeactivateCropper:()=>{
            dispatch({type : 'DEACTIVATE_PROFILE_REDACT_IMAGE_CROPPER', payload:null})
        },
        onSetCropperFile:(file) => {
            dispatch({type : 'SET_CROPPER_FILE', payload:file})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCropper)
