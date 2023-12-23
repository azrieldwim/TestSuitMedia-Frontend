import React, { useEffect, useState } from 'react';
import { Header, Card } from '../components';
import { Banner } from '../assets';
import { fetchData } from '../service/fetchData';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const IdeasPage = () => {
  const [ideasData, setIdeasData] = useState([]);
  const [pageNumber, setPageNumber] = useState(parseInt(localStorage.getItem('pageNumber')) || 1);
  const [perPage, setPerPage] = useState(parseInt(localStorage.getItem('perPage')) || 10);
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'published_at');
  const [scrollPosition, setScrollPosition] = useState(0);
  const totalDataCount = 274;
  const startItem = (pageNumber - 1) * perPage + 1;
  const endItem = Math.min(pageNumber * perPage, totalDataCount);
  const totalPages = Math.ceil(totalDataCount / perPage);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bannerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${Banner})`,
    backgroundSize: 'cover',
    backgroundPositionY: `calc(10% - ${scrollPosition * 0.5}px)`,
    clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 100%)'
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData({
          pageNumber: pageNumber,
          pageSize: perPage,
          sorting: sortBy
        });
        setIdeasData(data);
        console.log('Fetched Data:', data);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchDataFromApi();
  }, [pageNumber, perPage, sortBy]);

  useEffect(() => {
    localStorage.setItem('pageNumber', pageNumber);
    localStorage.setItem('perPage', perPage);
    localStorage.setItem('sortBy', sortBy);
  }, [pageNumber, perPage, sortBy]);

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleFirstPage = () => {
    setPageNumber(1);
  };

  const handleLastPage = () => {
    setPageNumber(totalPages);
  };

  return (
    <div>
      <Header />

      <div className="w-full h-auto mt-28">
        <div className="relative overflow-hidden">
          <div className="bg-cover h-[28rem] flex flex-col items-center justify-center text-white mb-5" style={bannerStyle}>
            <h1 className="text-5xl font-medium">Ideas</h1>
            <h4 className="text-lg font-normal">Where all our great things begin</h4>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-40 py-14">
        <div className="flex flex-row justify-between items-center">
          <h5>{`Showing ${startItem}-${endItem} of 274`}</h5>

          <div className="flex flex-row gap-3 items-center">
            <h5>Show per page:</h5>
            <select
              onChange={(e) => setPerPage(Number(e.target.value))}
              value={perPage}
              className="border-2 py-1 pr-16 pl-3 border-gray-300 rounded-full"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <h5>Sort by:</h5>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              className="border-2 py-1 pr-10 pl-3 border-gray-300 rounded-full"
            >
              <option value={"published_at"}>Newest</option>
              <option value={"-published_at"}>Oldest</option>
            </select>
          </div>
        </div>

        <div className="flex mt-8 flex-wrap gap-[1.8rem] justify-center">
          {Array.isArray(ideasData) && ideasData.map(data => (
            <Card
              key={data.id}
              imageUrl={data.medium_image[0]?.url}
              date={data.created_at}
              title={data.title}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5 mb-24 gap-3">
        <div className="flex flex-row gap-0">
          <button
            onClick={handleFirstPage}
            className="transform hover:scale-110 transition-transform focus:outline-none"
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            className="transform hover:scale-110 transition-transform focus:outline-none"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
        </div>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${pageNumber === page
              ? 'bg-main px-3 py-2 rounded-lg text-[#ff6700]'
              : 'text-black'
              } ${pageNumber === page
                ? 'text-lg font-bold transform hover:scale-110 transition-transform'
                : 'text-base'
              } focus:outline-none`}
          >
            {page}
          </button>
        ))}

        <div className="flex flex-row gap-0">
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            className="transform hover:scale-110 transition-transform focus:outline-none"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
          <button
            onClick={handleLastPage}
            className="transform hover:scale-110 transition-transform focus:outline-none"
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default IdeasPage;