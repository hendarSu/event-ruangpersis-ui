function Participant({ participants }) {
    return (
        <div className="">
            <table className="table">
                <tbody>
                    <tr>
                        <th>
                            Code
                        </th>
                        <th>
                            NPA
                        </th>
                        <th>
                            Nama
                        </th>
                        <th>
                            PD
                        </th>
                        <th>
                            PC
                        </th>
                        <th>
                            #
                        </th>
                    </tr>

                    {participants.map((data, i) => {
                        return (<tr key={i}>
                            <td>{data.barcode}</td>
                            <td>{data.participant.npa}</td>
                            <td>{data.participant.name}</td>
                            <td>{data.participant.pd}</td>
                            <td>{data.participant.pc}</td>
                            <td><button className="btn btn-sm btn-success" disabled>Kartu Peserta</button></td>
                        </tr>)

                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Participant