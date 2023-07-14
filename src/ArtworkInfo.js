//equivalent of track.js

function ArtworkInfo({title, objectID, primaryImage, artistDisplayName}) {
    return (
        <a key={objectID} href={primaryImage} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1" style={{color:"red"}}>{title}</h5>
            </div>
            <p className="mb-1" style={{color:"red"}}>{artistDisplayName}</p>
            {/* add other artwork details */}
        </a>
    );
  }
  
  export default ArtworkInfo;