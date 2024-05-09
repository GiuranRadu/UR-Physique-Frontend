import { useState } from 'react';
import styles from './Gallery.module.css'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmDialog from '../../../Partials/ConfirmDialog';
import toast, { Toaster } from 'react-hot-toast';
import { toastSuccessObj } from '../../../Utils/utilObjects'
import EmptyGallery from './EmptyGallery';

const API_URL = "https://ur-physique-backend.onrender.com"
// const API_URL = "http://localhost:3000/upload"

function Pagination({ updatedGallery, setUpdatedGallery, userId , setIsLoggedIn }) {

  // let x = reverse(); //note: Does not work , because we are mutating the original array
  let reversedGallery = [...updatedGallery].reverse(); // Using spread operator does the trick
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2; // select how many items to display per page
  const lastIndex = currentPage * itemsPerPage; // 1 * 6 = 6 || 2 * 6 = 12
  const firstIndex = lastIndex - itemsPerPage; // 6 - 6 = 0  || 12 - 6 = 6
  const records = reversedGallery.slice(firstIndex, lastIndex); // set which items to display 1-2, 3-4 or 5-6 or 7-8 etc...
  const pagesNumber = Math.ceil(reversedGallery.length / itemsPerPage); // if division result >= 1.01 -> return 2 pages
  const numbers = [...Array(pagesNumber + 1).keys()].slice(1); // create numbers (to insert in buttons)

  function prevPage() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  function changeCurrentPage(nr) {
    setCurrentPage(nr);
  }

  function nextPage() {
    if (currentPage < pagesNumber) setCurrentPage(currentPage + 1)
  }

  async function deletePictureButton(item) {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure you want to delete?',
      subtitle: "It will be deleted permanently",
      onConfirm: () => handleDeletePicture(item)
    })
  }

  async function handleDeletePicture(item) {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      const response = await fetch(`${API_URL}/gallery/removePictureFromGallery/${item._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'userId': userId })
      }).then((res) => res.json())

      if (response.status !== 'success')
        alert('Some error')
      if (response.status === 'success') {
        toast.success('Image Deleted Successfully', toastSuccessObj);
        setUpdatedGallery(response.data.gallery) //! this re-renders the gallery page (helpfull)
        setIsLoggedIn(response.data);
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={styles['gallery-div']}>
      <Toaster position="bottom-right" />

      {updatedGallery.length === 0 ? <h1>← Add Some Photos</h1> : <h1>Gallery</h1>}
      {updatedGallery.length === 0 && <EmptyGallery />}
      {updatedGallery.length > 0 && <nav className={styles['pagination-container']}>
        <button className={styles['prev-button']} onClick={prevPage}> <span><IoIosArrowBack /></span> Prev</button>
        <div className={styles['pagination-div']}>
          {
            numbers.map((n, i) => (
              <button key={i} className={`${styles['page-item-button']} ${n === currentPage ? styles['active'] : ''}`} onClick={() => changeCurrentPage(n)}>{n}</button>
            ))
          }
        </div>
        <button className={styles['next-button']} onClick={nextPage}>Next <span><IoIosArrowForward /></span></button>
      </nav>}

      <div className={styles['gallery-container']}>
        {records.map((item, i) => (
          <div key={i} className={styles['outside-gallery-item']}>

            <div key={i} className={styles['gallery-item']}>
              <div className={styles['image-div']}>
                <img src={item.picture} alt="item picture" />
              </div>
              <p className={styles['info-p']}>“ {item.description} ”</p>
              <span className={styles['trash-icon-span']} onClick={() => deletePictureButton(item)}><FaRegTrashAlt /></span>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  )
}

export default Pagination
