function getAllElementsLongerThan(elements, lengthFilter, callback) {
    var result= [];
    var iterator = (index) => {
        // EXIT
        if(index == elements.length) {
            callback(null, result);
            return;
        }

        // ITERATION LOGIC
        if(elements[index].length > lengthFilter) {
            result.push(elements[index]);
        }

        // RECURSIVE CALL
        iterator(index + 1);
    };
    iterator(0);
}

getAllElementsLongerThan(['pes', 'kocka+', 'veverka'], 5, (err, elements) => {
    console.log(elements);
});