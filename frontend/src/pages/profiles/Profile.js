import React from 'react'
import styles from '../../styles/Profile.module.css'
import btnStyles from '../../styles/Button.module.css'
import Avatar from '../../components/Avatar'
import { useCurrentUser } from '../../contexts/CurrentUserContexts';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const Profile = (props) => {
    const {profile, mobile, imageSize=55} = props;
    const {id, following_id, image, owner} = profile;

    const currentUser = useCurrentUser()
    const isOwner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    const toggleFavorite = () => {
        if (following_id) {
            handleUnfollow(profile);
        } else {
            handleFollow(profile);
        }
    };

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && 'flex-column'}`}>
        <div>
            <Link className='align-self-center' to={`/profiles/${id}`}>
            <Avatar src={image} height={imageSize}/>
            </Link>
        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
            <strong>{owner}</strong>
        </div>
        <div className={`text-right ${!mobile && 'ml-auto'}`}>
            {!mobile && currentUser && !isOwner && (
                following_id ? (
                    <Button
                    className={btnStyles.Button}
                    style={{ backgroundColor: 'purple' }}
                    onClick={() => handleUnfollow(profile)}>unfollow</Button>
                ): (
                    <Button
                    className={`${btnStyles.Button} 
                    ${btnStyles.Black}`}
                    onClick={() => handleFollow(profile)}>follow</Button>
                )
            )}
        </div>
        <div>
            <i className="fas fa-solid-heart"></i>
            <p>Favorite Renter</p>
        </div>
    </div>
  )
}

export default Profile