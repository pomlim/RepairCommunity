// import { config } from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-svg-core/styles.css';
// config.autoAddCss = false;

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';

// library.add(fab, fas, far);

import '../styles/globals.css';
import '../components/modal/modal.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-base-300">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
