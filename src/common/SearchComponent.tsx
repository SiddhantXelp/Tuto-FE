import { color } from 'framer-motion';
import React, { useState, ChangeEvent } from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchComponentProps {
  onSearch: (query: any) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value)
  };

  const handleSearch = () => {
    onSearch(query);
  };


  const styles = {
    searchContainer: {
      position: 'relative' as 'relative',
      width: '100%',
    },
    searchInput: {
      width: '100%',
      height: '40px',
      padding: '8px 40px 8px 8px',
      border: '2px solid white',
      borderRadius: '10px',
      boxSizing: 'border-box' as 'border-box',
    },
    searchIcon: {
      position: 'absolute' as 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none' as 'none',
      color: "gray"
    },
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        // style={styles.searchInput}
        className='h-auto w-auto bg-white border border-[hsl(0,30%,95%)] rounded-tl-lg rounded-tr-lg p-2 opacity-100'
      />
      <IoSearch style={styles.searchIcon} />
      <button onClick={handleSearch} style={{ display: 'none' }}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;