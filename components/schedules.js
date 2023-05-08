import Link from "next/link"

function Schedules({ schedules }) {
    return (
        <div className="">
            <table className="table">
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            Nama
                        </th>
                        <th>
                            Tanggal
                        </th>
                        <th>
                            Time
                        </th>
                        <th>
                            #
                        </th>
                    </tr>

                    {schedules.map((data, i) => {
                        return (<tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.name}</td>
                            <td>{data.date.substring(1, 10)}</td>
                            <td>{data.time}</td>
                            <td>
                                {(data.type != "evoting") ? <Link className="btn btn-sm btn-light" href={"/presences/"+data._id}><i className="bi bi-person-check"></i> Kehadiran</Link> :
                                 <Link className="btn btn-sm btn-light" href={"/evoting/result/"+data._id}><i className="bi bi-pie-chart"></i> Evoting</Link> 
                                }
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Schedules