const checkedArticleSet = new Set();

const checkedSet = {
    Init: () => {
        for(let item of checkedArticleSet)
            checkedArticleSet.delete(item);
    },

    add: (aid) => {
        checkedArticleSet.add(aid);
    },

    has: (aid) => {
        return checkedArticleSet.has(aid);
    },

    delete: (aid) => {
        checkedArticleSet.delete(aid);
    },

    getSet: () => {
        return checkedArticleSet;
    },
    getLength: () => {
        return checkedArticleSet.size;
    }
}

export {
    checkedSet,
}