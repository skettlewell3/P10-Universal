import { useEffect, useState } from "react";

export default function DashboardSnapshot({
    screens = [],
    interval = 5000,
    loopFrom = 0,
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (screens.length <= 1) return;

        const timer = setTimeout(() => {
            setActiveIndex(current => {
                const nextIndex = current + 1;

                return nextIndex < screens.length
                    ? nextIndex
                    : loopFrom;
            });
        }, interval);

        return () => clearTimeout(timer);
    }, [activeIndex, screens.length, interval, loopFrom]);

    if (!screens.length) return null;

    return (
        <div className="dashboardSnapshot">
            {screens[activeIndex]}
        </div>
    );
}