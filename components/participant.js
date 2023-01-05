import ParticipantPrint from './participantPrint';

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
                        <th colSpan={2}>
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
                            <td>{i+1}</td>
                            <td>
                                <ParticipantPrint data={data} participants={participants} />
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Participant