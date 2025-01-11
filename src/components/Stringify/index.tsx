import React from "react";

export default React.memo(function ({data}:{data: unknown}) {
    return (
        <pre>
            { JSON.stringify(data, undefined, 2)}
        </pre>
    ) 
})