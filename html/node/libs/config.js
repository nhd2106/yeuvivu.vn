export const BACKEND = () => {
    if (process.env.NODE_ENV === 'development') return 'http://localhost:1337';
    // if (window.location.href.indexOf('stedu.vn') !== -1) return 'https://backend.stedu.vn:1237';
    return 'https://yeuvivu.vn:1337';
  };

