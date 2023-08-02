import React from 'react';
import {setIsAuth, setUserData, setIsLoading, User} from "./store/userReducer";
import { useJwt } from "react-jwt";
import {useAppDispatch, useAppSelector} from "./hook";
import {Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./tsx/layouts/MainLayout";
import Contacts from "./tsx/pages/Contacts";
import CreateContact from "./tsx/pages/CreateContact";
import PageNotFound from "./tsx/pages/PageNotFound";
import SignIn from "./tsx/pages/SignIn";

const App: React.FC = () => {
    const token = localStorage.getItem('token') || ''
    const dispatch = useAppDispatch()
    const {isAuth, isLoading} = useAppSelector(state => state.user)
    const { decodedToken, isExpired } = useJwt(token);

    React.useEffect(() => {
        dispatch(setIsAuth(!!token))
    }, [])

    React.useEffect(() => {
        if (isExpired) dispatch(setUserData(decodedToken as User))
        else dispatch(setUserData({}))
        dispatch(setIsLoading(false))
    }, [decodedToken])

  return (
    <div className="App">
      <Routes>
        <Route path="" element={ isAuth || isLoading ? <MainLayout /> : <Navigate to="/sign-in" /> } >
            <Route path="/contact" element={<Contacts />} />
            <Route path="/create-contact" element={<CreateContact />} />
        </Route>

          <Route path="/sign-in" element={ !isAuth || isLoading ? <SignIn /> : <Navigate to="/contact" /> } />

          <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  );
}

export default App;
