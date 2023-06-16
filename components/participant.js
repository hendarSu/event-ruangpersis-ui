import ParticipantPrint from './participant_print';
import ParticipantPrintAll from './participant_print_all';

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
                            Utusan
                        </th>
                        <th className="text-center">
                            <ParticipantPrintAll participants={participants} />
                        </th>
                    </tr>

                    {participants.map((data, i) => {
                        return (<tr key={i}>
                            <td>{data.barcode}</td>
                            <td>{data.participant.npa}</td>
                            <td>{data.participant.name}</td>
                            <td>{data.user.name}</td>
                            <td className="text-center">
                                <ParticipantPrint data={data} />
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Participant