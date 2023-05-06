import React from "react";

const Container = ({ children }) => {
    return (
        <div className="w-full overflow-hidden max-w-[100%] h-full max-h-[100%] relative">
            {children}
        </div>
    );
};

export default Container;
