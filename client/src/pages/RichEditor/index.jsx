import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BGWrapper } from './index.style';
import { initialBlocks } from 'components/RichTextEditor/example';
import Layout from 'layouts/Root';
import EditorLayout from 'layouts/Editor';
import RichTextSharingOptions from 'components/SharingOptions/TextSharing';
import RichTextEditor from 'components/RichTextEditor';

const RichEditor = () => {
  const { state: routerState } = useLocation();
  const [blocks, setBlocks] = useState((routerState && JSON.parse(routerState)) || initialBlocks);

  const addBlocks = (_, data) => {
    setBlocks(data.blocks);
  };
  console.log(blocks);
  return (
    <Layout>
      <BGWrapper>
        <EditorLayout
          left={<RichTextEditor blocks={blocks} addBlocks={addBlocks} />}
          right={<RichTextSharingOptions blocks={blocks} />}
        />
      </BGWrapper>
    </Layout>
  );
};
export default RichEditor;
