import React from 'react';
import { styled } from '@mui/material';

const Container = styled('div')({
  padding: '20px',
  backgroundColor: 'transparent',
  fontFamily: 'Arial, sans-serif',
  color: '#fff',
});

const Heading = styled('h1')({
  marginBottom: '20px',
  borderBottom: '2px solid #fff',
  paddingBottom: '10px',
  fontSize: '36px',
  textAlign: 'center',
});

const SubHeading = styled('h2')({
  marginBottom: '10px',
  fontSize: '24px',
  textAlign: 'center',
  fontStyle: 'italic',
});

const Paragraph = styled('p')({
  marginBottom: '20px',
  fontSize: '18px',
  lineHeight: '1.5',
  fontStyle: 'italic',
});

const LinkContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
});

const StyledLink = styled('a')({
  color: '#fff',
  textDecoration: 'none',
  fontStyle: 'italic',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

const Contact = () => {
  return (
    <Container>
      <Heading>Contact Me</Heading>
      <div>
        <SubHeading>📧 SHREYANK TAWADE</SubHeading>
        <SubHeading>📧 SAURABH GARAT</SubHeading>
        <Paragraph>
          Email: <br /> tawadeshreyank@gamil.com <br />
          Email: <br /> garatsaurabh@gmail.com
        </Paragraph>
      </div>
      <div>
        <SubHeading>🎓 Education</SubHeading>
        <Paragraph>
          Pursuing B.Tech Degree in Computer Science and Engineering (2021-25) <br />
          K.D.K COLLEGE OF ENGINEERING, NAGPUR
        </Paragraph>
      </div>
      
      <div>
        <p>
          
          <h1>Purpose : </h1>
          This Blog Portal was created to give everyone a voice. Whether it’s a personal journey, a learning experience, or an idea worth sharing, the platform empowers users to publish their stories and connect with readers who share similar interests.

By organizing blogs into meaningful categories, the portal helps readers discover content that resonates with their own journeys, making the experience both personal and impactful.

        </p>
      </div>
    </Container>
  );
};

export default Contact;
