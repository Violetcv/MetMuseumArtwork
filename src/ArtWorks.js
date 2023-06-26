import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtCard from './ArtCard';
import ArtworkInfo from './ArtworkInfo';

//10 - 15 commits; proper git use for projects; initial commit + push

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectArtworks, setSelectedArtworks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(//different from fetch; syntax; params; query params show up together; json body : http concept : axion and fetch are two librar
          'https://collectionapi.metmuseum.org/public/collection/v1/objects',
          {
            params: {
              metadataDate: "2023-01-01" //json
            },
          }
        );

        const objectIDs = response.data.objectIDs;
        const firstThreeObjectIDs = objectIDs.slice(0, 3);//on scroll load the next item

        const artworkPromises = firstThreeObjectIDs.map(async (objectID) => {//map: returns an array of promises; setstate: no consistent order
          const artworkResponse = await axios.get(//await : wait for api to finish then retrieve data
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
          );
          return artworkResponse.data;
        });

        const artworksData = await Promise.all(artworkPromises);//loader ( gol gol spin wheel)
        setArtworks(artworksData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectArtworks) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${selectArtworks.objectID}`
        );
        const artworkData = response.data;
        setArtworks([artworkData]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectArtworks]);

  return (
    <div>
      <h1>Metropolitan Museum Artworks</h1>
      <div className="container" style={{ border: '1px solid black', padding: '10px' }}>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className="col-9">
            <div className="row">
              {artworks.map((artwork) => (
                <div
                className="col-4"
                style={{ marginBottom: "18px", flex: '0 0 33.33%'  }}
                onClick={() => setSelectedArtworks(artwork)}
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
          <div className="col-3" style={{}}>
            <div className="row">
              {artworks.map((artwork) => (
                <ArtworkInfo
                  key={artwork.objectID}
                  artistDisplayName={artwork.artistDisplayName}
                  primaryImage={artwork.primaryImage}
                  objectID={artwork.objectID}
                  title={artwork.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artworks;

//has images (search endpoint)