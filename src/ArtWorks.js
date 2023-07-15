import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ArtCard from './ArtCard';
import ArtworkInfo from './ArtworkInfo';
import './ArtWorks.css';

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectArtworks, setSelectedArtworks] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          'https://collectionapi.metmuseum.org/public/collection/v1/objects',
          {
            params: {
              metadataDate: "2023-05-01",
              page: page,
              pageSize: 9 // Display 9 cards per page
            },
          }
        );

        const objectIDs = response.data.objectIDs;
        const objectIDsSubset = objectIDs.slice((page - 1) * 9, page * 9);
        const artworkPromises = objectIDsSubset.map(async (objectID) => {
          const artworkResponse = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
          );
          return artworkResponse.data;
        });

        const artworksData = await Promise.all(artworkPromises);
        setArtworks((prevArtworks) => [...prevArtworks, ...artworksData]);
        setIsLoading(false);
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
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleClick = (artwork) => {
    setSelectedArtworks(artwork);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      
      <div className="container" ref={containerRef} onScroll={handleScroll}>
      <p>Browse by: Era Artist</p>
        <div className="row">
          <div className="col-9 row card-deck">
            {artworks.map((artwork) => (
              <div
                className="col-4"
                onClick={() => handleClick(artwork)}
                key={artwork.objectID}
              >
                <ArtCard
                  title={artwork.title}
                  primaryImageSmall={artwork.primaryImageSmall}
                  // artistDisplayName={artwork.artistDisplayName}
                />
              </div>
            ))}
          </div>
          <div className="col-3">
            {selectArtworks && (
              <div className="container">
                <ArtworkInfo
                  objectName={selectArtworks.objectName}
                  artistDisplayName={selectArtworks.artistDisplayName}
                  objectURL={selectArtworks.objectURL}
                  objectID={selectArtworks.objectID}
                  title={selectArtworks.title}
                  artistDisplayBio={selectArtworks.artistDisplayBio}
                  culture={selectArtworks.culture}
                  period={selectArtworks.period}
                  creditLine={selectArtworks.creditLine}
                />
              </div>
            )}
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && artworks.length === 18 && (
          <div className="load-more-button" onClick={handleLoadMore}>
            Load More
          </div>
        )}
      </div>
    </div>
  );
};

export default Artworks;
