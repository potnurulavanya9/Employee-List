import React, { useState, useEffect } from "react";
import { empData_1, empData_2 } from '../data';
import { xmlToJson } from '../Utils';
import './Employee.css';

const Employee = () => {
    const [employees, setEmpList] = useState([]);
    const [finishLoad, setFinishLoad] = useState(false);
    let empList = {};

    useEffect(() => {
        setTimeout(() => {
            setEmpList(empData_1?.person);
        }, 5000);
    }, [empData_1]);

    useEffect(() => {
        setTimeout(() => {
            setEmpList([...empData_1?.person, ...empList?.persons?.person]);
            setFinishLoad(true);
        }, 10000);
    }, [empList?.persons?.person]);

    if (typeof window != undefined && window.DOMParser) {
        const getxml = new DOMParser();
        const xmlDoc = getxml.parseFromString(empData_2, "text/xml");
        empList = xmlToJson(xmlDoc);
    }

    const parseData = (data) => {
        if (typeof (data) != 'object') return data;
        return data['#text'];
    };

    const sortedArray = employees?.sort((a, b) => {
        if (typeof (a.id) != 'object' && typeof (b.id) != 'object') return a.id - b.id;
        return parseInt((a.id['#text'] || a.id), 10) - parseInt((b.id['#text'] || b.id), 10);
    });

    return (
        <>
            <ul className="list-container">
                <li>
                    <span>Emp ID</span>
                    <span>First Name</span>
                    <span>Last Name</span>
                </li>
                {sortedArray?.map((data) => {
                    const { id, firstName, lastName } = data;
                    return (
                        <li>
                            <span>{parseData(id)}.</span>
                            <span>{parseData(firstName)}</span>
                            <span>{parseData(lastName)}</span>
                        </li>
                    );
                })}
            </ul>
            {!finishLoad && <div className="loader"></div>}
        </>
    );
};

export default Employee;