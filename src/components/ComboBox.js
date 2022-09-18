import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Courses from '../courseDetails.json';

const subjects = Object.keys(Courses);
var sections = new Set();
var chosen = false;

export default function ControllableStates() {
    const [chosensubject, setValue1] = React.useState(subjects[0]);
    const [chosencourse, setValue2] = React.useState(subjects[0]);

    return (
        <div>
            {/* //Start of first text field */}
            <div>
                {`chosen subject: ${chosensubject !== null ? `'${chosensubject}'` : 'null'}`}
            </div>
            <br />
            <Autocomplete
                chosensubject={chosensubject}
                onChange={(event, newValue) => {
                    setValue1(newValue);

                    chosen = true;

                    var courses = Object.keys(Courses[chosensubject]);
                }}
                id="controllable-states-demo"
                options={subjects}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Subject" />}
            />
            {/* //End of first text field */}
            <div>
                {`chosencourse: ${chosencourse !== null ? `'${chosencourse}'` : 'null'}`}
            </div>
            <br />
            <Autocomplete
                chosencourse={chosencourse}
                onChange={(event, newValue) => {
                    setValue2(newValue);
                    console.log("subject are " + chosensubject)
                    console.log("course are " + chosencourse)
                    for (var i = 0; i < Courses[chosensubject][chosencourse].length; i++) {
                        sections.add(Courses[chosensubject][chosencourse][i]["title"]);
                    }
                    console.log("titles are " + sections[0])
                }}
                options={Object.keys(Courses[chosensubject])}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Course name" />}
            />
            <div>
                {`chosencourse: ${chosencourse !== null ? `'${chosencourse}'` : 'null'}`}
            </div>
            <br />
            <Autocomplete
                chosencourse={chosencourse}
                onChange={(event, newValue) => {
                    setValue2(newValue);
                    console.log("subject are " + chosensubject)
                    console.log("course are " + chosencourse)
                    for (var i = 0; i < Courses[chosensubject][chosencourse].length; i++) {
                        sections.add(Courses[chosensubject][chosencourse][i]["title"]);
                    }
                    console.log("titles are " + sections[0])
                }}
                options={Object.keys(Courses[chosensubject])}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Course name" />}
            />
        </div>
    );
}

function getSections() {

}