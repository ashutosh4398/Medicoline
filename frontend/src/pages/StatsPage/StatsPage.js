import React,{useContext} from 'react';
import BarChart from '../../components/Chart/BarChart';
import PieChart from '../../components/Chart/PieChart';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import './StatsPage.scss';

const StatsPage = () => {

    const {userDetails} = useContext(TOKEN_HANDLER);

    return (
        <div className="statistics">
            <h2 className="heading__tertiary pb-3">Statistics</h2>
            <form>
                <fieldset className="">
                    <legend className="w-auto">Overall Questions Answered</legend>
                    <BarChart type="overall"/>
                </fieldset>
            </form>

            <form className="my-5">
                <fieldset className="">
                    <legend className="w-auto">Groupwise Questions Answered</legend>
                    {
                        userDetails.groups?.map(group => (
                            <div className="bar-group">
                                <BarChart type="groupwise" disease_name={group.disease_name} />
                            </div>
                            
                        ))
                    }
                </fieldset>
            </form>

            <form className="my-5">
                <fieldset className="">
                    <legend className="w-auto">Patient Distribution</legend>
                    <div className="bar-group">
                        <PieChart />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default StatsPage;