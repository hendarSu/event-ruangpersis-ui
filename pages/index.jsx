
import Head from 'next/head';
// import Router from 'next/router';
import CardEvent from '../components/CardEvent';

function Home() {

  const dummy = [{
    title: 'Musyawarah Daerah X',
    img: '/events/musda.jpg',
    owner: 'PD. Persis Kabupaten Bandung',
    // category,
    // dateTime,
    // address,
    // id
  }, {
    title: 'Musyawarah Daerah X',
    img: '/events/musda.jpg',
    owner: 'PD. Persis Kabupaten Bandung',
    // category,
    // dateTime,
    // address,
    // id
  }, {
    title: 'Musyawarah Daerah X',
    img: '/events/musda.jpg',
    owner: 'PD. Persis Kabupaten Bandung',
    // category,
    // dateTime,
    // address,
    // id
  }, {
    title: 'Musyawarah Daerah X',
    img: '/events/musda.jpg',
    owner: 'PD. Persis Kabupaten Bandung',
    // category,
    // dateTime,
    // address,
    // id
  }];

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container px-5">
        <div className="row mt-3">
          <div className="row my-3 px-lg-6">
            <h3 className="col-6">Acara di Bandung</h3>
            <a className="col-6 text-end fc-tiffany-04 cursor-pointer">Lihat Semua</a>
          </div>

          <div class="row px-lg-6">
            {
              dummy.map((data) => (
                <div class="col-lg-3 col-md-6" key={data.title}>
                  <CardEvent {...data} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;