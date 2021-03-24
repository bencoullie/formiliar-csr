import { useForm } from 'react-hook-form'
import styles from '../styles/Form.module.css'
import { useHistory } from 'react-router-dom'
import Webcam from 'react-webcam'
import { useRef, useCallback, useState } from 'react'

type FormData = {
  photo: File
}

export default function PersonalDetails() {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [selfy, setSelfy] = useState()
  const [wallpaper, setWallpaper] = useState('')
  const webcamRef = useRef<any>(null)
  let history = useHistory()

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setSelfy(imageSrc)
  }, [webcamRef])

  const handleWallpaperUpload = (event: any) => {
    const wallpaper = URL.createObjectURL(event.target.files[0])
    setWallpaper(wallpaper)
  }

  const onSubmit = (data: any) => {
    capture()
    data.selfy = selfy
    console.log('Submitted data:', data)

    window.setTimeout(() => history.push('/?isFinished=true'), 3000)
  }

  console.log('errors:', errors)

  return (
    <div className={styles.container}>
      <span className={styles['back-button']} onClick={() => history.goBack()}>
        🔙
      </span>

      <main className={styles.main}>
        <h1 className={styles.title}>Photo!</h1>

        <p className={styles.description}>
          <b>Step 2</b>: Now we want your face please and thank you.
        </p>

        <div className={styles.grid}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.card}>
              <h3>Favorite Wallpaper</h3>
              <p>This is very important, must be gucci!</p>
              <input
                className={errors.photo && styles.errored}
                type="file"
                name="photo"
                ref={register({ required: true })}
                onChange={(e) => handleWallpaperUpload(e)}
              />
              {errors.photo && (
                <p className={styles.helperText}>We need that photo!</p>
              )}
              {wallpaper && (
                <img
                  src={wallpaper}
                  alt="it wallpaper"
                  className={`${styles.image} ${styles.wallpaper}`}
                />
              )}
            </div>

            <div className={styles.card}>
              <h3>Selfy</h3>
              <p>Now give us your face.</p>
              {selfy ? (
                <img src={selfy} alt="it me" className={styles.image} />
              ) : (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  className={styles.camera}
                />
              )}
            </div>

            <div className={styles.card}>
              <input type="submit" className={styles.submit} value="Submit" />
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
