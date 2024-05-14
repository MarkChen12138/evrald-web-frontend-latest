import React from "react";
import { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function RegisterPage() {
  const [step, setStep] = useState(0);

  const RightRegister = ({ step }) => {
    const Step1 = () => {
      return (
        <>
          <Card className="card-plain">
            <div className="card-body">
              <Form.Group>
                <Form.Control
                  placeholder="公司邀请码"
                  type="text"
                ></Form.Control>
              </Form.Group>
            </div>
            <div className="card-footer text-center">
              <Button
                className="btn-fill btn-neutral btn-wd"
                type="submit"
                onClick={() => setStep(1)}
                variant="default"
              >
                下一步
              </Button>
            </div>
          </Card>
        </>
      );
    };

    const Step2 = () => {
      return (
        <>
          <Card className="card-plain">
            <div className="card-body">
              <Form.Group>
                <Form.Control placeholder="Company" type="email"></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Enter email"
                  type="email"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Password"
                  type="password"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Password Confirmation"
                  type="password"
                ></Form.Control>
              </Form.Group>
            </div>
            <div className="card-footer text-center">
              <Button
                className="btn-fill btn-neutral btn-wd"
                type="submit"
                onClick={() => setStep(1)}
                variant="default"
              >
                Create Free Account
              </Button>
            </div>
          </Card>
        </>
      );
    };

    return (
      <>
        <Col className="mr-auto" md="5" lg="4">
          <Form action="#" method="#">
            {step === 0 && <Step1 />}
            {step === 1 && <Step2 />}
          </Form>
        </Col>
      </>
    );
  };

  return (
    <>
      <div
        className="full-page register-page section-image"
        data-color="orange"
        data-image={require("assets/img/bg5.jpg")}
      >
        <div className="content d-flex align-items-center">
          <Container>
            <Card className="card-register card-plain text-center">
              <Card.Header>
                <Row className="justify-content-center">
                  <Col md="8">
                    <div className="header-text">
                      <Card.Title as="h2">
                        Evrald 商品行业领先智能数据库
                      </Card.Title>
                      <Card.Subtitle as="h4">
                        智能化登记所有数据，利用区块链技术固证，让所有数据可溯源，不可篡改，安全，且高效
                      </Card.Subtitle>
                      <Card.Subtitle as="h4">
                        每一个公司都是一个节点 信任建立从未如此简单
                      </Card.Subtitle>
                      <hr></hr>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <LeftRegister step={step} />
                  <RightRegister step={step} />
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")",
          }}
        ></div>
      </div>
    </>
  );
}

const LeftRegister = ({ step }) => {
  const styleForActiveStep = (index) => ({
    fontWeight: step === index ? "bold" : "normal",
    textDecoration: step === index ? "underline" : "none",
  });

  return (
    <>
      <Col className="ml-auto" md="7" lg="5">
        <Media>
          <div className="media-left">
            <div className="icon">
              <i className="nc-icon nc-circle-09"></i>
            </div>
          </div>
          <Media.Body style={styleForActiveStep(0)}>
            <h4>公司邀请码</h4>
            <p>
              我们为了保证每一个公司的真实性，只有受到邀请的公司才能够使用Evrald的服务，这是对我们每一个客户的安全进行考量，且为了让我们能够提供更好的服务
            </p>
          </Media.Body>
        </Media>
        <Media>
          <div className="media-left">
            <div className="icon">
              <i className="nc-icon nc-preferences-circle-rotate"></i>
            </div>
          </div>
          <Media.Body style={styleForActiveStep(1)}>
            <h4>基本信息</h4>
            <p>
              在此输入创建账号的基本信息，来保证我也不知道有什么可保证的，输入就是了
            </p>
          </Media.Body>
        </Media>
        <Media>
          <div className="media-left">
            <div className="icon">
              <i className="nc-icon nc-planet"></i>
            </div>
          </div>
          <Media.Body style={styleForActiveStep(2)}>
            <h4>公司信息</h4>
            <p>
              在此输入公司的基本信息，公司的信息也不是给我们检查，是给支付宝检查的
            </p>
          </Media.Body>
        </Media>
      </Col>
    </>
  );
};

export default RegisterPage;