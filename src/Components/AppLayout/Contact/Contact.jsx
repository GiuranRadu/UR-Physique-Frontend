import styles from './Contact.module.css'

function Contact() {
  return (
    <div className={styles['container']}>
      <div className={styles['left-div']}>
        <h1>Contact Us</h1>
        <form action="submit">
          <div className={styles['input-div']}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Enter your Name' />
          </div>

          <div className={styles['input-div']}>
            <label htmlFor="name">Email</label>
            <input type="text" id="email" placeholder='Enter a valid email address' />
          </div>

          <div className={styles['input-div']}>
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Enter your message here"></textarea>
          </div>

          <div className={styles['checkbox-div']}>
            <input type="checkbox" />
            <p>I accept <span>Terms Of Service</span></p>
          </div>
        </form>
        <button>SUBMIT</button>
      </div>

      <div className={styles['center-div']}>
        <div>
          <h1>Call Us</h1>
          <h2>+40 722 751 363</h2>
          <h2>1 (234) 987-654</h2>
        </div>
        <div>
          <h1>OUR TOP SERVICES</h1>
          <h2>Open Air Activities</h2>
          <h2>Fitness Classes</h2>
          <h2>Full-body Strength</h2>
          <h2>Aerobics Classes</h2>
        </div>
        <div>
          <h1>Location</h1>
          <h2>Ramnicu Valcea, Jud.Valcea, Romania</h2>
          <h2>Str. Republicii 35</h2>
        </div>
      </div>
      <div className={styles['maps-div']}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.3745433830177!2d24.369426111517633!3d45.11874545630155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474d38c952578ce7%3A0xba02f7f24206f8ae!2sStrada%20Republicii%2037-35%2C%20R%C3%A2mnicu%20V%C3%A2lcea%20247065!5e0!3m2!1sro!2sro!4v1713080227548!5m2!1sro!2sro" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" ></iframe>
      </div>
    </div>
  )
}

export default Contact
