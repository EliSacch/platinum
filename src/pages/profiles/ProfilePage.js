import React, { useEffect, useState } from 'react'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from '../../api/axiosDefaults'


import styles from '../../styles/Profile.module.css'
import Asset from '../../components/Asset';
import Profile from './Profile';

function ProfilePage() {

    const currentUser = useCurrentUser();
    const [profileData, setProfileData] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${currentUser.pk}`);
                setProfileData({results: [data]});
                setHasLoaded(true);

            } catch(err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchProfileData();
    }, [currentUser]);

  return (
    <section className={styles.OffsetTop}>
      {hasLoaded ? (
        <Profile {...profileData.results[0]} profilePage />
      ) : (
        <Asset spinner />
      )}
    </section>
  )
}

export default ProfilePage
