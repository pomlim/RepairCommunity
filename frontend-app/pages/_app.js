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
