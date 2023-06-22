import CloseIcon from '@/icons/CloseIcon'
import MenuIcon from '@/icons/MenuIcon'
import React from 'react'

type Props = {
    navbarOpen: boolean,
    setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuButton = ({ navbarOpen, setNavbarOpen }: Props) => {

    return (
        <button
            className="w-[40px] h-[40px] text-gray-200 hover:text-white  cursor-pointer flex justify-center items-center lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}>
            {navbarOpen ? <CloseIcon className='fill-current' /> : <MenuIcon className='fill-current' />}
        </button>
    )

}

export default MenuButton