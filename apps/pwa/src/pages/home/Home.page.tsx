import { CaretRightOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Typography,
  Form,
  Statistic,
  Card,
  Space,
  Collapse,
  Spin,
  Row,
} from "antd";
import { useState } from "react";
import { trpc } from "../../trpc/trpc";
const { Paragraph } = Typography;
import * as z from "zod";
import { LinksType } from "@repo/utils";

interface LinkRecord {
  key: string;
  title: string;
  assessment: string;
  improvement: string;
  score: string;
  description: string;
}

const { Title } = Typography;

interface DataInput extends Omit<LinksType, "id" | "userId"> {
  id: number;
  userId: number;
}

const data = (res: DataInput): LinkRecord[] => [
  {
    key: "1",
    title: "Problem",
    description:
      "Are you addressing specific problems faced by the target audience? Customers naturally feel like you understand them if their frustrations are explicitly mentioned.",
    assessment: res.problem,
    improvement: res.problemImprovement,
    score: res.problemScore.toString(),
  },
  {
    key: "2",
    title: "Solution",
    description:
      "How clearly does your copy talk about the solution to the problem you are trying to solve? Features and benefits should be articulated.",
    assessment: res.solution,
    improvement: res.solutionImprovement,
    score: res.solutionScore.toString(),
  },
  {
    key: "3",
    title: "Target Audience",
    description:
      "Check if the landing page clearly defines the target audience and addresses their specific needs, desires, and pain points. This ensures the content resonates with the audience and speaks directly to them.",
    assessment: res.targetAudience,
    improvement: res.targetAudiaanceImprovement,
    score: res.targetAudienceScore.toString(),
  },
  {
    key: "4",
    title: "Objection Handling",
    description:
      "Assess how well your copy anticipates and addresses potential objections, providing clear and reassuring explanations. This builds trust and transparency, making the audience feel their concerns are acknowledged and resolved.",
    assessment: res.objections,
    improvement: res.objectionsImprovement,
    score: res.objectionsScore.toString(),
  },
  {
    key: "5",
    title: "Testimonials/Case studies",
    description:
      "Evaluate the inclusion and credibility of testimonials or case studies that support the product/service's claims. This adds social proof, building trust and demonstrating real-life success and effectiveness.",
    assessment: res.testimonials,
    improvement: res.testimonialsImprovement,
    score: res.testimonialsScore.toString(),
  },
  {
    key: "6",
    title: "Risk Reversal",
    description:
      "Check for a clear and compelling risk reversal strategy, such as a money-back guarantee or free trial. This reduces the perceived risk of making a purchase, instilling confidence in the decision.",
    assessment: res.riskReversal,
    improvement: res.riskReversalImprovement,
    score: res.riskReversalScore.toString(),
  },
  {
    key: "7",
    title: "Uniqueness",
    description:
      "Assess the clarity and memorability of the unique selling proposition (USP) that differentiates the product or service from competitors. This ensures the offering stands out and resonates with the target audience's needs and desires.",
    assessment: res.uniqueness,
    improvement: res.uniquenessImprovement,
    score: res.uniquenessScore.toString(),
  },
];

const userData = sessionStorage.getItem("userDetails");

const formSchema = z.object({
  url: z.string().url(),
});

export const Home = () => {
  const [form] = Form.useForm<z.infer<typeof formSchema>>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [linksRecord, setLinksRecord] = useState<LinkRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const req = trpc.links.useMutation();

  const handleFormSubmit = async ({ url }: { url: string }) => {
    setIsLoading(true);
    await req.mutateAsync({ url }).then((res) => {
      res && setLinksRecord(data(res));
      setIsSubmitted(true);
      setIsLoading(false);
    });
  };
  const handleGoogleAuth = () => {
    window.open(import.meta.env.VITE_BE_URL + "/auth/google", "_self");
  };

  const collaspData = linksRecord.map((item) => ({
    key: item.key,
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
          margin: 0,
        }}
      >
        <div>
          <span>{item.title}</span>
          <Paragraph style={{ color: "GrayText" }}>
            {item.description}
          </Paragraph>
        </div>
        <Statistic
          style={{ marginLeft: "10px" }}
          value={item.score}
          valueStyle={{
            color: `${Number(item.score) > 6.6 ? "green" : Number(item.score) > 3.3 ? "blue" : "red"}`,
          }}
          precision={2}
        />
      </div>
    ),
    children: (
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex" }}
        key={item.key}
      >
        <Card type={"inner"} title="Assessment">
          <Paragraph style={{ color: "GrayText" }}>{item.assessment}</Paragraph>
        </Card>
        <Card type={"inner"} title="Improvement">
          <Paragraph style={{ color: "GrayText" }}>
            {item.improvement}
          </Paragraph>
        </Card>
      </Space>
    ),
  }));

  return (
    <div style={{ width: "100%", justifyContent: "center" }}>
      <Spin
        spinning={isLoading}
        tip="analyzing your landing page please wait..."
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            gap: 0,
          }}
        >
          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "6rem",
            }}
          >
            <Title
              level={1}
              style={{
                fontSize: "5rem",
                textAlign: "center",
                padding: 0,
                margin: "0.5rem",
              }}
            >
              Ghost of <span style={{ color: "#00a66e" }}>Ogilvy</span>
            </Title>
          </Row>
          <Row>
            <Title
              level={1}
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                margin: 0,
              }}
            >
              Make your landing pages more persuasive
            </Title>
          </Row>
          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title
              style={{
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              An AI-assited Landing Page audit tool trained on proven frameworks
            </Title>
          </Row>
          {!userData?.length && (
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
              gutter={[16, 16]}
            >
              <Typography.Text style={{ textAlign: "center" }}>
                Please login to continue
              </Typography.Text>
              <Button type={"primary"} onClick={handleGoogleAuth}>
                Google Auth
              </Button>
            </Row>
          )}
        </div>
        {userData?.length && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0.5rem",
            }}
          >
            <Form
              form={form}
              onFinish={handleFormSubmit}
              style={{
                margin: "1rem",
                width: "40%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "space-around",
                  alignContent: "center",
                }}
              >
                <Form.Item
                  name="url"
                  rules={[
                    {
                      required: true,
                      type: "url",
                      message: "Please enter a valid URL",
                    },
                  ]}
                >
                  <Input
                    placeholder="https://example.com"
                    addonBefore={"URL"}
                    size="large"
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  type={"primary"}
                  style={{
                    width: "50%",
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "40px",
                  }}
                >
                  Audit my Landing Page
                </Button>
              </div>
            </Form>
            {isSubmitted && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0",
                  gap: 0,
                  width: "70%",
                }}
              >
                <Collapse
                  defaultActiveKey={linksRecord.map((item) => item.key)}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={collaspData}
                  size="large"
                />
              </div>
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};
