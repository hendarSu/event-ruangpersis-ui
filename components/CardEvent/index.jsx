

import style from './style.module.scss';
import Card from '../Card';

function CardEvent(props) {
  const { img, title, owner } = props;

  return (
    <Card className="p-0">
      <div>
        <img src={img} width="100%" alt="Foto event musyawarah daerah" className={`${style['img-event']}`} />
        <div className="px-3 pt-3 pb-3 content">
          <div className="d-flex fs-12px mb-2 fc-black"><span>Musyawarah</span><span className="mx-1">•</span><span>Seminar</span></div>
          <h5 className={style['title']}>{title}</h5>
          <span className="fs-14px fc-black">{owner}</span>

          <div className="d-flex fs-14px mb-2 mt-2 fc-black align-items-end"><img src="/icons/calendar.svg" alt="calendar icon" className="me-2" /><span>31 Feb 2023 - 30 Des 2023 </span></div>
          <div className="d-flex fs-14px mb-2 fc-black align-items-end"><img src="/icons/clock.svg" alt="time icon" className="me-2" /><span>10:00 - 22:00 WIB</span></div>
          <div className="d-flex fs-14px mb-2 fc-black align-items-start"><img src="/icons/pin.svg" alt="address icon" className="me-2" style={{ paddingTop: '2px' }} /><span>1901 Thornridge Cir. Shiloh, Hawaii 81063</span></div>

          <div className="d-flex mt-5">
            <button type="button" class="btn btn-secondary col me-2">Lihat Acara</button>
            <button type="button" class={`btn btn-outline col-2 p-0 ${style['favorite']}`} />
          </div>
        </div>
      </div>
    </Card >
  );
}

export default CardEvent;