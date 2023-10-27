
function BlogListing() {
  const [blogData, setBlogData] = useState({
    arrayOfBlogs: [],
    blogComponents: [],
    totalResults: 0,
    pageIndex: 1,
    pageSize: 9,
    selectedCat: 0,
    currentPage: 1,
  });

  const [lookUpData, setLookUpType] = useState({
    blogTypes: [],
    mappedBlogTypes: [],
  });
  useEffect(() => {
    lookUpService.lookUp(["BlogTypes"]).then(onLookSuccess).catch(onLookError);
    if (blogData.selectedCat > 0) {
      blogService
        .GetByCategory(
          blogData.selectedCat,
          blogData.pageIndex - 1,
          blogData.pageSize
        )
        .then(renderBlogsSuccess)
        .catch(renderBlogsError);
    } else {
      blogService
        .selectAllPaginated(blogData.pageIndex - 1, blogData.pageSize)
        .then(renderBlogsSuccess)
        .catch(renderBlogsError);
    }
  }, [blogData.pageIndex, blogData.selectedCat]);

  const onLookSuccess = (response) => {
    _logger("onLookSuccess", response);
    const { blogTypes } = response.item;

    setLookUpType((prevState) => {
      let newBlog = { ...prevState, blogTypes };
      newBlog.mappedBlogTypes = newBlog.blogTypes.map(helper.mapLookUpItem);
      return newBlog;
    });
    _logger(lookUpData);
  };

  const onLookError = (error) => {
    _logger("onLookError", error);
  };

  const onCurrentPage = (page) => {
    setBlogData((prevState) => {
      let newState = { ...prevState };
      newState.currentPage = page;
      newState.pageIndex = page;
      return newState;
    });
  };

  const renderBlogsSuccess = (response) => {
    _logger("renderBlogsSuccess", response);
    let { pagedItems, totalCount } = response.item;

    setBlogData((prevState) => {
      let newBlogObj = { ...prevState };
      newBlogObj.arrayOfBlogs = pagedItems;
      newBlogObj.blogComponents = pagedItems.map(cardMap);
      newBlogObj.totalResults = totalCount;
      return newBlogObj;
    });
  };

  const renderBlogsError = (error) => {
    _logger("renderBlogsError", error);
  };

  const cardMap = (aNewBlog) => {
    return (
      <Col xl={4} lg={4} md={6} sm={12} className="space-around space-between">
        <BlogCard aNewBlog={aNewBlog} key={aNewBlog} />
      </Col>
    );
  };

  const filterByCategory = (e) => {
    e.preventDefault();
    let { value } = e.target;
    setBlogData((prevState) => {
      let newState = { ...prevState };
      newState.pageIndex = 1;
      newState.selectedCat = value;
      return newState;
    });
  };

  const mainBlog =
    blogData.arrayOfBlogs.length > 0 ? blogData.arrayOfBlogs[0] : null;

  return (
    <Fragment>
      <div className="pt-9 pb-9">
        <Row className="mx-auto">
          <Row>
            <Col lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }} md={12} sm={12}>
              <div className="text-center mb-5">
                <h1 className=" display-2 fw-bold blog-list-title">Blogs</h1>
                <p className="lead">
                  Healthy features, tips, and personal journeys to live your best life.
                </p>
              </div>
            </Col>
          </Row>
          <Col className="mb-3 me-5 ms-5 ">
            <Row className="d-lg-flex justify-content-between align-items-center">
              <Col md={6} lg={8} xl={9}></Col>
              <Col md={6} lg={4} xl={3} className="d-inline-flex">
                <FormSelect
                  as="select"
                  placeholder="Sort by"
                  className="form-control me-3"
                  onChange={filterByCategory}>
                  <option>Select All</option>
                  {lookUpData.mappedBlogTypes}
                </FormSelect>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="mx-auto blog-w ">
        <div className="pb-8 py-6">
          <Row className="mx-auto me-5 ms-5">
            <Col xl={12} lg={12} md={12} sm={12}>
              {mainBlog && <BlogCardFullWidth aNewBlog={mainBlog} />}
            </Col>
            {blogData.blogComponents}
          </Row>
          <div className="d-flex justify-content-center">
            <Pagination
              className="blog-pagination-item blog-pagination-item-active"
              onChange={onCurrentPage}
              current={blogData.pageIndex}
              total={blogData.totalResults}></Pagination>
          </div>
        </div>
      </Row>
    </Fragment>
  );
}

export default BlogListing;
