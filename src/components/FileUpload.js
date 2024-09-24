    // client/src/components/FileUpload.js
    import React, { useState } from 'react';
    import axios from 'axios';

    const FileUpload = () => {
        const [file, setFile] = useState(null);

        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('file', file);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        );
    };

    export default FileUpload;