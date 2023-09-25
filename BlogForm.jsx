import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
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

function BlogForm() {
  const blogState = {
    blogCategoryId: "",
    title: "",
    subject: "",
    content: "",
    imageUrl: "https://i.ibb.co/94M6bSk/02-Placeholder-Image.png",
    datePublish: null,
  };

  const [lookUpData, setLookUpType] = useState({
    blogTypes: [],
    mappedBlogTypes: [],
  });
  useEffect(() => {
    lookUpService.lookUp(["BlogTypes"]).then(onLookSuccess).catch(onLookError);
  }, []);

  const onLookSuccess = (response) => {
    const { blogTypes } = response.item;

    setLookUpType((prevState) => {
      let newBlog = { ...prevState, blogTypes };
      newBlog.mappedBlogTypes = newBlog.blogTypes.map(helper.mapLookUpItem);
      return newBlog;
    });
  };

  const onLookError = (error) => {
  };

  function submitForm(values, { setSubmitting, resetForm }) {
    blogService
      .create(values)
      .then((response) => {
        onSubmitSuccess(response, { setSubmitting });
      })
      .catch(onSubmitError);
    resetForm();
  }

  const onSubmitSuccess = (response, { setSubmitting }) => {
    Swal.fire({
      title: "Great job!",
      text: "Your blog was submitted successfully!",
      icon: "success",
    });
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  const onSubmitError = (error) => {
    Swal.fire({
      title: "Oops!",
      text: "Something went wrong! Please try again.",
      icon: "error",
    });
  };

  const handleUploadSuccess = (response, setFieldValue) => {
    setFieldValue("imageUrl", response.item[0].url);
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
          <Container>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-md-0">
                    <h1 className="text-dark mb-1">Add New Blog Post</h1>
                    <Breadcrumb>
                      <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                      <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
                      <Breadcrumb.Item active>
                        Add New Blog Post
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div>
                    <Link to="/" className="btn btn-outline-white">
                      Back to All Blogs
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="form-container-blog">
            <Row>
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
                            name="content"
                            editor={ClassicEditor}
                            data={values.content}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFieldValue("content", data);
                            }}
                          />
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
                          <label className="fw-bold">Date Published</label>
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
                          {isSubmitting ? (
                            <div>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Submitting
                            </div>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* second card for blog preview */}
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

                        <h5 className="mb-1 text-secondary">
                          {values.subject}
                        </h5>
                      </Col>
                      <hr />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: values.content,
                        }}
                      ></div>
                      <hr />
                    </Row>
                  </Card.Body>
                  <Col lg={{ span: 10, offset: 9 }} md={12} sm={12}>
                    <p className="fs-6 mb-1">{values.datePublish}</p>
                  </Col>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Formik>
  );
}
export default BlogForm;
