import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  Alert,
  Button,
  Col,
  FloatingLabel,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Initial values for the form
const initialValues = {
  name: "",
  email: "",
  number: "",
};

// Validation schema using Yup
const validateSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name can be up to 10 characters")
    .required("Enter your name"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Number must be 10 digits")
    .required("Number is required"),
});

function DynamicForm() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      setAlertMessage("Form is submitted Successfully");
      setAlertVariant("success");
      setShowAlert(true);
      console.log("Form Submitted:", values);

      // Reset the form
      resetForm();
      setValidated(true);

      // Auto hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
  } = formik;

  return (
    <div
      className="d-flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <Header />
      <div
        className="bg-white p-4 rounded"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h3 className="text-center mb-4">Dynamic form with validation</h3>

        {/* Alert Box */}
        

        {/* Loading Skeleton */}
        {loading ? (
          <>
            <Skeleton height={60} className="mb-3" />
            <Skeleton height={60} className="mb-3" />
            <Skeleton height={60} className="mb-3" />
            <div className="text-center">
              <Skeleton width={100} height={40} />
            </div>
          </>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Name Field */}
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="floatingName" label="Name">
                  <FormControl
                    type="text"
                    name="name"
                    placeholder="Enter Your Name ..."
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                    isValid={touched.name && !errors.name}
                  />
                  {errors.name && touched.name && (
                    <span className="error text-danger">{errors.name}</span>
                  )}
                </FloatingLabel>
              </Col>
            </Row>

            {/* Email Field */}
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="floatingEmail" label="Email address">
                  <FormControl
                    type="email"
                    name="email"
                    placeholder="Enter Your Email ..."
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  {errors.email && touched.email && (
                    <span className="error text-danger">{errors.email}</span>
                  )}
                </FloatingLabel>
              </Col>
            </Row>

            {/* Number Field */}
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="floatingNumber" label="Number">
                  <FormControl
                    type="number"
                    name="number"
                    placeholder="Enter Your Number..."
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.number && !!errors.number}
                    isValid={touched.number && !errors.number}
                  />
                  {errors.number && touched.number && (
                    <span className="error text-danger">{errors.number}</span>
                  )}
                </FloatingLabel>
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                
              >
                Submit
              </Button>
              {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
            </div>
          </Form>
          
        )}
      </div>
    </div>
  );
}

export default DynamicForm;
