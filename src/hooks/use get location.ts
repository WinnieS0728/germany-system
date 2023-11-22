import { useMemo, useCallback, useEffect, useState } from "react";

type location = {
    latitude: number| undefined,
    longitude: number| undefined
}


export function useGetLocation() {
    const [location, setLocation] = useState<location>({
        latitude: undefined,
        longitude: undefined
    })
    const options = useMemo(() => {
        return {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
    }, []);

    const success: PositionCallback = useCallback((pos) => {
        const crd = pos.coords;        
        setLocation({
            latitude: crd.latitude,
            longitude: crd.longitude
        })
    }, []);

    const errors: PositionErrorCallback = useCallback((err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        console.log('瀏覽器不給抓位置');
                        
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [errors, options, success]);


    const googleMapUrl = `https://www.google.com.tw/maps/place/${location.latitude},${location.longitude}`

    const iframeSrc = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3638.4662045371733!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDEzJzMxLjciTiAxMjDCsDM3JzQxLjciRQ!5e0!3m2!1szh-TW!2stw!4v1700208881655!5m2!1szh-TW!2stw`



    return {
        location,
        googleMapUrl,
        iframeSrc
    }
}