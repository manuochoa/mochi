import gsap from "gsap/all";
import { createContext, useEffect, useRef, useState } from "react";

export const NotificationContext = createContext('notificationContext');

export default function NotificationProvider({ children }) {
    const [notification, setNotification] = useState("");
    const notificationElement = useRef(null);

    function initNotificationTimeline() {

        gsap.set(notificationElement.current, {
            yPercent: 200,
            autoAlpha: 0
        });

        gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: 'Power4.out'
            }
        }).to(notificationElement.current, {
            yPercent: 0,
            autoAlpha: 1
        }, 0).to(notificationElement.current, {
            yPercent: 200,
            autoAlpha: 0,
            duration: 0.35
        }, 2).call(() => {
            setNotification("");
        });
    }

    useEffect(() => {
        if (notification) {
            initNotificationTimeline();
        }
    }, [notification]);

    return (
        <NotificationContext.Provider value={{ notificationElement, notification, setNotification }}>
            {children}
            {notification && <div className="notification" ref={notificationElement}>{notification}</div>}
        </NotificationContext.Provider>
    )
}
