import { useEffect, useState } from 'react';

export default function useSmallScreen(size) {
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        function handleMobileScreen() {
            setSmallScreen(window.innerWidth < size);
        }

        handleMobileScreen();

        window.addEventListener("resize", handleMobileScreen);

        return () => {
            window.removeEventListener("resize", handleMobileScreen);
        };
    }, [size]);

    return smallScreen
}
