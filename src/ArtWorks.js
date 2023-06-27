import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ArtCard from './ArtCard';
import ArtworkInfo from './ArtworkInfo';

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectArtworks, setSelectedArtworks] = useState();
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://collectionapi.metmuseum.org/public/collection/v1/objects',
          {
            params: {
              metadataDate: '2023-06-01',
              page: page,
              pageSize: 9 // Display 9 cards per page
            },
          }
        );

        const objectIDs = response.data.objectIDs;
        const artworkPromises = objectIDs.map(async (objectID) => {
          const artworkResponse = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
          );
          return artworkResponse.data;
        });

        const artworksData = await Promise.all(artworkPromises);
        setArtworks((prevArtworks) => [...prevArtworks, ...artworksData]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      artworks.length > 0
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleClick = (artwork) => {
    setSelectedArtworks(artwork);
  };

  return (
    <div>
      <h1>Metropolitan Museum Artworks</h1>
      <div
        className="container"
        style={{ border: '1px solid black', padding: '10px', maxHeight: '500px', overflowY: 'auto' }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {artworks.map((artwork) => (
            <div
              className="col-4"
              style={{ marginBottom: '18px', flex: '0 0 33.33%' }}
              onClick={() => handleClick(artwork)}
              key={artwork.objectID}
            >
              <ArtCard
                title={artwork.title}
                primaryImage={artwork.primaryImage}
                artistDisplayName={artwork.artistDisplayName}
              />
            </div>
          ))}
        </div>
      </div>
      {selectArtworks && (
        <div className="container" style={{ marginTop: '20px' }}>
          <ArtworkInfo
            artistDisplayName={selectArtworks.artistDisplayName}
            primaryImage={selectArtworks.primaryImage}
            objectID={selectArtworks.objectID}
            title={selectArtworks.title}
          />
        </div>
      )}
    </div>
  );
};

export default Artworks;
