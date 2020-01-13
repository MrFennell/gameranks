import React from 'react';

const Companies = (props) => {
    const companies = props.companies;
    if (companies){
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
    }
    else{
        return <h4>Companies</h4>
    }
    
};

export default Companies;