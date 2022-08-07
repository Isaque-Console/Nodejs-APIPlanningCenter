
/**
 * @description filter array of items by title
 * 
 * @param request An object that contains event datas
 * @param title The title from activity that i want
 * @returns a string that contains the item description
 */
export const getDescriptionByTitle = async (request: any, title: Array<string>): Promise<string> => {
    const description = await request.data.data.filter((activity: any) => {
        if (activity) {
            const titleWithoutAccent: string = activity.attributes.title.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (title.includes(titleWithoutAccent)) {
                return activity.attributes.description;
            }
        }
    });

    return description[0].attributes.description;
}

export const convertDescriptionToArray = (description: string): Array<string> => {
    const splittedArray = description.replace(/(\r\n|\n|\r)/gm, "").split("-");
    const arrayOfNames = splittedArray.map(name => name.trim());
    arrayOfNames.shift();

    return arrayOfNames;
}