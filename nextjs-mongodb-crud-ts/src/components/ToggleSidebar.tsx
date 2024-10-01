"use client";

export const ToggleSidebar = () => {

    const toggleSidebar = () => {
        document.body.classList.toggle('showSidebar');
    }

    return (
        <button className="toggle-menu" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}
