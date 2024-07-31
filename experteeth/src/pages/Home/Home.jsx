import React from 'react'
import Button from '@mui/material/Button';
import BackgroundCarousel from '../../components/containers/carousel/BackgroundCarousel/BackgroundCarousel';
import WelcomeColumn from '../../components/containers/column/WelcomeColumn/WelcomeColumn';
import ServiceGrid from '../../components/containers/grid/AllServiceGrid/ServiceGrid';
import ProfileCarousel from '../../components/containers/carousel/ProfileCarousel/ProfileCarousel';
import GeneralInformationColumn from '../../components/containers/column/GeneralInformationColumn/GeneralInformationColumn';

const Home = () => {
  return (
    <div>
      <BackgroundCarousel></BackgroundCarousel>
      <WelcomeColumn></WelcomeColumn>
      <ServiceGrid></ServiceGrid>
      <ProfileCarousel></ProfileCarousel>
      <GeneralInformationColumn></GeneralInformationColumn>
    </div>
  )
}

export default Home
