
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InfoTile.scss';

interface Params {
  title?: string;
  icon?: string;
  children?: any;
  size?: '1x' | '2x' | '3x';
}

export default function InfoTile(params: Params) {

  return (
    <div className={"info-tile" + (params.size ? " info-tile-size-" + params.size : "")}>
      <div className="info-tile-content">
        {params.icon && <div className='info-tile-icon-wrapper'>
          <FontAwesomeIcon className='info-tile-icon' icon={params.icon as any} />
        </div>}
        <div className='info-tile-children'>
          {params.children}
        </div>
      </div>
      {params.title && <div className="info-tile-title">{params.title}</div>}
    </div>

  );
}
