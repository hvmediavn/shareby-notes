import { useState } from 'react';
import CodeEditor from 'components/CodeEditor';
import { languages, examples } from 'components/CodeEditor/config';
import CodeSharingOptions from 'components/SharingOptions/CodeSharing';
import LangValContext from 'contexts/langValContext';
import Layout from 'layout/Root';
import { IndexWrapper, RightContent, LeftContent } from './index.style';
import { useLocation } from 'react-router-dom';

const IndexPage = () => {
  const { state: routerState } = useLocation();

  /**
   * Not good idea
   const history = useHistory();
   // to clear history state
   useEffect(() => {
     if (routerState) {
       history.replace('/', undefined);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */

  const initLang = languages.find(lang => lang.name === 'plaintext');
  const favLang = JSON.parse(localStorage.getItem('favLanguage'));
  const defaultCodes = JSON.parse(localStorage.getItem('defaultTemplates'));

  const [language, setLanguage] = useState(
    (routerState && routerState.language) || favLang || initLang
  );

  // adding initail codes for all languages
  const [codes, setCodes] = useState(
    Object.fromEntries(
      languages.map(({ id }) => [
        id,
        (routerState &&
          routerState.language &&
          routerState.language.id === id &&
          routerState.code) ||
          (defaultCodes && defaultCodes[id]) ||
          examples[id],
      ])
    )
  );

  const handleLangChange = langName => {
    const lang = languages.find(lang => lang.name === langName);
    setLanguage(lang);
  };

  const handleCodeChange = value => {
    setCodes({
      ...codes,
      [language.id]: value,
    });
  };

  return (
    <Layout>
      <LangValContext.Provider value={{ language, handleLangChange, codes, handleCodeChange }}>
        <IndexWrapper>
          <LeftContent>
            <CodeEditor />
          </LeftContent>
          <RightContent>
            <CodeSharingOptions />
          </RightContent>
        </IndexWrapper>
      </LangValContext.Provider>
    </Layout>
  );
};

export default IndexPage;
