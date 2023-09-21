import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
// context data
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom components
import Asset from '../../components/Asset';
import Profile from './Profile';
// custom css
import styles from '../../styles/Profile.module.css'


function ProfilePage() {

    const currentUser = useCurrentUser();
    const [profileData, setProfileData] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${currentUser.pk}/`);
                setProfileData({results: [data]});
                setHasLoaded(true);

            } catch(err) {
            
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
