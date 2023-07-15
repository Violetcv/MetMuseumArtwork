import './ArtCard.css';

function ArtCard({ title, artistDisplayName, primaryImageSmall, objectID}){
        return (
          <div className="card">
            <img src={primaryImageSmall} className="card-img-top" alt={`Album art of ${title}`} />
            <div className="card-body d-flex flex-column justify-content-between">
              {/* <h5 className="card-title">
                {title}
              </h5>
              <p className="card-text">
                {artistDisplayName}
              </p> */}
            </div>
          </div>
        );
      }

export default ArtCard;