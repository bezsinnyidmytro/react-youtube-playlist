const safeJsonParse = (data, defReturn = []) => {
    try {
        const parsedData = JSON.parse(data);

        if (!parsedData || !parsedData.length) {
            return (defReturn);
        }
        return (parsedData);
    } catch(e) {
        return (defReturn);
    }
};

export {
    safeJsonParse
};
