import czech from './czech.json';

import './namedays.scss';

const czech_lookup = (date) => {
    return czech.find((element) => element.date > date).name;
};

const Namedays = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dates = [
        today.toISOString().slice(0, 10),
        tomorrow.toISOString().slice(0, 10)
    ]; 
    
    const names = {
        'Czech': dates.map(date => czech_lookup(date))
    };

    const items = Object.keys(names).map((key, index) => <div key={index} className='row'><div>{key}</div>{names[key].map((value, idx) => <div key={idx}>{value}</div>)}</div>)
    return <div id='namedays'>
        <div className='title'>Namedays</div>
        <div className='row header'>
            <div></div>
            <div>Today</div>
            <div>Tomorrow</div>
        </div>
        {items}
    </div>;
};

export default Namedays;