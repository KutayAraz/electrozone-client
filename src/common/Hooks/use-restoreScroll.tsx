import { useEffect, useLayoutEffect } from 'react';

const useRestoreScroll = () => {
    useLayoutEffect(() => {
        // Function to save the current scroll position
        const saveScrollPosition = () => {
            sessionStorage.setItem('scrollPosition', window.scrollY);
        };

        // Function to restore the scroll position
        const restoreScrollPosition = () => {
            const savedPosition = sessionStorage.getItem('scrollPosition');
            if (savedPosition) {
                setTimeout(() => {
                    window.scrollTo(0, parseFloat(savedPosition));
                    console.log("I ran")
                }, 100); // Adjust delay as necessary
            }
        };

        // Call restore function when the component mounts
        restoreScrollPosition();

        // Set up beforeunload event listener to save the scroll position
        window.addEventListener('beforeunload', saveScrollPosition);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', saveScrollPosition);
        };
    }, []);
};

export default useRestoreScroll;
