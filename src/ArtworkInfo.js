//equivalent of track.js

function ArtworkInfo({title, objectID, primaryImage, artistDisplayName}) {
    return (
        <a key={objectID} href={primaryImage} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{title}</h5>
            </div>
            <p className="mb-1">{artistDisplayName}</p>
        </a>
    );
  }
  
  export default ArtworkInfo;