import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from '../utils/useDebounce';

export interface PhotoSources {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PhotoSources;
  liked: boolean;
  alt: string;
  //   photos: PexelsPhoto[];
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
}

const Gallery = () => {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [query, setQuery] = useState<string>('');
  const [currentPage, setcurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = photos.slice(startIndex, endIndex);
  const totalPages = Math.floor(photos.length / itemsPerPage);

  const fetchBlogs = async (searchQuery: string) => {
    const response = await axios.get<PexelsSearchResponse>(
      //   'https://jsonplaceholder.typicode.com/photos',
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=100&page=1`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'mRmQhHen1Rbzo6Wwduit6g6osl8zW5UcnTxqM4N9XYHgZ6w9WMvo8FYe',
        },
      },
    );
    // setPhotos(response.data);
    handleBlogResponse(response.data);
    console.log(response.data);
  };

  const handleBlogResponse = (data: PexelsSearchResponse) => {
    setPhotos(data.photos);
    console.log(data);
  };
  const debouncedQuery = useDebounce(query.trim(), 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setPhotos([]);
      return;
    }
    fetchBlogs(debouncedQuery);
  }, [debouncedQuery]);
  //   const debouncedQuery = useDebounce(trimmedQuery, 500);
  //   if (debouncedQuery) {
  //     fetchBlogs(debouncedQuery);
  //   }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header Section */}
      <div className='flex p-6 justify-between items-center gap-2 bg-white shadow-sm'>
        <h1 className='text-4xl font-bold text-gray-800'>Gallery</h1>
        <Link
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors'
          to='/'
        >
          Back to Home
        </Link>
      </div>

      <div className='p-4'>
        <input
          type='text'
          className='w-full p-3 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>

      {/* Main Grid Container */}
      <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {currentItems.length > 0 ? (
          currentItems.map((photo) => (
            <div
              key={photo.id}
              className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100'
            >
              {/* Image Container with Fixed Aspect Ratio (16:9) */}
              <div className='relative h-56 w-full overflow-hidden bg-gray-200'>
                <img
                  src={photo.src.large} // Used large for better quality in the grid
                  alt={photo.alt}
                  className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>

              {/* Text Content */}
              <div className='p-4'>
                <p className='text-sm font-medium text-gray-800 line-clamp-2'>
                  {photo.alt || 'Beautiful Nature Shot'}
                </p>
                <div className='mt-2 flex justify-between items-center'>
                  <span className='text-xs text-blue-500 font-semibold uppercase'>
                    {photo.photographer}
                  </span>
                  <a
                    href={photo.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-xs text-gray-400 hover:text-gray-600 underline'
                  >
                    View Original
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-20 text-gray-500 text-xl font-light'>
            Please enter a search query to find blogs...
          </div>
        )}
      </div>

      {/* Pagination */}
      {photos.length > 0 && (
        <div className='flex justify-center items-center gap-4 py-6'>
          <button
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white font-semibold'}`}
            onClick={() => setcurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className='text-gray-700 font-medium'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white font-semibold'}`}
            onClick={() =>
              setcurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
