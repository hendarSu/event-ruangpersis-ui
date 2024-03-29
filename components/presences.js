function PresencesList({ participants }) {
  return (
    <div className="card border-0 rounded shadow-lg mt-4 p-2">
      <h6 className="fw-light mt-1 text-center">Kehadiran : <b>{participants.length} Peserta</b></h6>
      <table className="table mr-2 ml-2 mt-2">
        <tbody>
          <tr>
            <th />
            <th>
                            Code
            </th>
            <th>
                            NPA
            </th>
            <th>
                            Nama
            </th>
          </tr>

          {participants.map((data, i) => {
            return (<tr key={i}>
              <td>{i+1}</td>
              <td>{data.register.barcode}</td>
              <td>{data.participant.npa}</td>
              <td>{data.participant.name}</td>
            </tr>);
          })}

        </tbody>
      </table>
    </div>
  );
}

export default PresencesList;