import Link from 'next/link';

function EvotingComponent({ event }) {
  const eventList = event.map((data) =>
    (<div className="col-md-3" key={data.event._id}>
      <div className="card mb-3 rounded shadow-sm">
        <div className="row g-0">
          <div className="col-md-12">
            <img src="/imgs/musda.jpg" className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-12">
            <div className="card-body">
              <h4 className="card-title">{data.name} - {data.event.name}</h4>
              <p className="card-text">{data.event.description.slice(0, 50)}....</p>
              <hr/>
              <Link href={'evoting/'+data._id} className="btn btn-light btn-sm btn" style={{ width: '100%' }}>Voting</Link>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );

  return (
    <div className="row">
      {eventList}
    </div>
  );
}

export default EvotingComponent;
