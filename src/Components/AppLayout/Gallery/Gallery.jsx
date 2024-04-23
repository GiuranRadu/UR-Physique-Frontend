import { useContext, useState } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import styles from './Gallery.module.css'
import Pagination from "./Pagination"
import upload_area from '../../../Assets/upload_area.svg'
import photo_hero from '../../../Assets/Photo-hero.png'

import toast, { Toaster } from 'react-hot-toast';
import { toastErrorObj, toastSuccessObj } from '../../../Utils/utilObjects'



function Gallery() {
  const { isLoggedIn: { gallery, _id } } = useContext(AuthContext)
  const [updatedGallery, setUpdatedGallery] = useState(gallery)

  const [addPhotoMode, setAddPhotoMode] = useState(false)
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(false)
  function imageHandler(e) {
    setImage(e.target.files[0])
  }

  async function uploadImagetoDB() {
    try {
      if (!image) return toast.error('No image', toastErrorObj);
      if (!description) return toast.error('No description', toastErrorObj);

      let formData = new FormData();
      formData.append('picture', image)

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      }).then((res) => res.json())

      if (response.success) {
        let itemToUpload = {
          userId: _id,
          description: description,
          picture: response.image_url
        }
        await fetch('http://localhost:3000/gallery/addPictureToGallery', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemToUpload)
        }).then((resp) => resp.json()).then((data) => {
          // console.log(data.user.gallery);
          setUpdatedGallery(data.user.gallery) //! this re-renders the gallery page (helpfull)
          if (data.status === 'success') {
            setDescription('')
            setImage(null)
          } else {
            alert('Failed')
          }
          localStorage.setItem('loggedUser', JSON.stringify(data.user));
          toast.success('Image Uploaded', toastSuccessObj);
          // location.reload();
        })
      }
    } catch (error) {
      toast.error('Failed while uploading image', toastErrorObj);
    }
  }


  return (
    <div className={styles.container}>
      <Toaster position="bottom-right" />

      <button onClick={() => setAddPhotoMode(!addPhotoMode)}>
        {addPhotoMode ? 'See Gallery' : 'Add Photo'}</button>
      {
        addPhotoMode ?
          <div className={styles['gallery-div']}>
            <div className={styles['add-photo-container']}>
              <div className={styles['some-text-div']}>
                <h1>File Upload</h1>
                <ul>
                  <li>Capture your <span className={styles.yellowSpan}>favorite</span> moments.</li>
                  <li>Monitor your progress.</li>
                  <li>Embrace the joy of your <span className={styles.greenSpan}>well-being.</span></li>
                  <li>Stay <span className={styles.redSpan}>motivated</span>, stay healthy, and don`t forget to <span className={styles.yellowSpan}>smile</span>  along the way!</li>
                </ul>

                <div className={styles['photo-div']}>
                  <img src={photo_hero} alt="hero img" />
                </div>
              </div>
              {/*//! FORM  */}
              <div className={styles['form-div']}>
                <div style={{ overflow: "hidden" }}>
                  <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} />
                    <input onChange={imageHandler} type="file" id='file-input' hidden />
                  </label>
                </div>
                
                <div>
                  <input value={description} type="text" placeholder="Type here a description..." onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                  <button className={styles['upload-btn']} onClick={uploadImagetoDB}>Upload</button>
                </div>

              </div>
            </div>

          </div>
          :
          <Pagination updatedGallery={updatedGallery} setUpdatedGallery={setUpdatedGallery} userId={_id} />
      }
    </div>
  )
}

export default Gallery
