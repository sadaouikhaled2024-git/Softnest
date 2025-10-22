import { useEffect } from "react";

const useScrollAnimation = (className) => {
    useEffect(() => {
        const elements = document.querySelectorAll(`.${className}`);

        if (!elements.length) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // ✅ Stops observing after activation
                }
            });
        }, { threshold: 0.3 });

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [className]);
};

export default useScrollAnimation;
