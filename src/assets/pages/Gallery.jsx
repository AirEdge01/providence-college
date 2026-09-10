import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';

const galleryPhotos = [
  { 
    id: 1, 
    caption: 'Matriculation Ceremony', 
    category: 'Events', 
    date: 'October 2025',
    image: 'https://www.shutterstock.com/image-photo/graduation-ceremony-students-cap-gown-600w-2431769077.jpg' 
  },
  { 
    id: 2, 
    caption: 'Science Laboratory Session', 
    category: 'Campus Activities', 
    date: 'November 2025',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 3, 
    caption: 'Library and ICT Centre', 
    category: 'Facilities', 
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 4, 
    caption: 'Annual Sports Day', 
    category: 'Campus Activities', 
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 5, 
    caption: 'Graduation Convocation', 
    category: 'Events', 
    date: 'March 2026',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 6, 
    caption: 'Teaching Practice Field Visit', 
    category: 'Campus Activities', 
    date: 'May 2026',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' 
  }
];

const galleryVideos = [
  { 
    id: 1, 
    title: 'Providence College Campus Tour', 
    duration: '3:42',
    thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    views: '1.2k views' 
  },
  { 
    id: 2, 
    title: '2025/2026 Matriculation Highlights', 
    duration: '5:10',
    thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    views: '2.4k views' 
  }
];

const categories = ['All', ...new Set(galleryPhotos.map((p) => p.category))];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = activeCategory === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHeader
        title="Campus Gallery"
        subtitle="Explore life at Providence International College of Education through photos and videos of events, academics, and campus activities."
        breadcrumb="Home / Gallery"
      />

      <section className="pce-section pce-bg-white py-5">
        <div className="container">
          
          {/* Photo Gallery Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <span className="badge bg-primary-subtle text-primary text-uppercase px-3 py-2 fw-semibold rounded-pill">
                Photo Gallery
              </span>
              <h2 className="h3 mt-2 fw-bold text-dark mb-0">Campus Activities &amp; Events</h2>
            </div>

            {/* Category Filter Pills */}
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold transition-all ${
                    activeCategory === cat
                      ? 'btn-primary shadow-sm'
                      : 'btn-light text-secondary border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="row g-4 mb-5">
            {filteredPhotos.map((photo) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={photo.id}>
                <div 
                  className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative group cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <img 
                      src={photo.image} 
                      alt={photo.caption} 
                      className="w-100 h-100 object-fit-cover transition-transform"
                      style={{ transition: 'transform 0.3s ease' }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-dark bg-opacity-75 text-white fw-normal backdrop-blur">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 bg-white">
                    <h6 className="fw-bold text-dark mb-1">{photo.caption}</h6>
                    <span className="small text-muted">{photo.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-5 text-muted opacity-25" />

          {/* Video Gallery Header */}
          <div className="mb-4">
            <span className="badge bg-danger-subtle text-danger text-uppercase px-3 py-2 fw-semibold rounded-pill">
              Video Gallery
            </span>
            <h2 className="h3 mt-2 fw-bold text-dark">Watch Providence College</h2>
            <p className="text-secondary small">Experience campus life, student stories, and event coverage on video.</p>
          </div>

          {/* Video Grid */}
          <div className="row g-4">
            {galleryVideos.map((video) => (
              <div className="col-md-6" key={video.id}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                  <div className="position-relative" style={{ height: '240px' }}>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute inset-0 bg-dark bg-opacity-40 d-flex align-items-center justify-content-center">
                      <button 
                        type="button"
                        className="btn btn-danger rounded-circle p-3 d-flex align-items-center justify-content-center shadow-lg"
                        style={{ width: '60px', height: '60px' }}
                        aria-label="Play video"
                      >
                        <span className="fs-4 ms-1">▶</span>
                      </button>
                    </div>
                    <div className="position-absolute bottom-0 end-0 m-3">
                      <span className="badge bg-dark text-white fw-medium">
                        ⏱ {video.duration}
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold text-dark mb-1">{video.title}</h6>
                      <span className="small text-muted">{video.views}</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm rounded-pill fw-semibold px-3">
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Photo Modal */}
      {selectedPhoto && (
        <div 
          className="modal fade show d-block bg-dark bg-opacity-75 backdrop-blur" 
          tabIndex="-1"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 rounded-4 overflow-hidden bg-white">
              <div className="modal-header border-0 pb-0">
                <h6 className="fw-bold mb-0 text-dark">{selectedPhoto.caption}</h6>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setSelectedPhoto(null)}
                ></button>
              </div>
              <div className="modal-body p-3">
                <img 
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.caption} 
                  className="w-100 rounded-3 object-fit-cover"
                  style={{ maxHeight: '70vh' }}
                />
                <div className="d-flex justify-content-between align-items-center mt-3 px-1">
                  <span className="badge bg-primary-subtle text-primary">{selectedPhoto.category}</span>
                  <span className="small text-muted">{selectedPhoto.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}