import { Outlet } from 'react-router-dom';
import Footer from '../Components/HomePage/Footer'
import Header from '../Components/HomePage/Header'

export default function Layout(){
    return(
        <>
        <Header/>
        <main className="pt-20">
            <Outlet/>
        </main>
        <Footer/>
        </>
    );
}