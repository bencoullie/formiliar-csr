import { useForm } from 'react-hook-form'
import styles from '../styles/Form.module.css'
import { useHistory } from 'react-router-dom'

type FormData = {
  name: string
  email: string
  age: number
  laundered: number
}

const emailRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
)

export default function PersonalDetails() {
  const { register, handleSubmit, errors } = useForm<FormData>()
  let history = useHistory()

  const onSubmit = (data: any) => {
    console.log('Submitted data:', data)
    history.push('/photos')
  }

  console.log('errors:', errors)

  return (
    <div className={styles.container}>
      <span className={styles['back-button']} onClick={() => history.goBack()}>
        🔙
      </span>

      <main className={styles.main}>
        <h1 className={styles.title}>Personal Details</h1>

        <p className={styles.description}>
          <b>Step 1</b>: Please give us data we are hungry.
        </p>

        <div className={styles.grid}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.card}>
              <h3>Name</h3>
              <p>Full name (including middle names).</p>
              <input
                className={errors.name && styles.errored}
                name="name"
                ref={register({ required: true })}
                type="text"
              />
              {errors.name && (
                <p className={styles.helperText}>Please provide a name.</p>
              )}
            </div>

            <div className={styles.card}>
              <h3>Email</h3>
              <p>Please provide a legitimate email address.</p>
              <input
                className={errors.email && styles.errored}
                name="email"
                ref={register({
                  required: true,
                  pattern: emailRegex,
                })}
                type="email"
              />
              {errors.email && (
                <p className={styles.helperText}>
                  Please provide a valid email.
                </p>
              )}
            </div>

            <div className={styles.card}>
              <h3>Age</h3>
              <p>How old are you? Must be over 18.</p>
              <input
                className={errors.age && styles.errored}
                name="age"
                ref={register({ required: true, min: 18, max: 120 })}
                type="number"
              />
              {errors.age && (
                <p className={styles.helperText}>Please provide a valid age.</p>
              )}
            </div>

            <div className={styles.card}>
              <h3>Money Laundered</h3>
              <p>How much money have you laundered before?</p>
              <input
                className={
                  errors.laundered
                    ? `${styles.errored} ${styles.slider}`
                    : styles.slider
                }
                name="laundered"
                ref={register({ max: 1 })}
                type="range"
                min="0"
                max="100000"
                defaultValue={0}
              />
              {errors.laundered && (
                <p className={styles.helperText}>Please don't launder money.</p>
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
