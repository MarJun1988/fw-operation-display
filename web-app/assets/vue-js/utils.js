/**
 * Generate the Filter Objekt for the Symfony API
 *
 * @param param
 */
const generateFilter = (param) => {
    let filter = [];

    if (param) {
        for (const [key, value] of Object.entries(param)) {
            if (value.value) {
                filter.push({
                    column: key, text: value.value, matchMode: value.matchMode,
                });
            }
        }
    }

    return filter;
};

/**
 * Generate the OrderBy Objekt for the Symfony API
 * @param param
 * @returns {*[]}
 */
const generateOrderBy = (param) => {
    let order = [];

    if (param) {
        param.forEach(sort => {
            order.push(`${sort.field};${sort.order === 1 ? 'ASC' : 'DESC'}`);
        })
    }

    return order;
};

export {generateFilter, generateOrderBy}