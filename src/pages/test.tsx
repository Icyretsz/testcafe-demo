import { useState} from "react";
import * as React from "react";

interface userInfoType {
    name: string;
    birthdate: string;
    phone: number;
}

const Test = () => {
    const [userInfoList, setUserInfoList] = useState<userInfoType[]>([]);
    const [fetchedUserList, setFetchedUserList] = useState<userInfoType[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        phone: ""
    });

    const fetchUsersList = async () => {
        const res = await fetch('https://685998ba9f6ef9611153a902.mockapi.io/api/userinfo');
        const data = await res.json();
        setFetchedUserList(data);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newUser: userInfoType = {
            name: formData.name,
            birthdate: formData.birthdate,
            phone: Number(formData.phone)
        };

        setUserInfoList(prev => [...prev, newUser]);

        setFormData({name: "", birthdate: "", phone: ""});

        console.log("Current list:", userInfoList);
    };

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", gap: 150}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h1>Form test</h1>
                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
                        <label>Enter name:</label>
                        <input id='name-input' name="name" type="text" value={formData.name} onChange={handleChange}/>

                        <label>Enter birthdate:</label>
                        <input id='birthdate-input' name="birthdate" type="text" value={formData.birthdate}
                               onChange={handleChange}/>

                        <label>Enter phone number:</label>
                        <input id='phone-input' name="phone" type="text" value={formData.phone}
                               onChange={handleChange}/>

                        <button id='submit-button' type="submit">Submit</button>
                    </form>

                    <table id='local-user-list' border={1} cellPadding="8">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birthdate</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userInfoList.map((user, idx) => (
                            <tr key={idx}>
                                <td>{user.name}</td>
                                <td>{user.birthdate}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h1>API interception test</h1>
                    <button id='fetch-user-btn' onClick={() => fetchUsersList()}>Get users</button>
                    <table id='fetched-user-list' border={1} cellPadding="8">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birthdate</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fetchedUserList.map((user, idx) => (
                            <tr key={idx}>
                                <td>{user.name}</td>
                                <td>{user.birthdate}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default Test;
