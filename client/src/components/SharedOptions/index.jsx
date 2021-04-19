import { Typography, Card, Row, Col, Tooltip } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloudDownloadOutlined,
  CopyOutlined,
  LockOutlined,
  CodeOutlined,
  CheckOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import TimeAgo from 'react-timeago';
import FileSaver from 'file-saver';
import styled from 'styled-components';
import { copyToClipboard, pasteURL, upperFirst } from 'utils';
import { useState } from 'react';

const OptionsWrapper = styled.div`
  height: 100%;
  .ant-typography {
    text-align: center;
  }
  .options--content {
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ant-col {
    font-size: 16px;
    .anticon {
      font-size: 18px;
    }
  }

  .ant-card-actions .anticon {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const SharedOptions = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (copied) return;
    copyToClipboard(data.body);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const handleDownload = () => {
    const blob = new Blob([data.body], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, `${data.url}.txt`);
  };
  const createCarbonImage = () => {};

  return (
    <OptionsWrapper>
      <Typography.Title level={3}>Paste Details</Typography.Title>
      <div className="options--content">
        <Card
          bordered={false}
          loading={!data}
          actions={[
            <Tooltip title="download code" placement="bottom">
              <CloudDownloadOutlined key="download" onClick={handleDownload} />
            </Tooltip>,
            <Tooltip
              title={copied ? 'copied!' : 'copy code to clipboard'}
              onClick={handleCopyCode}
              placement="bottom"
            >
              {copied ? <CheckOutlined key="copy" /> : <CopyOutlined key="copy" />}
            </Tooltip>,
            <Tooltip title="view raw file" placement="bottom">
              <Typography.Link
                target="__blank"
                href={`http://localhost:5000/api/pastes/${data.url}/raw`}
              >
                <CodeOutlined key="raw" />
              </Typography.Link>
            </Tooltip>,
            <Tooltip title="create image" placement="bottom">
              <FileImageOutlined key="carbon" onClick={createCarbonImage} />
            </Tooltip>,
          ]}
        >
          <Card.Meta
            title={
              <Typography.Text
                copyable={{
                  text: pasteURL(data.url),
                  tooltips: ['Copy paste URL to clipboard', 'Copied!'],
                }}
              >
                {data.title}
              </Typography.Text>
            }
            description={`By a guest user`}
          />
          <Row gutter={[16, 16]} style={{ marginTop: '25px' }}>
            <Col span={6}>
              <CalendarOutlined title="created at" />
            </Col>
            <Col span={18}>
              <TimeAgo date={data.createdAt} />
            </Col>
            <Col span={6}>
              <ClockCircleOutlined title="expiretion" />
            </Col>
            <Col span={18}>{data.expireAt ? <TimeAgo date={data.expireAt} /> : 'Never'}</Col>
            <Col span={6} title="access">
              <LockOutlined />
            </Col>
            <Col span={18}>{upperFirst(data.access)}</Col>
          </Row>
        </Card>
      </div>
    </OptionsWrapper>
  );
};

export default SharedOptions;
