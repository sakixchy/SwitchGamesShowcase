import React from 'react'
import { Container } from 'react-bootstrap'
import appStyles from '../../App.module.css'
import Asset from '../../components/Asset'
import Profile from '../profiles/Profile'
import { useProfileData } from '../../contexts/ProfileDataContext'

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData()

  return (
    <Container
      className={`${appStyles.Content} ${mobile ? 'd-lg-none text-center mb-3' : ''}`}
    >
      <p>Most followed profiles.</p>
      {popularProfiles.results.length
        ? (
            mobile
              ? (
          <div className="d-flex justify-content-around">
            {popularProfiles.results.slice(0, 4).map((profile) => (
              <Profile key={profile.id} profile={profile} mobile />
            ))}
          </div>
                )
              : (
          <>
            {popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
          </>
                )
          )
        : (
        <Asset spinner />
          )}
    </Container>
  )
}

export default PopularProfiles
