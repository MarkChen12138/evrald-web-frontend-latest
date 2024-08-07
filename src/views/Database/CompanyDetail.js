import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Table,
} from "react-bootstrap";
import { useEffect } from "react";

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `https://findcompanies-kyxhiocbqa.cn-zhangjiakou.fcapp.run?productId=0&companyId=${id}` // 获取公司产品的API
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("Fetched Company Info:", jsonData);
        setCompany(jsonData);
      } catch (error) {
        console.error("Failed to fetch company products:", error);
        setCompany([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const CompanyDetail = () => {
    return (
      <Row className="mt-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", fontSize: "2em" }}>
                {id == company[0].PurchaseUnitID
                  ? company[0].PurchaseCompanyName
                  : company[0].SalesCompanyName}
              </Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">最近验证交易记录</Card.Title>
                <p className="card-category">
                  验证状态为绿色表示验证通过，红色表示验证失败，黄色表示验证中
                </p>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Table className="table-hover text-center">
                  <thead>
                    <tr>
                      <th>合同编号</th>
                      <th>交货时间</th>
                      <th>收货公司</th>
                      <th>发货公司</th>
                      <th>验证状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.map((t) => {
                      const random = Math.random();
                      let colorClass;
                      if (random < 0.8) {
                        colorClass = "text-success"; // 绿色 (80%的概率)
                      } else if (random < 0.9) {
                        colorClass = "text-danger"; // 红色 (10%的概率)
                      } else {
                        colorClass = "text-warning"; // 黄色 (10%的概率)
                      }

                      return (
                        <tr key={t.ContractID}>
                          <td>
                            EV{t.ContractID.toUpperCase().substring(0, 5)}
                          </td>
                          <td>{t.ContractDate.substring(0, 10)}</td>
                          <td>{t.PurchaseCompanyName}</td>
                          <td>{t.SalesCompanyName}</td>
                          <td>
                            <i className={`fas fa-circle ${colorClass}`}></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Card>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              最近上传: {company[0].ContractDate.substring(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>合同数量: {company.length}</ListGroup.Item>
          </ListGroup>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>公司地理位置</Card.Title>
              <Card.Img
                style={{ height: "200px", backgroundColor: "#eee" }}
                src={require("assets/img/map_template.jpg")}
              ></Card.Img>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Container fluid>
      {isLoading ? <h1>isLoading</h1> : <CompanyDetail />}
    </Container>
  );
};

export default CompanyDetail;
