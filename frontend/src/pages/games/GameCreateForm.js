import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import upload from "../../assets/images/upload-graphic.png";
import styles from "../../styles/GameCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";


function GameCreateForm() {
    const [errors, setErrors] = useState({});
  
    const [postData, setPostData] = useState({
      title: "",
      description: "",
      is_available: false,
      image: "",
    });
    const { title, description, is_available, image } = postData;

    const imageInput = useRef(null)
    const history = useHistory()
  
    const handleChange = (event) => {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleChangeImage = (event) => {
      if (event.target.files.length) {
        URL.revokeObjectURL(image);
        setPostData({
          ...postData,
          image: URL.createObjectURL(event.target.files[0]),
        });
      }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        console.log('51')

        formData.append('title', title)
        formData.append('description', description)
        formData.append('is_available', is_available)
        formData.append('cover_image', imageInput.current.files[0])
        console.log('57')
        const {data} = await axiosReq.post('/games/', formData);
        console.log(data) 
        try {
          console.log('59')
          const {data} = await axiosReq.post('/games/', formData);
          history.push(`/games/${data.id}`)
         console.log('61')
         }catch(err) {
            console.log(err)
            if (err.response?.status !== 401){
             setErrors(err.response?.data)
               console.log('66')
         }
        
       }
        console.log('66')
   }
  
    const textFields = (
      <div className="text-center">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="is_available">
          <Form.Check
            type="checkbox"
            name="is_available"
            label="Is Available"
            checked={is_available}
            onChange={() => setPostData({ ...postData, is_available: !is_available })}
          />
        </Form.Group>
  
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={() => {}}
        >
          cancel
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
          List a game
        </Button>
      </div>
    );
  
    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure>
                      <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div>
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={upload}
                      message="Click or tap to upload an image"
                    />
                  </Form.Label>
                )}
  
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    );
  }
  
  export default GameCreateForm;
