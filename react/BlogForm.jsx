import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import debug from "wePair-debug";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { blogSchema } from "schema/blogSchema";
import lookUpService from "services/lookUpService";
import * as helper from "../../helper/utils";
import FileUpload from "components/files/FileUpload";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import blogService from "services/blogService";
import Swal from "sweetalert2";
import "../../components/blogs/blog.css";

const _logger = debug.extend("blog");

function BlogForm() {
  const [blogState] = useState({
    blogCategoryId: "",
    title: "",
    subject: "",
    content: "",
    imageUrl: "https://i.ibb.co/94M6bSk/02-Placeholder-Image.png",
    datePublish: "",
  });

  const navigate = useNavigate();
  const [blogCharCount, setBlogCharCount] = useState(0);
  const [editor, setEditor] = useState(null);

  const [lookUpData, setLookUpType] = useState({
    blogTypes: [],
    mappedBlogTypes: [],
  });
  useEffect(() => {
    lookUpService.lookUp(["BlogTypes"]).then(onLookSuccess).catch(onLookError);
  }, []);

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

  function submitForm(values, { setSubmitting, resetForm }) {
    _logger(values);
    blogService
      .create(values)
      .then((response) => {
        onSubmitSuccess(response, resetForm);
      })
      .catch((error) => {
        onSubmitError(error, { setSubmitting });
      });
  }

  const onSubmitSuccess = (response, resetForm) => {
    _logger("Post blog success", response);
    Swal.fire({
      title: "Blog has been created!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "View Blogs",
      denyButtonText: `Add Another`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/blog/listings");
      }
    });
    resetForm();
    if (editor) {
      editor.setData("");
    }
  };

  const onSubmitError = (error, { setSubmitting }) => {
    _logger("Post error", error);
    Swal.fire({
      title: "Oops!",
      text: "Something went wrong! Please try again.",
      icon: "error",
    });
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  const handleUploadSuccess = (response, setFieldValue) => {
    _logger("handleUpload success", response.item[0].url);
    setFieldValue("imageUrl", response.item[0].url);
  };

  const updateCharCount = (data) => {
    const tempDiv = document.createElement("div");
    _logger("here is tempDiv", tempDiv);
    tempDiv.innerHTML = data;
    _logger("here is the html data", tempDiv.innerHTML);
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    _logger("here is textContent", textContent);
    setBlogCharCount(textContent.length);
    tempDiv.innerHTML = "";
  };

  const renderBlogCharCount = () => {
    return blogCharCount > 5000 ? (
      <p className="red-text">Blog must be less than 5000 characters!</p>
    ) : null;
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={blogState}
      onSubmit={submitForm}
      validationSchema={blogSchema}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <>
          <Row className="mx-auto blog-w">
            <Col lg={12} md={12} sm={12}>
              <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                <div className="mb-3 mb-md-0">
                  <h1 className="text-dark mb-1">Add New Blog Post</h1>
                  <Breadcrumb>
                    <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Profile</Breadcrumb.Item>
                    <Breadcrumb.Item active>Add New Blog Post</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div>
                  <Link to="/blog/listing" className="btn btn-outline-white">
                    Back to All Blogs
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mx-auto blog-w form-container-blog mb-3">
            <Col lg={6} md={8} className="py-5 py-xl-5">
              <Card>
                <Card.Body className="mb-3">
                  <Form>
                    <Row>
                      <Col lg={12} md={12} className="mb-3">
                        <label className="fw-bold">Blog Category</label>
                        <Field
                          as="select"
                          name="blogCategoryId"
                          className="form-control"
                        >
                          <option>Select One</option>
                          {lookUpData.mappedBlogTypes}
                        </Field>
                        <ErrorMessage
                          name="blogCategoryId"
                          component="div"
                          className="has-error"
                        ></ErrorMessage>
                      </Col>
                      <br></br>
                      <Col lg={12} md={12} className="mb-3">
                        <div className="form-group">
                          <label className="fw-bold" label="Title">
                            Title
                          </label>
                          <Field
                            type="text"
                            name="title"
                            className="form-control text-muted"
                            placeholder="Add Blog Title"
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="has-error"
                          />
                        </div>
                      </Col>
                      <br></br>
                      <Col lg={12} md={12} className="mb-3">
                        <div className="form-group">
                          <label className="fw-bold" label="Subject">
                            Subject
                          </label>
                          <Field
                            type="text"
                            name="subject"
                            className="form-control text-muted"
                            placeholder="Add Blog Subject"
                          />
                          <ErrorMessage
                            name="subject"
                            component="div"
                            className="has-error"
                          />
                        </div>
                      </Col>
                      <br></br>
                      <Col>
                        <label className="fw-bold">Blog Content</label>
                        <CKEditor
                          editor={ClassicEditor}
                          name="content"
                          config={{ placeholder: "Write your blog here!" }}
                          data={values.content}
                          onReady={(editor) => {
                            setEditor(editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue("content", data);
                            updateCharCount(data);
                          }}
                        />
                        <div className="blog-content-error">
                          <p className="right-aligned-text">
                            <span
                              className={`${
                                blogCharCount > 5000 ? "red-text" : ""
                              }`}
                            >
                              {blogCharCount}
                            </span>
                            /5000{" "}
                          </p>
                          {renderBlogCharCount()}
                        </div>
                      </Col>
                      <br></br>
                      <Col lg={12} md={12} className="mb-3">
                        <p className="mt-4 fw-bold">Upload Image</p>
                        <FileUpload
                          className="row"
                          name="imageUrl"
                          isMultiple={false}
                          handleUploadSuccess={(response) =>
                            handleUploadSuccess(response, setFieldValue)
                          }
                        ></FileUpload>
                        <ErrorMessage
                          name="imageUrl"
                          component="div"
                          className="has-error"
                        ></ErrorMessage>
                      </Col>
                      <br></br>
                      <Col lg={5} md={7} className="mb-3">
                        <label className="fw-bold">Date Created</label>
                        <Field
                          type="date"
                          name="datePublish"
                          className="form-control"
                          placeholder="YYYY-MM-DD"
                        ></Field>
                        <ErrorMessage
                          name="datePublish"
                          component="div"
                          className="has-error"
                        ></ErrorMessage>
                      </Col>
                      <br></br>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={12} className="py-5 py-xl-5">
              <Card className="mb-4 shadow-lg">
                <Card.Img
                  variant="top"
                  src={values.imageUrl}
                  alt="text"
                  className="rounded-top-md img-fluid"
                />
                <Card.Body>
                  <Row className="align-items-center g-0 mt-4">
                    <Col className="col lh-5">
                      <h3 className="mb-1 text-warning">{values.title}</h3>

                      <h5 className="mb-1 text-secondary">{values.subject}</h5>
                    </Col>
                  </Row>
                </Card.Body>
                <Col lg={{ span: 10, offset: 9 }} md={12} sm={12}>
                  <p className="fs-6 mb-1">{values.datePublish}</p>
                </Col>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Formik>
  );
}
export default BlogForm;
