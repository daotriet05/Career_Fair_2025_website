import { useEffect, useRef, useState } from 'react';

export default function LazyImage({ src, alt = '', className = '', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={visible ? src : ''}
      alt={alt}
      className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
      loading="lazy"
      {...rest}
    />
  );
}
