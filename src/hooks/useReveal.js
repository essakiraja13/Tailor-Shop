import { useEffect, useRef } from 'react';

export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );

    // Support multiple children with .reveal class
    const reveals = el.querySelectorAll('.reveal');
    if (reveals.length > 0) {
      reveals.forEach(r => observer.observe(r));
    } else {
      el.classList.add('reveal');
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
