import { useEffect, useState } from 'react';
import { useGetPhotosQuery } from '../dummyAPI';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [Page, setPage] = useState(1);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setPage(1);
    }
  };
  const handleClear = () => {
    setSearchTerm('');
    setQuery('');
    setPage(1);
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handlePrevPage = () => {
    if (Page === 1) return;
    setPage((prevPage) => prevPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const { data, isLoading, isFetching, error } = useGetPhotosQuery(
    {
      query: query,
      perPage: 12,
      currentPage: Page,
    },
    {
      skip: query.trim() === '',
    }
  );
  //   const { error: Error } = error;
  console.log(data, '--------------------Dataa');
  //   console.log(Error, '------------------Error');

  const totalResults = data?.total_results || 0;
  const totalPages = Math.ceil(totalResults / 12);

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      {/* Search Container */}
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <h1 className='text-3xl font-bold text-gray-800 text-center mb-8'>
          Photo Search
        </h1>

        {/* Search Bar */}
        <div className='flex items-center max-w-2xl mx-auto'>
          <div className='relative flex-1'>
            {/* Search Icon */}
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>

            <input
              type='text'
              value={searchTerm}
              onChange={handleChange}
              placeholder='Search for photos...'
              className='w-full pl-12 pr-12 py-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200'
            />

            {/* Clear Button - Shows when there's text */}
            {searchTerm && (
              <button
                onClick={handleClear}
                className='absolute inset-y-0 right-12 pr-2 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}

            {/* Loading Spinner inside input */}
            {isLoading && (
              <div className='absolute inset-y-0 right-0 pr-4 flex items-center'>
                <div className='animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent'></div>
              </div>
            )}
          </div>
        </div>

        {/* Typing Indicator */}
        {searchTerm && searchTerm !== query && (
          <p className='text-sm text-gray-400 mt-2 text-center'>Searching...</p>
        )}

        {/* Empty State - When input is empty */}
        {!searchTerm.trim() && !isLoading && (
          <div className='text-center mt-16'>
            <div className='mb-6'>
              <svg
                className='h-24 w-24 text-gray-300 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
            <h2 className='text-xl font-semibold text-gray-700 mb-2'>
              Search for Amazing Photos
            </h2>
            <p className='text-gray-500 max-w-md mx-auto'>
              Type in the search box to discover beautiful photos from Pexels.
              Try searching for{' '}
              <span
                className='text-blue-500 cursor-pointer hover:underline'
                onClick={() => setSearchTerm('nature')}
              >
                nature
              </span>
              ,{' '}
              <span
                className='text-blue-500 cursor-pointer hover:underline'
                onClick={() => setSearchTerm('city')}
              >
                city
              </span>
              , or{' '}
              <span
                className='text-blue-500 cursor-pointer hover:underline'
                onClick={() => setSearchTerm('animals')}
              >
                animals
              </span>
            </p>
          </div>
        )}

        {/* Loading State - Initial Load */}
        {isLoading && (
          <div className='flex justify-center items-center mt-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent'></div>
            <span className='ml-4 text-gray-600 font-medium'>Loading...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center max-w-2xl mx-auto'>
            <svg
              className='h-5 w-5 mr-3 flex-shrink-0'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
            <span>
              {'status' in error
                ? `Error: ${error.status}`
                : 'Something went wrong. Please try again.'}
            </span>
          </div>
        )}

        {/* Results - Only show when query is not empty */}
        {data && !isLoading && query.trim() && (
          <div className='mt-8'>
            {/* Results Header */}
            <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
              <p className='text-gray-600 mb-2 sm:mb-0'>
                Found{' '}
                <span className='font-bold text-gray-800'>
                  {totalResults.toLocaleString()}
                </span>{' '}
                results for "
                <span className='font-semibold text-blue-600'>{query}</span>"
              </p>
              {totalPages > 1 && (
                <p className='text-sm text-gray-500'>
                  Page {Page} of {totalPages}
                </p>
              )}
            </div>

            {/* Photo Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative'>
              {/* Fetching Overlay */}
              {isFetching && !isLoading && (
                <div className='absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-xl'>
                  <div className='animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent'></div>
                </div>
              )}

              {data?.photos?.map((photo) => (
                <div
                  key={photo.id} // Use photo.id instead of index
                  className='aspect-square bg-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105 group relative'
                >
                  <img
                    src={photo?.src?.medium}
                    alt={photo?.alt || 'Photo'}
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end'>
                    <p className='text-white text-sm p-3 truncate w-full'>
                      📷 {photo?.photographer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {data?.photos?.length === 0 && (
              <div className='text-center py-12'>
                <svg
                  className='h-16 w-16 text-gray-400 mx-auto mb-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-gray-500 text-lg'>
                  No photos found for "{query}"
                </p>
                <p className='text-gray-400 mt-2'>
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination - Only show when there are results and query is not empty */}
        {query.trim() &&
          data?.photos?.length > 0 &&
          totalPages > 1 &&
          !isLoading && (
            <div className='flex justify-center items-center space-x-4 mt-8'>
              <button
                onClick={handlePrevPage}
                disabled={Page === 1}
                className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center cursor-pointer'
              >
                <svg
                  className='h-5 w-5 mr-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                Prev
              </button>

              <div className='flex items-center space-x-2'>
                <span className='text-gray-600'>
                  Page{' '}
                  <span className='font-semibold text-gray-800'>{Page}</span> of{' '}
                  <span className='font-semibold text-gray-800'>
                    {totalPages}
                  </span>
                </span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={Page === totalPages || isFetching}
                className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center cursor-pointer'
              >
                Next
                <svg
                  className='h-5 w-5 ml-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductSearch;
