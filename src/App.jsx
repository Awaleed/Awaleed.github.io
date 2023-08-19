import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, Supsctipe, SuperQualtiy } from './sections';
import Nav from './components/Nav';

const App = () => {
  return (
    <main className="relative">
      <Nav />
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <SuperQualtiy />
      </section>
      <section className="py-10 padding-x">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffer />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
      <section className="w-full py-16 padding-x sm:py32">
        <Supsctipe />
      </section>
      <section className="pb-8 bg-black padding-x padding-t">
        <Footer />
      </section>
    </main>
  );
};

export default App;
