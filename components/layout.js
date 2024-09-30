import Header from './header';
import Footer from './footer';

export default function Layout({ children, pageTitle }) {
  return (
    <div>
      <Header />
      <main>
        <h1>{pageTitle}</h1> {/* Display the page title here */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
