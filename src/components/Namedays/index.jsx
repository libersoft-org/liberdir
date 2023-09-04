import chech from './chech.json';

const chech_lookup = (date) => {
    console.log(date);
    return chech.find((element) => element.date > date);
};

const Namedays = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); 
    const names = {
        'Chech': {
            'today': chech_lookup(today.toISOString().slice(0, 10)).name,
            'tomorrow': chech_lookup(tomorrow.toISOString().slice(0, 10)).name
        }
    };

    const items = Object.keys(names).map((key, index) => <div key={index}><div>{key}</div>{Object.values(names[key]).map((value, idx) => <div key={idx}>{value}</div>)}</div>)
    return <div id='namedays'>
        <div className='title'>Namedays</div>
        <div>
            <div></div>
            <div>Today</div>
            <div>Tomorrow</div>
        </div>
        {items}
    </div>;
};

export default Namedays;