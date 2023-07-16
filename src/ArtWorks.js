import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ArtCard from './ArtCard';
import ArtworkInfo from './ArtworkInfo';
import './ArtWorks.css';

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectArtworks, setSelectedArtworks] = useState();
  const [page, setPage] = useState(1);//default value
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          'https://collectionapi.metmuseum.org/public/collection/v1/objects',
          {
            params: {
              // q: "sunflower",
              // title: true,
              // hasImages: true,
              metadataDate: "2023-05-01",
              page: page,
              departmentIds: selectedDepartmentId,
              pageSize: 9 //Display 9 cards per page
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
        const artworksWithImages = artworksData.filter(item => item.primaryImageSmall !== "")

        setArtworks((prevArtworks) => [...prevArtworks, ...artworksWithImages]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, selectedDepartmentId]);

  // departments api; drop down
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          'https://collectionapi.metmuseum.org/public/collection/v1/departments'
        );

        setDepartments(response.data.departments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDepartments();
  }, []);


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
 
  //department drop down
  const handleDepartmentChange = (event) => {
    setSelectedDepartmentId(event.target.value);
    setArtworks([]);
    setPage(1);
  };


  return (
    <div>
      
      <div className="container">

        <div className="department_select">
        {/* browse by department dateBegin and dateEnd API:  https://collectionapi.metmuseum.org/public/collection/v1/departments */}
        <select value={selectedDepartmentId} onChange={handleDepartmentChange}>
        <option value="">All Departments</option>
        {departments.map((department) => (
            <option key={department.departmentId} value={department.departmentId}>
              {department.displayName}
            </option>
          ))}
        </select>
        </div>

      {/* (inline) drop down; state object for departments; setSelecttedDepartmentObject */}
        <div className="row">
          <div className="col-9 row card-deck" ref={containerRef} onScroll={handleScroll} style={{height: "100vh", overflowX: "scroll", "overflowY": "scroll" }}>
            {artworks.map((artwork) => (
              <div
                className="col-4 artcard"
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
