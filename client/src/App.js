import styled from 'styled-components';
import Layout from './shared/layout';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/auth';
import ProtectedRoute from './shared/ProtectedRoute';
import ExpenseForm from './components/ExpenseForm';
import ExpensesList from './components/ExpensesList';
import Container from './components/Container';

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LoginButton = styled.button`
    padding: 12px 24px;
    font-size: 18px;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background-color: #1b9e49;
        color: #fff;
    }
`;


const LoginPage = () => {
    const { login, loading } = useAuth();
    //  <UserLogo src={userLogoUrl} alt="User Logo" />
    return (
        <LoginContainer>
        {
            loading 
            ? <div>Loading...</div>
            : <LoginButton onClick={login}>LOGIN</LoginButton>
        }
        </LoginContainer>
    );
};

const Home = () => {
    const expenses = [
        {
            id: 1,
            description: "Groceries",
            amount: 100,
            category: "food",
            paymentDate: "2021-01-01"
        },
        {
            id: 2,
            description: "Netflix",
            amount: 20,
            category: "entertainment",
            paymentDate: "2021-01-02"
        },
        {
            id: 3,
            description: "Car wash",
            amount: 50,
            category: "transportation",
            paymentDate: "2021-01-03"
        },
        {
            id: 4,
            description: "Salary",
            amount: 1000,
            category: "income",
            paymentDate: "2021-01-04"
        },
        {
            id: 5,
            description: "Groceries",
            amount: 100,
            category: "food",
            paymentDate: "2021-01-05"
        }
    ]
    return (
        <Container>
            <ExpenseForm />
            <ExpensesList expenses={expenses} />
        </Container>
    );
}

function App() {
    
    return (
        <AuthProvider>
            <AuthApp />
        </AuthProvider>
    );
}

function AuthApp() {
    const { profile } = useAuth();
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
