import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 6%;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const VerifiedBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #FFA500;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const Username = styled.h2`
  color: white;
  margin: 5px 0;
`;

const Subtitle = styled.span`
  color: #888;
  font-size: 14px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const MenuItem = styled.li`
  background-color: #1E1E1E;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  border: 1px solid #FFA500;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: 15px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  justify-content: space-between;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 15px;
  font-size: 20px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIcon = styled.span`
  font-size: 20px;
`;

const Profile = () => {
  return (
    <>
    <Navbar/>
    <Container>
      <ProfileSection>
        <AvatarContainer>
          <Avatar src="path_to_pink_monster_avatar.jpg" alt="Profile" />
          <VerifiedBadge>✓</VerifiedBadge>
        </AvatarContainer>
        <Username>GFXAgency</Username>
        <Subtitle>username</Subtitle>
      </ProfileSection>
      <MenuList>
        <MenuItem>
          <MenuLink href="/Bank">
            <IconText>
              <Icon>🏦</Icon>
              Bank Accounts
            </IconText>
            <ArrowIcon>▶</ArrowIcon>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="/Transaction">
            <IconText>
              <Icon>📊</Icon>
              Transaction History
            </IconText>
            <ArrowIcon>▶</ArrowIcon>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">
            <IconText>
              <Icon>🎁</Icon>
              Refer And Earn
            </IconText>
            <ArrowIcon>▶</ArrowIcon>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">
            <IconText>
              <Icon>📞</Icon>
              Contact Us
            </IconText>
            <ArrowIcon>▶</ArrowIcon>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="#">
            <IconText>
              <Icon>🚪</Icon>
              Logout
            </IconText>
            <ArrowIcon>▶</ArrowIcon>
          </MenuLink>
        </MenuItem>
      </MenuList>
    </Container>
    <Footer/>
    </>
  );
};

export default Profile;