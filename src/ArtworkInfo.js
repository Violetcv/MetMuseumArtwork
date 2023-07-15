//equivalent of track.js

function ArtworkInfo({objectName, creditLine, title, objectID, objectURL, culture, period, artistDisplayName, artistDisplayBio}) {
    return (
        <a key={objectID} href={objectURL} className="list-group-item list-group-item-action">
            <h5 className="mb-1" style={{color:"#D9CEC7", fontSize: "0.7rem" }}>{objectName}</h5>
            <div className="d-flex w-100 justify-content-between">
                <h1 className="mb-1" style={{color:"#A74D4A"}}>{title}</h1>
            </div>
            <p className="mb-1" style={{color:"#A74D4A", fontSize: "0.6rem"}}>{creditLine}</p>
            <h5 className="mb-1" style={{color:"#A74D4A"}}>{artistDisplayName}</h5>
            <h9 className="mb-1" style={{color: "#A74D4A", fontSize: "0.8rem"}}>{artistDisplayBio}</h9>
            <p className="mb-1" style={{color: "#A74D4A"}}>{culture}</p>
            <h9 className="mb-1" style={{color: "#A74D4A"}}>{period}</h9>

            {/* add other artwork details */}
        </a>
    );
  }
  
  export default ArtworkInfo;