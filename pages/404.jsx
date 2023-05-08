
import Head from 'next/head';
import Link from 'next/link';

function NotFound() {

  return (
    <>
      <Head>
        <title>404 Tidak ditemukan</title>
      </Head>
      <div className="container h-100 m-5 p-5">
        <div className="row mt-3">
          <h1>404 - Halaman tidak ditemukan</h1>
          <Link href="/" className="fc-tiffany-04">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;