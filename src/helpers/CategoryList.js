const CategoryList = (categories, options = []) => {
    for (let category of categories) {
        options.push({
            value: category._id,
            name: category.name,
            parent: category.parent,
            type: category.type
        });
        if (category.children.length > 0) {
            CategoryList(category.children, options)
        }
    }

    return options;
}

export default CategoryList;