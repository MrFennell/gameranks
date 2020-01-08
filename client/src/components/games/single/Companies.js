import React from 'react';


const Companies = (props) => {
    const companies = props.companies;
    
    return (
        <>
        <h4>Companies</h4>
            {companies.map(e => (
                <div key={e.id}>
                    {e.company.name}
                </div>
            ))}
        </>
    );
};

export default Companies;