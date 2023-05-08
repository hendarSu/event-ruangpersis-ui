//import Head
import Head from 'next/head';

//import axios
// import axios from 'axios';

//import js cookie
// import Cookies from 'js-cookie';

// Component
// import Event from '../components/event_component';

export default function Dashboard() {

  //get token

  // //hook useEffect
  // useEffect(() => {
  //   // check token empty
  //   if (!token) {
  //     // redirect login page
  //     Router.push('/');
  //   } else {
  //     // call function "fetchData"
  //     fetchData();
  //     eventData();
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Agenda | Event Ruang Persis</title>
      </Head>
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body row">
                <div className="col-md-11">
                  {/* Selamat datang <strong className="text-uppercase">{user.username}</strong> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {/* <Event event={event} /> */}
        </div>
      </div>
    </>
  );

}

// // This gets called on every request
// export async function getServerSideProps() {
//   const token = Cookies.get('token');

//   //fetch event from Rest API
//   const event = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events/public`).then((response) => response.data.data);

//   //set axios header dengan type Authorization + Bearer token
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   const user = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/profile`).then((response) => response.data);

//   // Pass data to the page via props
//   return { props: { data: { event, user } } };
// }