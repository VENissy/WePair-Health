import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import debug from "wePair-debug";

const _logger = debug.extend("blog");

function BlogCard(props) {
  const { aNewBlog } = props;
  _logger("blog map", aNewBlog);

  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/article/${aNewBlog.id}`);
  };

  let date = new Date(aNewBlog?.dateCreated);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <Card className="mb-4 blog-card-col" key={aNewBlog?.id}>
      <Card.Img
        variant="top"
        src={aNewBlog?.imageUrl}
        onClick={handleOnClick}
        className="rounded-top-md img-fluid blog-image"
      />
      <Card.Body>
        <Col className="col auto">
          <h5 className="mb-1 mb-lg-3">{aNewBlog?.category.name}</h5>
          <h3 className="mb-2 mb-lg-2 text-warning" onClick={handleOnClick}>
            {aNewBlog?.title}
          </h3>
        </Col>
        <hr />
        <div>
          <h6
            className="mb-1 text-secondary"
            dangerouslySetInnerHTML={{
              __html: `${aNewBlog?.content.slice(0, 165)}...`,
            }}></h6>
        </div>
      </Card.Body>
      <Card.Footer className="blog-footer">
        <Row className="align-items-center g-0 mt-lg-7 ">
          <Col className="col-auto">
            <Image
              src={aNewBlog?.author.avatarUrl}
              alt=""
              className="rounded-circle avatar-sm me-2"
            />
          </Col>
          <Col className="col lh-1">
            <h5 className="mb-1">
              {aNewBlog?.author.firstName}&nbsp;{aNewBlog?.author.lastName}
            </h5>
          </Col>
          <Col className="col-auto">
            <p className="fs-6 mb-0">{formattedDate}</p>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
BlogCard.propTypes = {
  aNewBlog: PropTypes.shape({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string,
    author: PropTypes.string,
    dateCreated: PropTypes.instanceOf(Date),
  }),
};

export default BlogCard;
