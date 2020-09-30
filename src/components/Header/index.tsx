import React from 'react';
// import { useAuth } from 'hooks/auth';

// import { FiLogOut } from 'react-icons/fi';
import { Wrapper, Content } from './styles';
import logoImg from 'assets/logo_horizontal_positiva.png';

// interface UserFields {
//   displayName: string;
//   email: string;
//   photoURL: string;
// }

const Header: React.FC = () => {
  // const { signOut, currentUser } = useAuth();

  // const handleSignOut = useCallback(async () => {
  //   await signOut();
  // }, [signOut]);

  return (
    <Wrapper>
      <Content>
        <img src={logoImg} alt="Logo Zoly" />
        {/* <aside> */}
        {/* <Notifications /> */}
        {/* <Profile>
            <div>
              {/* !TODO static */}
        {/* <strong>{currentUser?.displayName}</strong>
              <p>{currentUser?.email}</p>
            </div>
            {currentUser?.photoURL ? (
              <img
                src={currentUser?.photoURL}
                alt={currentUser?.displayName || ''}
              />
            ) : (
              <img
                src="https://api.adorable.io/avatars/152/abott@adorable.png"
                alt="Generic Avatar"
              />
            )}
          </Profile> */}

        {/* <SignOutButton onClick={handleSignOut}>
            <FiLogOut size={24} />
          </SignOutButton> */}
        {/* </aside> */}
      </Content>
    </Wrapper>
  );
};

export default Header;
