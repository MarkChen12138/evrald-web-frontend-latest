import React from "react";
import ReactDatetime from "react-datetime";
import Select from "react-select";
import Slider from "nouislider";
import FileUploadWithPreview from "../../Components/PreviewImage.js";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";

const cardTypes = [
  { value: "RESIDENT", label: "居民身份证" },
  { value: "PASSPORT", label: "护照" },
  { value: "PASSPORT_HK_MO", label: "港澳居民(往来大陆通行证)" },
  { value: "PASSPORT_TWN", label: "台湾居民(往来大陆通行证)" },
  { value: "RESIDENCE_PERMIT_HM", label: "港澳居民居住证" },
  { value: "RESIDENCE_PERMIT_TW", label: "台湾居民居住证" },
  { value: "PERMANENT_RESIDENCE_FOREIGNER", label: "外国人永久居住证" },
];

const Step5 = React.forwardRef((props, ref) => {
  const [cardType, setCardType] = React.useState("RESIDENT");
  const [benefitName, setBenefitName] = React.useState("");
  const [benefitNameError, setBenefitNameError] = React.useState(null);
  const [benefitPhoneNumber, setBenefitPhoneNumber] = React.useState("");
  const [benefitPhoneNumberError, setBenefitPhoneNumberError] =
    React.useState(null);
  const [benefitCardNumber, setBenefitCardNumber] = React.useState("");
  const [benefitCardNumberError, setBenefitCardNumberError] =
    React.useState(null);
  const [cardFontImg, setCardFontImg] = React.useState([]);
  const [cardBackImg, setCardBackImg] = React.useState(null);
  const [effectTime, setEffectTime] = React.useState("");
  const [expireTime, setExpireTime] = React.useState("");

  // 验证姓名
  const validateName = () => {
    if (benefitName.trim() === "") {
      setBenefitNameError("受益人姓名不能为空");
      return false;
    } else {
      setBenefitNameError(null);
      return true;
    }
  };

  // 验证电话号码
  const validatePhoneNumber = () => {
    const phoneRegex = /^[1-9]\d{9}$/; // 仅示例，根据实际需求调整
    if (!phoneRegex.test(benefitPhoneNumber.trim())) {
      setBenefitPhoneNumberError("电话号码格式不正确");
      return false;
    } else {
      setBenefitPhoneNumberError(null);
      return true;
    }
  };

  // 验证证件号码
  const validateCardNumber = () => {
    if (benefitCardNumber.trim() === "") {
      setBenefitCardNumberError("证件号码不能为空");
      return false;
    } else {
      setBenefitCardNumberError(null);
      return true;
    }
  };

  // 综合验证所有字段
  const isValidated = () => {
    const isNameValid = validateName();
    const isPhoneValid = validatePhoneNumber();
    const isCardValid = validateCardNumber();
    return isNameValid && isPhoneValid && isCardValid;
  };

  const handleInputSave = () => {
    const Step5Data = {
      benefit_person_info: {
        person_name: benefitName,
        card_no: benefitCardNumber,
        card_type: cardType,
        effect_time: effectTime,
        expire_time: expireTime,
        card_font_img: cardFontImg,
      },
    };
    if (cardType === "RESIDENT") {
      Step5Data.benefit_person_info.card_back_img = cardBackImg;
    }
    props.updateStep5Data(Step5Data);
  };

  React.useImperativeHandle(ref, () => ({
    isValidated,
  }));

  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">请提供您的详细信息。</p>
      {props.isBenefitPersonInfoRequired && (
        <div>
          {" "}
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <FormGroup>
                <FormLabel>
                  联系人证件类型 <span className="text-danger">*</span>
                </FormLabel>
                <Select
                  name="cardType"
                  value={cardTypes.find((type) => type.value === cardType)}
                  options={cardTypes}
                  onChange={(selectedOption) =>
                    setCardType(selectedOption.value)
                  }
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  受益人姓名 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="benefitName"
                  placeholder="请输入您的姓名"
                  value={benefitName}
                  onChange={(e) => setBenefitName(e.target.value)}
                  onBlur={handleInputSave}
                />
                {benefitNameError && (
                  <small className="text-danger">{benefitNameError}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  受益人电话 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="benefitPhoneNumber"
                  placeholder="请输入您的电话号码"
                  value={benefitPhoneNumber}
                  onChange={(e) => setBenefitPhoneNumber(e.target.value)}
                  onBlur={handleInputSave}
                />
                {benefitPhoneNumberError && (
                  <small className="text-danger">
                    {benefitPhoneNumberError}
                  </small>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  证件号码 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="benefitCardNumber"
                  placeholder="请输入您的证件号码"
                  value={benefitCardNumber}
                  onChange={(e) => setBenefitCardNumber(e.target.value)}
                  onBlur={handleInputSave}
                />
                {benefitCardNumberError && (
                  <small className="text-danger">
                    {benefitCardNumberError}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  证照生效时间 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="date"
                  value={effectTime}
                  onChange={(e) => setEffectTime(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  证照过期时间 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="date"
                  value={expireTime}
                  onChange={(e) => setExpireTime(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>法人/经营者证件正面照</FormLabel>
                <FormControl
                  type="file"
                  multiple
                  placeholder="请输入图片"
                  onChange={(e) =>
                    setCardFontImg(
                      Array.from(e.target.files).map((file) => file.name)
                    )
                  }
                  onBlur={handleInputSave}
                />
              </FormGroup>
              {cardType === "RESIDENT" && (
                <FormGroup>
                  <FormLabel>法人/经营者证件反面照</FormLabel>
                  <FormControl
                    type="file"
                    multiple
                    placeholder="请输入图片"
                    onChange={(e) =>
                      setCardBackImg(
                        Array.from(e.target.files).map((file) => file.name)
                      )
                    }
                    onBlur={handleInputSave}
                  />
                </FormGroup>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
});

export default Step5;
