import { Typography, message } from 'antd';
import SharingOptionsForm from 'components/Forms/SharingOptionsForm';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { http } from 'utils';
import SharingLayout from './SharingLayout';

const RichTextSharingOptions = ({ blocks }) => {
  const history = useHistory();
  const [checked, setChecked] = useState(false);

  // to create new paste
  const onFinish = async values => {
    const key = 'pasteCreator';
    message.loading({ content: 'Creating paste...', key });
    const { expireAfterSeconds } = values;
    let paste = { ...values };
    delete paste.expireAfterSeconds;
    if (!paste.password) {
      delete paste.password;
      paste.access = 'public';
    } else {
      paste.access = 'protected';
    }
    if (expireAfterSeconds !== -1) {
      paste.expireAt = new Date(Date.now() + expireAfterSeconds).toISOString();
    }
    paste.body = JSON.stringify(blocks);
    paste.language = 'richtext';
    paste.type = 'text';
    try {
      const { data } = await http.post('/api/pastes', paste);
      message.success({ content: 'New share created 🎉', key, duration: 3 });
      // console.log(data);
      history.push(`/${data.url}`);
    } catch (err) {
      message.error({ content: err.data.error, key, duration: 3 });
    }
  };
  return (
    <SharingLayout>
      <Typography.Title level={3}>Sharing Settings</Typography.Title>
      <SharingOptionsForm onFinish={onFinish} checked={checked} setChecked={setChecked} />
    </SharingLayout>
  );
};

export default RichTextSharingOptions;
