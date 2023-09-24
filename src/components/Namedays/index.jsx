import czech from './czech.json';
import { today, tomorrow } from 'nevnap';

import './namedays.scss';

const czech_lookup = (date) => {
    return czech.find((element) => element?.date > date)?.name;
};

const Namedays = () => {
    const today_date = new Date();
    const tomorrow_date = new Date(today_date);
    tomorrow_date.setDate(today_date.getDate() + 1);
    const dates = [
        today_date.toISOString().slice(0, 10),
        tomorrow_date.toISOString().slice(0, 10)
    ]; 
    
    const names = {
        'Czech': dates.map(date => czech_lookup(date)),
        'Hungarian': [
            today().join(', '),
            tomorrow().join(', '),
        ]
    };

    const items = Object.keys(names).map((key, index) => {
        return <div key={index} className='namedays-row'>
            <div>{key}</div>
            {names[key].map((value, idx) => <div key={idx}>{value}</div>)}
        </div>
    });
    return <div id='namedays'>
        <div className='main-area-title'>Namedays</div>
        <div className='namedays-wrapper'>
          <div className='namedays-row namedays-header'>
              <div></div>
              <div>Today</div>
              <div>Tomorrow</div>
          </div>
          {items}
        </div>
    </div>;
};

export default Namedays;