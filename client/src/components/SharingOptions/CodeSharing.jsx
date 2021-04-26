import { Typography, message } from 'antd';
import SharingOptionsForm from 'components/Forms/SharingOptionsForm';
import LangValContext from 'contexts/langValContext';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { http } from 'utils';
import { CSOptionsWrapper } from './Options.styles';

const CodeSharingOptions = () => {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const { codes, language } = useContext(LangValContext);

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
    paste.body = codes[language.id];
    paste.language = language.name;
    try {
      const { data } = await http.post('/api/pastes', paste);
      message.success({ content: 'New Paste created 🎉', key, duration: 4 });
      console.log(data);
      history.push(`/${data.url}`);
    } catch (err) {
      message.error({ content: err.data.error, key, duration: 3 });
    }
  };
  return (
    <CSOptionsWrapper>
      <Typography.Title level={3}>Sharing Settings</Typography.Title>
      <SharingOptionsForm onFinish={onFinish} checked={checked} setChecked={setChecked} />
    </CSOptionsWrapper>
  );
};

export default CodeSharingOptions;
