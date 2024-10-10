import { Link } from '@mui/material';
import Logo from './Logo';
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';


export default function Header() {

    return (
        <>
            <header className='fixed top-0 left-0 right-0 z-50 h-20 w-100% shadow-md bg-white'>
                <div className='h-full container max-w-full mx-auto flex items-center px-4 justify-between'>
                    <div className='flex items-center px-2 justify-between'>
                        <div className=''>
                            <Link to={"/"}>
                                <Logo w={60} h={70} />
                            </Link>
                        </div>

                        <div className=' font-serif font-bold text-3xl'>
                            FOZYR Store
                        </div>
                    </div>

                    <div className='hidden lg:flex items-center w-full  max-w-sm border  rounded-full focus-within:shadow-sm pl-3 '>
                        <input type='text' placeholder='search product here...' className='w-11/12 outline-none border-none bg-transparent' />
                        <div className='text-lg min-w-[50px] h-11 bg-amber-400 text-white flex justify-center items-center rounded-r-full cursor-pointer'>
                            <FaSearch />
                        </div>
                    </div>

                    <div className='flex items-center justify-end space-x-4 '>
                        <FaHeart className='text-lg cursor-pointer' />
                        <FaShoppingCart className='text-lg cursor-pointer' />
                        

                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5  bg-white px-3 py-2 text-sm font-semibold text-gray-900  ">
                                    <FaUser className='text-lg' />
                                    
                                </MenuButton>
                            </div>


                            <MenuItems 
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                        <div>
                                            <MenuItem>
                                                <Link
                                                    href='#'
                                                    className="block px-4 py-2 text-sm text-center text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                                >
                                                    Log in
                                                </Link></MenuItem>
                                            <MenuItem>
                                                <Link
                                                    href='#'
                                                    className="block px-4 py-2 text-sm text-center text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                                >
                                                    Register
                                                </Link>
                                            </MenuItem>


                                    </div>
                                </MenuItems>


{/* 
                            {auth.user ? (
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 h-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">

                                    

                                        <MenuItem>
                                            <Link
                                                href={route('dashboard')}
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                            >
                                                Profil
                                            </Link>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            ) : (
                                <>

                                    <MenuItems 
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                        <div>
                                            <MenuItem>
                                                <Link
                                                    href={route('login')}
                                                    className="block px-4 py-2 text-sm text-center text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                                >
                                                    Log in
                                                </Link></MenuItem>
                                            <MenuItem>
                                                <Link
                                                    href={route('register')}
                                                    className="block px-4 py-2 text-sm text-center text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                                >
                                                    Register
                                                </Link>
                                            </MenuItem>


                                    </div>
                                </MenuItems>
                        </>
                            )}
 */}

                    </Menu>
                </div>


                <div className="">

                </div>
            </div>
        </header >
        </>
    );
}