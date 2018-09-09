const safeJsonParse = (data, defReturn = []) => {
    try {
        const parsedData = JSON.parse(data);

        if (parsedData instanceof Array && !parsedData.length) {
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
