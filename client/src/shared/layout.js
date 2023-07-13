import styled from 'styled-components';
import { useAuth } from '../context/auth';

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background-color: #f2f2f2;
    padding: 0 16px;
`;

const ProjectTitle = styled.h1`
    margin: 0;
    font-size: 20px;
`;

const UserLogo = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;


const Layout = ({ children }) => {
    const { profile, logout } = useAuth();
    return (
        <>
            <NavbarContainer>
                <ProjectTitle>Expense Tracker</ProjectTitle>
                <Spacer />
                { profile && (
                    <div onClick={logout}>
                        Logout
                    </div>)
                }
            </NavbarContainer>
            <div>{ children }</div>
        </>
    )
}

export default Layout;