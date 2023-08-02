import { useState, useEffect } from 'react';

const useWindowScreenSize = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    
    const handleScreenChange = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        handleScreenChange();
        window.addEventListener('resize', handleScreenChange);
        return () => window.removeEventListener("rezise", handleScreenChange);
    }, [])

    return [width, height];
}

export default useWindowScreenSize