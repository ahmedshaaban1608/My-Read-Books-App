const BookDetails = ({
  title,
  authors,
  description,
  showstatus,
  onCloseClick,
}) => {
  return (
    <div className={`details ${showstatus}`}>
      <div className="header">
        <div>
          <h2>{title}</h2>
          <span>
            <b>Authors:</b> {authors}
          </span>
        </div>
        <div>
          <button onClick={onCloseClick}>X</button>
        </div>
      </div>
      <h4>description</h4>
      <p> {description}</p>
    </div>
  );
};

export default BookDetails;
