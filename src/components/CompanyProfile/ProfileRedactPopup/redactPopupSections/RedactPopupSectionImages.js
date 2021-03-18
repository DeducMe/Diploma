import React from 'react'
import { connect } from 'react-redux'
import "cropperjs/dist/cropper.css";
import fileUploader from '../../../../actions/fileUploader';
import cropIcon from '../../../../img/crop.svg'


const RedactPopupSectionImages = (state) => {
    
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

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e, imageType) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files);
        loadImageToFirebase(files[0], imageType)

    }



    return (
        <section className="popup-redact-section">
            <div className="drop-container" 
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={(event)=>{fileDrop(event, 'avatar')}}
            >
                <input type="file" id="file-avatar" hidden name="userAvatarInput" onChange={(event) => {loadUserImage(event, 'avatar')}}/>
                <label className="file-input rounded sup-btn" htmlFor="file-avatar">Загрузить аватар</label>
                
                <button className="cropper-activate-btn" onClick={cropUserImage.bind(this, state.placeholderData.photo_url, 120, 120, 'avatar')}>
                    <img src={cropIcon} alt="обрезать"/>
                </button>
          
                <div className="drop-message">
                    <div className="upload-icon"></div>
                </div>
            </div>

            <div className="drop-container" 
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={(event)=>{fileDrop(event, 'personal-background')}}
            >
                <input type="file" id="file-back" hidden name="userBackgroundInput" onChange={(event) => {loadUserImage(event, 'personal-background')}}/>
                <label className="file-input rounded sup-btn" htmlFor="file-back">Загрузить задний фон</label>

                <button className="cropper-activate-btn" onClick={cropUserImage.bind(this, state.placeholderData.profile_background, 700, 160, 'personal-background')}>
                    <img src={cropIcon} alt="обрезать"/>
                </button>

                <div className="drop-message">
                    <div className="upload-icon"></div>
                    
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) =>{
    return {
        state: state,
        profileState: state.companyProfile,
        userState: state.user,
        placeholderData: state.companyProfile.placeholder,
        cropperData:state.companyProfile.buf.cropper
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onActivateCropper:(file, maxWidth, maxHeight, imageType)=>{
            dispatch({type : 'PROFILE_EMPLOYER_REDACT_ACTIVATE_IMAGE_CROPPER', payload:[file, maxWidth, maxHeight, imageType]})
        },
        onDeactivateCropper:()=>{
            dispatch({type : 'PROFILE_EMPLOYER_REDACT_DEACTIVATE_IMAGE_CROPPER', payload:null})
        },
        onChangeAvatar: (fileUrl)=>{
            dispatch({type : 'PROFILE_EMPLOYER_REDACT_AVATAR_CHANGE', payload:fileUrl})
        },
        onChangePersonalBackground: (fileUrl)=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_PERSONAL_BACKGROUND_CHANGE', payload:fileUrl})
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(RedactPopupSectionImages)
