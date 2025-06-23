import { useState } from "react";
import * as React from "react";

interface userInfoType {
    name: string;
    birthdate: string;
    phone: number;
}

const Test = () => {
    const [userInfoList, setUserInfoList] = useState<userInfoType[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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

        setFormData({ name: "", birthdate: "", phone: "" });

        console.log("Current list:", userInfoList);
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <label>Enter name:</label>
                <input id='name-input' name="name" type="text" value={formData.name} onChange={handleChange} />

                <label>Enter birthdate:</label>
                <input id='birthdate-input' name="birthdate" type="text" value={formData.birthdate} onChange={handleChange} />

                <label>Enter phone number:</label>
                <input id='phone-input' name="phone" type="text" value={formData.phone} onChange={handleChange} />

                <button id='submit-button' type="submit">Submit</button>
            </form>

            <ul>
                {userInfoList.map((user, idx) => (
                    <li key={idx}>
                        {user.name} - {user.birthdate} - {user.phone}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Test;
