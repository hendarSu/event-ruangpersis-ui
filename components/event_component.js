import Link from 'next/link'

function EventComponent({ event }) {
    const eventList = event.map((data) =>
        <div className="col-md-4" key={data._id}>
            <div className="card border-0 mb-3 rounded shadow">
                <div className="row g-0">
                    <div className="col-md-12">
                        <img src="/imgs/musda.jpg" className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-12">
                        <div className="card-body">
                            <h4 className="card-title">{data.name}</h4>
                            <p className="card-text">{data.description.slice(0, 75)}....</p>
                            <hr/>
                            {/* <p className="card-text">
                                <small className="text-muted">{data.user.name.toUpperCase()}</small>
                            </p> */}
                            <Link href={"event/"+data.slug} className="btn btn-light btn-sm btn" style={{ width: "100%" }}>Daftar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="row">
            {eventList}
        </div>
    );
}

export default EventComponent
