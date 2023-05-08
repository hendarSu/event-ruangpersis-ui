
import style from './style.module.scss';

function Card(props) {
  const { children, className } = props;

  return (
    <div className={`card ${style['card']} ${className || ''}`}>
      <div className="card-body p-0">
        {children}
      </div>
    </div>
  );
}

export default Card;