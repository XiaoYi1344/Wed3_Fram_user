import React from 'react';
import MainLayout from './MainLayout/MainLayout';
import Counting from './Counting/Counting';
import Service from './Service/Service';
import People from './People/People';

const About = () => {
  return (
    <>
      <MainLayout />
      <Counting />
      <People />
      <Service />
    </>
  );
};

export default About;
