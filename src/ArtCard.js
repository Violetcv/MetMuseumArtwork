function ArtCard({ title, artistDisplayName, primaryImage, objectID}){
        return (
          <div
            className="card"
            style={{
              height: "20rem",
              width: "13rem",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              border: "2px solid #000000"
            }}
          >
            <img src={primaryImage} className="card-img-top" alt={`Album art of ${title}`} style={{ maxHeight: '200px' }} />
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title" style={{ color: "#000000" }}>
                {title}
              </h5>
              <p className="card-text" style={{ color: "#000000" }}>
                {artistDisplayName}
              </p>
            </div>
          </div>
        );
      }

export default ArtCard;