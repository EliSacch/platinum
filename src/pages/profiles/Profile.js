import React from 'react';

import styles from '../../styles/Profile.module.css';

const Profile = (props) => {

    const {
        id, owner, name, image,
    } = props

  return (
    <div className={styles.ProfileHeader}>
        <div className={styles.ProfileImage}>
        <img src={image} alt="profile"/>
      </div>
      <h1>Hi, {name ? name : owner}</h1>
    </div>
  )
}

export default Profile
