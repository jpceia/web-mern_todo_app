import styled from 'styled-components';
import Layout from './shared/layout';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './shared/ProtectedRoute';
import ExpenseForm from './components/ExpenseForm';
import ExpensesList from './components/ExpensesList';
import { Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { login } from './auth/authSlice';

const LoginContainer = ({ children }) => {
    return (
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        {children}
      </Container>
    );
  };


const LoginPage = () => {
    const { loading } = useSelector((state) => state.auth);
    //  <UserLogo src={userLogoUrl} alt="User Logo" />
    return (
        <LoginContainer>
        {
            loading
            ? <div>Loading...</div>
            : <Button variant="contained" color="primary" size="large" onClick={login}>LOGIN</Button>
        }
        </LoginContainer>
    );
};

const Home = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{ padding: '15px', margin: '0 auto' }}
        >
            <ExpenseForm />
            <ExpensesList />
        </Container>
    );
}


function App() {

    const profile = useSelector(state => state.auth.profile);
    return (
        <Layout>
            <Routes>
                <Route
                    path={"/"}
                    element={ <ProtectedRoute isAllowed={!!profile} redirectPath={"/login"} />}
                >
                    <Route path="/" element={<Home />} />
                </Route>

                <Route
                    path={"/login"}
                    element={ <ProtectedRoute isAllowed={!profile} redirectPath={"/"} />}
                >
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </Layout>
    );
}

export default App;
