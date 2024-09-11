import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';
import { toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

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

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #FFA500;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
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
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  color: black;
  border: 1px solid #FFA500;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: 15px;
  color: black;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 300px;
  width: 90%;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #FFA500;
  color: white;
`;

const CancelButton = styled(ModalButton)`
  background-color: #ccc;
  color: #333;
`;

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const email = localStorage.getItem('token');
    if (email) {
      try {
        const response = await fetch(`https://crypto-anl6.onrender.com/users/get/${email}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserEmail(data.Email);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('No email found in local storage');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <Container><p>Loading...</p></Container>;

  const getInitial = email => email.charAt(0).toUpperCase();

  return (
    <>
      <Navbar />
      <Container>
        <ProfileSection>
          <AvatarContainer>
            <Avatar>{getInitial(userEmail)}</Avatar>
            <VerifiedBadge>✓</VerifiedBadge>
          </AvatarContainer>
          <Username>{userEmail}</Username>
          <Subtitle>email</Subtitle>
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
            <MenuLink href="/Refer">
              <IconText>
                <Icon>🎁</Icon>
                Refer And Earn
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/contactus">
              <IconText>
                <Icon>📞</Icon>
                Contact Us
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem onClick={openLogoutModal}>
            <MenuLink>
              <IconText>
                <Icon>🚪</Icon>
                Logout
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
        </MenuList>
      </Container>
      {/* <HomeContact/> */}
      {/* <Footer /> */}
      
      {showLogoutModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Are you sure you want to log out?</ModalTitle>
            <ConfirmButton onClick={confirmLogout}>Leave</ConfirmButton>
            <CancelButton onClick={closeLogoutModal}>Stay</CancelButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Profile;