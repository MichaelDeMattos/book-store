// Get last page from pagination
async function getLastPage(totalRecords, rowsPerPage) {
    if (Math.ceil(totalRecords / rowsPerPage) > 0.0) {
        return Math.ceil(totalRecords / rowsPerPage);
    } else {
        return page;
    }
}

// Get next page from pagination
async function getNextPage(page, lastPage) {
    const newPage = page + 1;
    if (newPage <= lastPage) {
        return newPage;
    } else  {
        return null;
    }
}

module.exports = {
    getLastPage: getLastPage,
    getNextPage: getNextPage
}
