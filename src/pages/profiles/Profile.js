import React from 'react';
// router
import { useHistory } from "react-router";
// bootstrap
import { Button } from 'react-bootstrap';
// custom css
import styles from '../../styles/Profile.module.css';

const Profile = (props) => {

  const {
    id, owner, name, image,
  } = props

  const history = useHistory();


  return (
    <>
      <div className={styles.ProfileHeader}>

        <div className={styles.ProfileImage}>
          < img src={image} alt="profile" loading="lazy"/>
        </div>

        <div>
          <h1>Hi, {name ? name : owner}</h1>
          <Button
            className={styles.FormBtn}
            onClick={() => history.push(`/profiles/${id}/edit`)}
          >
            Edit profile information
          </Button>
        </div>
      </div>

      <div className={styles.ProfileDetail}>
        <ul>
          <li>
          <Button
              className={styles.FormBtn}
              onClick={() => history.push(`/profiles/${id}/edit/username`)}
            >
              <i className='fas fa-edit' />
            </Button>
            Username: {owner}
            
          </li>
          <li>
          <Button
              className={styles.FormBtn}
              onClick={() => history.push(`/profiles/${id}/edit/password`)}
            >
              <i className='fas fa-edit' />
            </Button>
            Password: *********
          </li>

        </ul>
      </div>

    </>
  )
}

export default Profile
