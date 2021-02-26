import React from 'react'
import { connect } from 'react-redux'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import firebase from "firebase";
import fileUploader from '../../../../actions/fileUploader';

const RedactPopupSectionImages = (state, placeholderData, cropperData, onDeactivateCropper, onActivateCropper, userState, onChangeAvatar, onChangePersonalBackground) => {
    
    const cropUserImage = (file, maxWidth, maxHeight, imageType) => {
        state.onDeactivateCropper()

        setTimeout(()=>{
            if (file !== undefined){
                state.onActivateCropper(file, maxWidth, maxHeight, imageType)
            }
        }, 0)
    }

    const loadImageToFirebase = (image, imageType) =>{
        console.log(image)
        if (image !== undefined){
            const storageRef = fileUploader.storage().ref()
            const fileRef = storageRef.child('user-' + imageType + state.userState.user.id)
            fileRef.put(image).then((response)=>{
                fileRef.getDownloadURL()
                .then((response) => {
                    console.log(response)
                    if (imageType === 'avatar'){
                        state.onChangeAvatar(response)
                    }
                    else if(imageType === 'personal-background'){
                        state.onChangePersonalBackground(response)
                    }
                })
            })
        }

    }

    const loadUserImage = (e, imageType) =>{
        const file = e.target.files[0];
        loadImageToFirebase(file, imageType)
    }


    return (
        <section className="popup-redact-section">
            <input type="file" name="userAvatarInput" onChange={(event) => {loadUserImage(event, 'avatar')}}/>
            <button onClick={cropUserImage.bind(this, state.placeholderData.photo_url, 120, 120, 'avatar')} >cropper</button>

            <input type="file" name="userBackgroundInput" onChange={(event) => {loadUserImage(event, 'personal-background')}}/>
            <button onClick={cropUserImage.bind(this, state.placeholderData.profile_background, 700, 160, 'personal-background')} >cropper</button>

        </section>
    )
}

const mapStateToProps = (state) =>{
    return {
        state: state,
        profileState: state.profile,
        userState: state.user,
        placeholderData: state.profile.placeholder,
        cropperData:state.profile.buf.cropper
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onActivateCropper:(file, maxWidth, maxHeight, imageType)=>{
            dispatch({type : 'ACTIVATE_PROFILE_REDACT_IMAGE_CROPPER', payload:[file, maxWidth, maxHeight, imageType]})
        },
        onDeactivateCropper:()=>{
            dispatch({type : 'DEACTIVATE_PROFILE_REDACT_IMAGE_CROPPER', payload:null})
        },
        onChangeAvatar: (fileUrl)=>{
            dispatch({type : 'POPUP_REDACT_AVATAR_CHANGE', payload:fileUrl})
        },
        onChangePersonalBackground: (fileUrl)=>{
            dispatch({type : 'POPUP_REDACT_PERSONAL_BACKGROUND_CHANGE', payload:fileUrl})
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(RedactPopupSectionImages)
