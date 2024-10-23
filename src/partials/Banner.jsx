import React, { useState } from 'react';

function Banner() {

  const [bannerOpen, setBannerOpen] = useState(true);
  const query = new URLSearchParams(location.search);
  const template = query.get('template');
  
  return (
    <>
    { bannerOpen && (
      <div className="fixed bottom-0 right-0 z-50 w-full md:bottom-8 md:right-12 md:w-auto">
        
      </div>
    )}
    </>
  );
}

export default Banner;